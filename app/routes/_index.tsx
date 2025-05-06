import { useState } from "react";

export default function Index() {
  const [issue, setIssue] = useState("war");
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [message, setMessage] = useState("");
  const [story, setStory] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  function generateGraph() {
    setMessage("已删除Novel节点，生成新Novel节点。");
  }

  function startStory() {
    setStory(`Title: "Shadows of the Protocol: War in the Age of Echoes"

      Chapter 1: The Static War
      
      Suziki watches a drone-strike simulation while classical poetry plays in the background. The battlefield is no longer physical—it’s a space of algorithms and predictive logic. He’s disturbed: real death, real people, but invisible consequences.
      
      Chapter 2: The Echo Vault
      
      Yoshida retrieves emotional residues from the last skirmish. Akiko warns her: such actions are flagged as "Emotionally Destabilizing" by the Institution AI. But Yoshida is determined. “We can’t fix what we refuse to feel.”
      
      Chapter 3: Algorithmic Dissent
      
      Akiko uses the AP society graph to trace how war propaganda normalizes over time. ValuePerspective nodes tied to compassion shrink. “War,” she tells Suziki, “is just a misaligned protocol.” Suziki challenges her: “Then give me a better one.”
      
      Chapter 4: A New Protocol
      
      Akiko crafts an AP-based governance system: instead of centralized military commands, she uses feedback loops from EverydayExperience to predict the emergence of conflict, and redirects those signals back into institutions via rapid civic decision nodes.
      
      Chapter 5: The Institutional Coup
      
      The existing Institutional AIs resist Akiko’s intervention. She and Yoshida are detained. Suziki leads a rogue mission to extract them, using obsolete guerrilla tactics—proof that value-driven leadership can still beat sterile logic.
      
      Chapter 6: Tokyo in Flames
      
      War breaks out—not from soldiers, but from societal misalignment. An ideological virus infects the Institution’s decision protocols. Chaos reigns. Akiko sends a final signal to Suziki: “Reboot the paradigm.”
      
      Chapter 7: The Rebirth
      
      Suziki broadcasts a city-wide protocol reset—founded not on force, but on an avant-garde model of awareness, critique, and empathy. The AP model becomes law: institutions must be built on feedback from ValuePerspective, not just control.
      
      Epilogue: Echoes Beyond War
      
      Years later, Yoshida runs a center for trauma resonance. Akiko teaches systems ethics. Suziki, now a quiet urban gardener, occasionally lectures on “the war that felt too quiet.”
      
      Reflection on the AP Society:
      
      In AP society, war is not caused by hatred alone—but by failure to translate personal discomfort into institutional feedback. The key is the circular flow: EverydayExperience must question, Institutions must listen, Technology must enable empathy, and Society must reflect. In this story, Suziki’s transformation embodies that recursive shift—a soldier who learned that true leadership starts not from command, but from critique.
      `);
      setCoverUrl("https://oaidalleapiprodscus.blob.core.windows.net/private/org-frg24iQMHWOlgi0tryjCshVm/user-pSovLkHn4MnBkfvZPvM38vfT/img-oGhxN8GWHTnik6EMOtxKwLXx.png?st=2025-05-06T06%3A48%3A22Z&se=2025-05-06T08%3A48%3A22Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=475fd488-6c59-44a5-9aa9-31c4db451bea&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-05T23%3A48%3A43Z&ske=2025-05-06T23%3A48%3A43Z&sks=b&skv=2024-08-04&sig=%2BU/vErEfSc0dTkAK8TiV7vSrzE2q99mXsrEiPZzQyyw%3D");
  }

  function importGraph() {
    // 模拟角色导入
    setCharacters([
      {
        name: "Suziki",
        age: 45,
        role: "Military Leader",
        imageUrl: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-frg24iQMHWOlgi0tryjCshVm/user-pSovLkHn4MnBkfvZPvM38vfT/img-E58DqIhZom7H5Dy8JdOq70nq.png?st=2025-05-06T05%3A45%3A07Z&se=2025-05-06T07%3A45%3A07Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=475fd488-6c59-44a5-9aa9-31c4db451bea&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-06T00%3A24%3A46Z&ske=2025-05-07T00%3A24%3A46Z&sks=b&skv=2024-08-04&sig=WmldrUTOBk1wclZTRe0YIzyJYnsMk1jjaF6q8lAGYf0%3D"
      },
      {
        name: "Yoshida",
        age: 32,
        role: "Field Medic",
        imageUrl: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-frg24iQMHWOlgi0tryjCshVm/user-pSovLkHn4MnBkfvZPvM38vfT/img-mTkPplBV99tj7OetjliJkera.png?st=2025-05-06T05%3A45%3A06Z&se=2025-05-06T07%3A45%3A06Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=475fd488-6c59-44a5-9aa9-31c4db451bea&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-06T00%3A02%3A16Z&ske=2025-05-07T00%3A02%3A16Z&sks=b&skv=2024-08-04&sig=BbPo2M79EUwXF2Y5N6b36y2%2B0jWVOcUPN62aGweo5HE%3D"
      },
      {
        name: "Akiko",
        age: 28,
        role: "Tech Specialist",
        imageUrl: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-frg24iQMHWOlgi0tryjCshVm/user-pSovLkHn4MnBkfvZPvM38vfT/img-qxQJ9SzT6WC7uZzYhu7BdxPf.png?st=2025-05-06T05%3A45%3A07Z&se=2025-05-06T07%3A45%3A07Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=475fd488-6c59-44a5-9aa9-31c4db451bea&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-06T00%3A14%3A28Z&ske=2025-05-07T00%3A14%3A28Z&sks=b&skv=2024-08-04&sig=sAqU3QflXRVDFcSrILM8fFsvCFV5Os/mo6FlIiby8sQ%3D"
      },
    ]);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-8 space-y-6 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-4 mt-8 text-center">🚀 Static Novel Demo 🚀</h1>
      <input
        type="text"
        placeholder="Enter the social issue you want to explore..."
        value={issue}
        onChange={(e) => setIssue("war")}
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
          onClick={importGraph}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 text-white px-8 py-3 rounded-full text-lg transition duration-300 shadow-lg"
        >
          Import Graph
        </button>
      </div>

      {message && (
        <p className="text-green-400 text-xl font-semibold mt-4">{message}</p>
      )}

      {characters.length > 0 && (
        <div className="mt-10 w-full max-w-6xl">
          <h2 className="text-2xl mb-6 text-center">Select Your Character</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {characters.map((char) => (
              <div key={char.name} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 flex flex-col items-start space-y-2">
                <img
                  src={char.imageUrl}
                  alt={`${char.name}'s portrait`}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
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
      
      {coverUrl && story && (
        <div className="w-[400px] h-[600px] bg-white rounded-xl overflow-hidden shadow-lg">
          <div className="h-[500px] w-full">
            <img
              src={coverUrl}
              alt="Cover Image"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="h-[100px] bg-gray-200 text-black px-4 py-3 flex items-center justify-center border-t-4 border-purple-500 shadow-inner">
            <h2 className="text-3xl font-extrabold text-center tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-md">
              {story.match(/Title:\s*(.+?)\n/)?.[1] || "Untitled: My Story"} 
            </h2>
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
