import { json } from "@remix-run/node";
import { driver } from "~/services/graphService";
import { generateCharacterPortrait } from "~/services/imageService";

export async function loader() {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (p:Person:Novel) RETURN p.name AS name, p.age AS age, p.role AS role"
    );


    const characters = await Promise.all(result.records.map(async (record) => {
      const name = record.get("name");
      const age = typeof record.get("age")?.toNumber === "function"
        ? record.get("age").toNumber()
        : record.get("age");
      const role = record.get("role");

      let imageUrl = "";
      try {
        imageUrl = await generateCharacterPortrait(name, age, role);
      } catch (e) {
        console.error(`生成角色 ${name} 的立绘失败:`, e);
      }
      console.log(`角色 ${name} 的立绘链接:`, imageUrl);

      return { name, age, role, imageUrl };
    }));

    return json({ characters });
  } finally {
    await session.close();
  }
}
