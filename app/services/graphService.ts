import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';
// 仅在 Node.js 环境中加载 .env 文件（避免前端环境污染）
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Neo4j连接配置
const NEO4J_URI = process.env.NEO4J_URI || 'check your .env file';
const NEO4J_USER = process.env.NEO4J_USER || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'check your .env file';
// OpenAI API 配置
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// 建立 Neo4j 连接
export const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

// --- 通用函数：运行 Cypher 查询 ---
export async function runCypher(cypherQuery: string) {
  const session = driver.session();
  try {
    await session.run(cypherQuery);
  } catch (error) {
    console.error('执行 Cypher 查询时发生错误：', error);
  } finally {
    await session.close();
  }
}
// ---  ---
export async function CreateIssueGraph(issue: string) {
  const issueQuery = `CREATE (:Issue:Novel {name: "${issue}"})`;
  await runCypher(issueQuery);
  console.log('✅ issue图谱已经成功写入 Neo4j！');
}
// --- 清空 Novel 子图 ---
export async function clearNovelGraph() {
  const deleteQuery = `
    MATCH (n:Novel)
    DETACH DELETE n
  `;
  await runCypher(deleteQuery);
  console.log('🗑 已删除所有 Novel 子图节点和关系。');
}
// 提取 AP 节点信息
export async function fetchAPNodes(): Promise<string> {
  const session = driver.session();
  try {
    const result = await session.run(`MATCH (n:AP) RETURN n.name AS name, labels(n) AS labels`);
    const descriptions = result.records.map(record => {
      const name = record.get('name');
      const labels = record.get('labels').join(',');
      return `Node: ${name}, Labels: ${labels}`;
    });
    return descriptions.join('\n');
  } finally {
    await session.close();
  }
}
export async function fetchGraphSummary(): Promise<string> {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (n)-[r]->(m)
      RETURN 
        labels(n) AS from_labels, 
        properties(n) AS from_properties, 
        type(r) AS relationship_type, 
        properties(r) AS relationship_properties, 
        labels(m) AS to_labels, 
        properties(m) AS to_properties
    `);

    const descriptions = result.records.map((record) => {
      const fromLabels = record.get("from_labels").join(", ");
      const fromProps = record.get("from_properties");
      const toLabels = record.get("to_labels").join(", ");
      const toProps = record.get("to_properties");
      const relType = record.get("relationship_type");
      const relProps = record.get("relationship_properties");

      const fromDesc = Object.entries(fromProps)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      const toDesc = Object.entries(toProps)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
      const relDesc = Object.keys(relProps).length > 0
        ? Object.entries(relProps).map(([k, v]) => `${k}: ${v}`).join(", ")
        : " ";

      return `${fromLabels} (${fromDesc}) is connected to ${toLabels} (${toDesc}) via relationship [${relType}] (${relDesc}).`;
    });

    return descriptions.join("\n");
  } finally {
    await session.close();
  }
}

// --- 调用 OpenAI API 生成 Cypher 查询 ---
export async function generateNovelCypher(issue: string): Promise<string> {
  const apData = await fetchGraphSummary(); // 获取 AP 节点信息
  console.log('AP 节点信息:', apData); // 打印 AP 节点信息
  const systemInstruction = `
    You are an AI scriptwriter specialized in designing future sci-fi societies. You need to generate Neo4j Cypher queries based on the AP social model${apData}. 
Note: All nodes should have the "Novel" label, such as (:Person:Novel).
The locations, people(with name, age,role), relationships and events should be set in a futuristic 2050s Japan city.
The background should include some social issues—please use your imagination, and add a satirical tone.
Do not add any explanations, descriptions, or Chinese titles, just output the standard Cypher.
Example: 

// Create character nodes
CREATE (john:Person {name: 'John', age: 28}),
       (alice:Person {name: 'Alice', age: 24}),
       (bob:Person {name: 'Bob', age: 35})
// Create event nodes
CREATE (party:Event {name: 'Birthday Party', date: '2025-05-01'}),
       (conference:Event {name: 'Tech Conference', date: '2025-06-15'})
// Create location nodes
CREATE (park:Location {name: 'Central Park'}),
       (hotel:Location {name: 'Grand Hotel'})
// Create relationships
CREATE (john)-[:PARTICIPATED_IN]->(party),
       (alice)-[:PARTICIPATED_IN]->(party),
       (bob)-[:PARTICIPATED_IN]->(conference),
       (john)-[:VISITED]->(park),
       (alice)-[:VISITED]->(hotel),
       (party)-[:HELD_AT]->(park),
       (conference)-[:HELD_AT]->(hotel)

//caution!! WITH is required between CREATE and MATCH
  `;

  const userPrompt = `
    Please create a society set in Tokyo, Japan, in 2050, related to the social issue:${issue}.
Please create at least 3 character nodes, 3 location nodes, and 3 event nodes, which should fit the characteristics of the city,
and establish reasonable relationships.
  `;

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API 请求失败，状态码: ${response.status}`);
  }

  const data = await response.json();
  const cypherCode = data.choices[0].message.content.trim();
  
  // 移除多余的代码块标记
  const cleanCypherCode = cypherCode.replace(/```cypher[\s\S]*```/g, '').trim();
  console.log('清理后的 Cypher 查询：', cleanCypherCode); // 打印清理后的 Cypher 查询
  return cleanCypherCode;
}

// --- 主程序：生成并写入新的 Novel 子图 ---
export async function createNovelGraph() {
  const shouldClear = prompt('是否清空现有 Novel 子图？(y/n): ');
  if (shouldClear?.toLowerCase() === 'y') {
    await clearNovelGraph();
  }

}
