import { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import ScoreTable from "./components/ScoreTable";

function App() {
  const [players, setPlayers] = useState([]);
  const [fase, setFase] = useState("start");
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem("jugadores");
    if (guardados) setPlayers(JSON.parse(guardados));
  }, []);

  const borrarTodo = () => {
    localStorage.removeItem("jugadores");
    localStorage.removeItem("puntajes_animales");
    setPlayers([]);
    setScores([]);
    setFase("start");
  };

  return (
    <div>
      {fase === "start" && (
        <StartScreen setPlayers={setPlayers} setFase={setFase} />
      )}
      {(fase === "game" || fase === "restart") && (
        <Game players={players} setFase={setFase} setScores={setScores} />
      )}
      {fase === "end" && (
        <ScoreTable scores={scores} setFase={setFase} borrarTodo={borrarTodo} />
      )}
    </div>
  );
}

export default App;
