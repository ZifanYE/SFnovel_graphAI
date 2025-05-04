import openai from "./openai";

export async function createStoryFromCharacter(character: string, issue : string[], nodes: string) {
  // 从 nodes 中提取 issue 内容


  const prompt = `
  Main character: ${character}
  You know how the AP society is, ${nodes}.
  Focus on the social issue(s): ${issue}. Provide a meaningful, futuristic solution.
  Please take this character as the protagonist and write a dramatic and plot-rich sci-fi novel. The setting is Tokyo in 2050. The story should include a reflection on the future societal issue(s): ${issue}.
  Add your own understanding of the AP society finally.
  `;
  console.log("Social issue:"+ issue)
  console.log("Reading AP data...", nodes);


  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}
