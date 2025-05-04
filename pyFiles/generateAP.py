from neo4j import GraphDatabase
import openai

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
        result = session.run(cypher_query)
        return [record.data() for record in result]

# --- 用 GPT 生成 Cypher ---
def generate_cypher(prompt):
    system_instruction = (
        "你是一个熟练使用Neo4j Cypher语言的数据建模专家。"
        "请根据用户的描述生成标准的Cypher语句，用来创建节点和关系。"
        "不要添加任何解释、说明、中文标题，只输出标准Cypher。"
    )
    response = openai.ChatCompletion.create(
        model="gpt-4",  # 或 gpt-3.5-turbo
        messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": prompt}
        ]
    )
    cypher_code = response['choices'][0]['message']['content']
    return cypher_code

# --- 主程序 ---
def main():
    user_prompt = (
        "请描述社会文化系统如何演变。知识图谱应包含 6 个核心对象 和 12 个转换关系，并使用 范畴论（Category Theory）来定义对象之间的转换逻辑。每个对象应包含清晰的定义，并连接到相关的转换关系。"
        "核心对象例如选择一个社会文化主题（例如：气候变化、技术发展、艺术影响等）。"
        "设定 6 个核心对象，例如：前卫的社会问题，技术与资源，社会问题，日常空间与用户体验，人们的价值观，制度；"
        "为每个对象定义其作用，并描述它如何影响社会文化系统。设定 12 个转换关系，例如：前卫的社会问题 → 技术与资源（受技术发展影响）；技术与资源 → 日常空间与用户体验（产品与服务创造）；社会问题 → 人们的价值观（社会沟通）；人们的价值观 → 制度（习惯化）；制度 → 技术与资源（标准化）；艺术批评 → 社会问题（文化艺术振兴）"
        "将所有对象和转换关系可视化，生成一个 知识图谱，并确保模型能够扩展到多个时间维度。确保生成的知识图谱符合neo4j的标准语法。")

    cypher_query = generate_cypher(user_prompt)
    
    print("\n--- 生成的Cypher语句 ---")
    print(cypher_query)
    
    # 运行前二次确认
    confirm = input("\n是否执行该Cypher到数据库？(y/n): ")
    if confirm.lower() == "y":
        run_cypher(cypher_query)
        print("✅ 已经在Neo4j中执行成功！")
    else:
        print("❌ 取消执行。")

if __name__ == "__main__":
    main()
