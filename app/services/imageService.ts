// services/imageService.ts
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const OPENAI_IMAGE_API_URL = "https://api.openai.com/v1/images/generations";

export async function generateCoverImage(story: string, issue: string[]): Promise<string> {
  const prompt = `Create a futuristic sci-fi novel cover illustration with words,
  based on the social issue ${issue},add the title you like,
  and based on this story: ${story.slice(0, 300)}...`;

  const response = await fetch(OPENAI_IMAGE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "url",
    }),
  });

  if (!response.ok) {
    throw new Error(`DALL·E API 请求失败，状态码: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].url;
}
