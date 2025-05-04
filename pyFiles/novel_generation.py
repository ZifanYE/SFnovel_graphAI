from neo4j import GraphDatabase
import openai
import re

# --- 配置区 ---
NEO4J_URI = "bolt://localhost:7687"   
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "Huahua1365"    
OPENAI_API_KEY = "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"     # ⚠️ 改成你自己的 OpenAI Key


openai.api_key = OPENAI_API_KEY
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# --- 帮你跑 Cypher 的函数 ---
def run_cypher(cypher_query):
    with driver.session() as session:
        session.run(cypher_query)

# --- 提取GPT返回的Cypher代码块 ---
def extract_cypher(text):
    match = re.search(r"```cypher\s*(.*?)\s*```", text, re.DOTALL)
    if match:
        return match.group(1)
    else:
        return text.strip()

# --- 让GPT根据prompt生成Cypher语句 ---
def generate_novel_cypher():
    system_instruction = (
        "你是一个专门设计未来科幻社会的AI编剧，"
        "需要根据描述生成Neo4j Cypher语句。"
        "注意：所有节点应该带上 Novel 标签，比如 (:Person:Novel)。"
        "地点、人物、事件要设定在2050年日本未来城市。"
        "背景要包含一定的社会问题，请发挥你的想象力，并带有讽刺意味。"
        "不要添加任何解释、说明、中文标题，只输出标准Cypher。"
    )

    user_prompt = (
        "请以2050年的日本东京为背景，创造一个科技极度发达但阶级极度分化的社会。"
        "请至少创建3个人物节点，3个地点节点，3个事件节点，要符合城市的特色"
        "并建立合理的关系。"
    )

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": user_prompt}
        ]
    )

    cypher_code = response['choices'][0]['message']['content']
    cypher_code = extract_cypher(cypher_code)
    return cypher_code

# --- 删除旧的Novel子图 ---
def clear_novel_graph():
    delete_query = """
    MATCH (n:Novel)
    DETACH DELETE n
    """
    run_cypher(delete_query)
    print("🗑 已删除所有Novel子图节点和关系。")

# --- 主程序 ---
def main():
    
    choice = input("是否清空现有Novel子图？(y/n): ")
    if choice.lower() == "y":
        clear_novel_graph()
    
    

    print("\n开始生成新的小说图谱...请稍等...")
    cypher_query = generate_novel_cypher()
    print("\n--- 生成的Cypher语句 ---")
    print(cypher_query)

    confirm = input("\n是否执行写入Neo4j？(y/n): ")
    if confirm.lower() == "y":
        run_cypher(cypher_query)
        print("✅ 新的小说子图谱已经成功写入Neo4j！")
    else:
        print("❌ 取消执行。")

if __name__ == "__main__":
    main()
