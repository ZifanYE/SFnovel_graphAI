// routes/api/fetchCharacters.ts
import { json } from "@remix-run/node";
import { driver } from "~/services/graphService"; // 导入 Neo4j 驱动

export async function loader() {
  const session = driver.session();

  try {
    // 从 Neo4j 获取人物信息
    const result = await session.run(
      "MATCH (p:Person:Novel) RETURN p.name AS name, p.age AS age, p.role AS role"
    );

    // 提取并修正结果
    const characters = result.records.map(record => ({
      name: record.get("name"),
      age: typeof record.get("age")?.toNumber === "function" ? record.get("age").toNumber() : record.get("age"),
      role: record.get("role"),
    }));

    return json({ characters });
  } finally {
    await session.close();
  }
}
