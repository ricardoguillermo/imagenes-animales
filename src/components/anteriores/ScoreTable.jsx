import { useEffect, useState } from "react";
import "../styles/scoreTable.css";

export default function ScoreTable({ scores, setFase }) {
  const jugador = scores[0];
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const historico = JSON.parse(localStorage.getItem("ranking_top10")) || [];
    const actualizado = [...historico, jugador]
      .sort((a, b) => b.puntaje - a.puntaje)
      .slice(0, 10);
    setRanking(actualizado);
    localStorage.setItem("ranking_top10", JSON.stringify(actualizado));
  }, [jugador]);

  return (
    <div className="score-container">
      <h2>🏁 Resultado de {jugador.nombre}</h2>
      <p>Obtuviste {jugador.puntaje} puntos</p>

      <button onClick={() => setFase("restart")}>
        🔁 ¿Querés jugar de nuevo, {jugador.nombre}?
      </button>

      <h2>🏆 Ranking Top 10</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Jugador</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((j, i) => (
            <tr key={i}>
              <td>{["🥇", "🥈", "🥉"][i] || i + 1}</td>
              <td>{j.nombre}</td>
              <td>{j.puntaje}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
