import { useState } from "react";

export default function Index() {
  const [issue, setIssue] = useState("");
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [story, setStory] = useState("");

  async function generateGraph() {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue }),
    });
    const data = await response.json();
    setCharacters(data.characters);
  }

  async function fetchCharacters() {
    const response = await fetch("/api/fetchCharacters", {
      method: "GET",
    });
    const data = await response.json();
    setCharacters(data.characters);
  }

  async function startStory() {
    const response = await fetch("/api/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedCharacter }),
    });
    const data = await response.json();
    setStory(data.story);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-8 space-y-6 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-4 mt-8 text-center">🚀 Future Sci-Fi Novel Generator 🚀</h1>

      <input
        type="text"
        placeholder="Enter the social issue you want to explore..."
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        className="border-2 border-gray-600 bg-gray-800 p-3 rounded w-full max-w-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex space-x-4 justify-center mt-4">
        <button
          onClick={generateGraph}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-full text-lg transition duration-300 shadow-lg"
        >
          Generate Graph
        </button>

        <button
          onClick={fetchCharacters}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 text-white px-8 py-3 rounded-full text-lg transition duration-300 shadow-lg"
        >
          Load Characters from Neo4j
        </button>
      </div>

      {characters.length > 0 && (
        <div className="mt-10 w-full max-w-6xl">
          <h2 className="text-2xl mb-6 text-center">Select Your Character</h2>
          
          {/* 三列布局开始 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {characters.map((char: any) => (
              <div key={char.name} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 flex flex-col items-start space-y-2">
                <div className="text-xl font-bold">{char.name}</div>
                <div className="text-sm text-gray-400">Age: {char.age}</div>
                <div className="text-sm text-gray-400">Role: {char.role}</div>
                <div className="mt-auto pt-4">
                  <input
                    type="radio"
                    id={char.name}
                    name="character"
                    value={char.name}
                    checked={selectedCharacter === char.name}
                    onChange={(e) => setSelectedCharacter(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={char.name} className="text-sm text-blue-400 cursor-pointer">
                    Select
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* 三列布局结束 */}

          {/* Start Story按钮 放在角色下面 */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={startStory}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white px-10 py-4 rounded-full text-lg transition duration-300 shadow-lg"
            >
              Start Story Generation
            </button>
          </div>
        </div>
      )}

      {story && (
        <div className="mt-12 w-full max-w-3xl bg-gray-900 p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl mb-4 text-center">🌌 Story Generated</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{story}</p>
        </div>
      )}
    </div>
  );
}
