from neo4j import GraphDatabase

# 连接到你的Neo4j数据库
uri = "bolt://localhost:7687"  # 本地Neo4j
username = "neo4j"
password = "Huahua1365"

driver = GraphDatabase.driver(uri, auth=(username, password))

def run_query(query):
    with driver.session() as session:
        result = session.run(query)
        return [record.data() for record in result]

cypher_query = """
MATCH (p:Person)-[r]->(other)
WHERE p.name = "Paul Blythe"
RETURN p.name AS person, type(r) AS relationship, other.name AS related_to
"""

graph_data = run_query(cypher_query)
print(graph_data)