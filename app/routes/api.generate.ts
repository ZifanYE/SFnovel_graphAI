// routes/api/generate.ts
import { json } from "@remix-run/node";
import { generateNovelCypher, clearNovelGraph, runCypher, CreateIssueGraph } from "~/services/graphService";
import type { ActionFunctionArgs } from "@remix-run/node";
import { driver } from "~/services/graphService"; // 导入 Neo4j 驱动

export async function action({ request }: ActionFunctionArgs) {
  // 解析请求体中的 JSON 数据
  const formData = await request.json();
  const issue = formData.issue;

  if (typeof issue !== "string" || !issue) {
    throw new Error("Invalid input");
  }

  // 清空现有的 Novel 子图
  await clearNovelGraph();
  await CreateIssueGraph(issue); // 创建新的 issue 节点

  // 生成 Cypher 查询语句
  const cypherQuery = await generateNovelCypher(issue);

  // 执行 Cypher 查询
  await runCypher(cypherQuery);
  console.log("✅ 新小说子图谱已经成功写入 Neo4j！");

  // 从 Neo4j 查询角色节点
  const session = driver.session();

  const result = await session.run("MATCH (p:Person:Novel) RETURN p.name AS name, p.age AS age, p.role AS role");
  const characters = result.records.map(record => ({
    name: record.get("name"),
    age: record.get("age"),
    role: record.get("role"),
  }));

  await session.close();

  // 返回角色信息
  return json({ message: "新小说图谱已经成功写入Neo4j！", characters });

}
