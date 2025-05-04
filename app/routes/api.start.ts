import { json } from "@remix-run/node";
import { createStoryFromCharacter } from "~/services/storyService";
import { driver } from "~/services/graphService";
import { generateCoverImage } from "~/services/imageService";

export async function action({ request }: any) {
  const formData = await request.json();
  const selectedCharacter = formData.selectedCharacter;

  const session = driver.session();

  // 从数据库中获取所有子图的节点作为上下文
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
  const issueResult = await session.run(`
    MATCH (n:Issue) RETURN properties(n) AS issue_props LIMIT 25
  `);

    const naturalLanguageContext = result.records.map((record) => {
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
    const relDesc =
      Object.keys(relProps).length > 0
        ? Object.entries(relProps)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")
        : " ";

    return `${fromLabels} (${fromDesc}) is connected to ${toLabels} (${toDesc}) via relationship [${relType}] (${relDesc}).`;
  }).join("\n");
    // 提取社会问题为字符串列表或自然语言描述
  const socialIssues = issueResult.records.map((record) => {
    const props = record.get("issue_props");
    return Object.entries(props)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
  });
  await session.close();

  // 传入 character 和 novelNodes（包括 issue）给生成函数
  const story = await createStoryFromCharacter(selectedCharacter, socialIssues, naturalLanguageContext);

  // ✅ 生成封面图像
  if (!story) {
    return json({ story: null, imageUrl: null });
  }
  
  const imageUrl = await generateCoverImage(story, socialIssues);

  // ✅ 返回封面图链接
  return json({ story, imageUrl });

}
