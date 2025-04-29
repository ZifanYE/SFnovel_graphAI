import openai from "./openai";

export async function createStoryFromCharacter(character: string) {
  const prompt = `
Main character: ${character}
Please take this character as the protagonist and write a dramatic and plot-rich sci-fi novel in english. The setting is Tokyo in 2050, where technology is highly advanced, and social class division is severe. The story should include a reflection on future societal issues.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content;
}
