import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import ScoreTable from "./components/ScoreTable";

function App() {
  const [players, setPlayers] = useState([]);
  const [fase, setFase] = useState("start");
  const [scores, setScores] = useState([]);

  return (
    <div>
      {fase === "start" && (
        <StartScreen setPlayers={setPlayers} setFase={setFase} />
      )}

      {fase === "game" && (
        <Game
          players={players}
          setFase={setFase}
          setScores={setScores}
        />
      )}

      {fase === "end" && <ScoreTable scores={scores} />}
    </div>
  );
}

export default App;
