from neo4j import GraphDatabase
import openai

# ---------- 配置部分 ----------
NEO4J_URI = "bolt://localhost:7687"       # 改成你的数据库地址
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "Huahua1365"     # ⚠️ 改成你自己的密码
OPENAI_API_KEY = "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"     # ⚠️ 改成你自己的 OpenAI Key

openai.api_key = OPENAI_API_KEY

# ---------- 连接 Neo4j ----------
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def run_query(query):
    with driver.session() as session:
        result = session.run(query)
        return [record.data() for record in result]

# ---------- 查询整个 Novel 子图 ----------
def get_novel_graph_data():
    query = """
    MATCH (n:Novel)-[r]->(m:Novel)
    RETURN n.name AS from_node, type(r) AS relationship, m.name AS to_node
    """
    return run_query(query)

# ---------- 构建 Prompt ----------
def generate_prompt(graph_data, character_name):
    if not graph_data:
        return f"找不到任何 Novel 子图数据。"

    prompt = f"背景设定：在2050年的未来社会，日本东京发生了巨大的社会变革。\n"
    prompt += f"主角是「{character_name}」。以下是世界中的人物、地点、事件关系网络：\n"

    for item in graph_data:
        prompt += f"{item['from_node']} 是 {item['to_node']} 的 {item['relationship']}。\n"

    prompt += (
        "\n请根据上述关系，围绕主角「" + character_name + "」，创作一篇科幻短篇故事。"
        "故事要体现出社会问题（如阶级固化、技术失控、社会老龄化）并带有轻微的讽刺风格。"
        "故事结构应包含开端、冲突、高潮与结局。注意保持角色性格一致，地点与事件呼应。"
    )

    return prompt

# ---------- 调用 GPT ----------
def call_gpt(prompt):
    print("正在调用 GPT 生成故事，请稍等...\n")
    response = openai.ChatCompletion.create(
        model="gpt-4",  # 或者用 gpt-3.5-turbo
        messages=[
            {"role": "system", "content": "你是一个善于创作深度科幻故事的作家。"},
            {"role": "user", "content": prompt}
        ]
    )
    return response['choices'][0]['message']['content']

# ---------- 主程序 ----------
def main():
    character_name = input("请输入主角名字：")
    graph_data = get_novel_graph_data()
    prompt = generate_prompt(graph_data, character_name)
    
    print("\n--- 生成的 Prompt ---")
    print(prompt)

    if "找不到" in prompt:
        print("终止：没有相关数据。")
        return

    story = call_gpt(prompt)

    print("\n--- GPT 生成的故事 ---")
    print(story)

# ---------- 执行入口 ----------
if __name__ == "__main__":
    main()