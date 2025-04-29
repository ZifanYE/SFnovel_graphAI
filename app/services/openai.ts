import OpenAI from "openai";

// 安全获取 API KEY
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("❌ 没有找到 OpenAI API Key，请在 .env 文件中设置 OPENAI_API_KEY！");
}

// 创建 OpenAI 客户端
const openai = new OpenAI({
  apiKey,
  baseURL: "https://api.openai.com/v1",
});

export default openai;
