import { useEffect, useState } from "react";
import "../styles/scoreTable.css";

export default function ScoreTable({ scores, setFase }) {
  const jugador = scores[0];
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const historico = JSON.parse(localStorage.getItem("ranking_top10")) || [];
    const yaExiste = historico.some(
      (j) => j.nombre === jugador.nombre && j.puntaje === jugador.puntaje
    );
    const actualizado = yaExiste ? historico : [...historico, jugador];

    const top10 = actualizado
      .sort((a, b) => b.puntaje - a.puntaje)
      .slice(0, 10);
    setRanking(top10);
    localStorage.setItem("ranking_top10", JSON.stringify(top10));

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
      <br />
      <button onClick={() => setFase("start")}>🏠 Volver al inicio</button>

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
