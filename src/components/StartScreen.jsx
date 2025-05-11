import { useEffect, useState } from "react";
import "../styles/startScreen.css";

export default function StartScreen({ setPlayers, setFase }) {
  const [nombre, setNombre] = useState("");
  const [lista, setLista] = useState([]);
  const [jugadorInicial, setJugadorInicial] = useState(null);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem("jugadores");
    if (guardados) {
      const parsed = JSON.parse(guardados);
      setLista(parsed);
      setPlayers(parsed);
    }

    const top10 = JSON.parse(localStorage.getItem("ranking_top10")) || [];
    setRanking(top10);
  }, [setPlayers]);

  const agregarJugador = () => {
    if (nombre.trim()) {
      const nuevoJugador = { nombre: nombre.trim(), puntaje: 0 };
      const actualizados = [...lista, nuevoJugador];
      setLista(actualizados);
      setNombre("");
      setPlayers(actualizados);
      localStorage.setItem("jugadores", JSON.stringify(actualizados));
    }
  };

  const borrarJugador = (index) => {
    const actualizados = lista.filter((_, i) => i !== index);
    setLista(actualizados);
    setPlayers(actualizados);
    localStorage.setItem("jugadores", JSON.stringify(actualizados));
    if (jugadorInicial === index) setJugadorInicial(null);
  };

  const borrarTodo = () => {
    localStorage.removeItem("jugadores");
    localStorage.removeItem("ranking_top10");
    setLista([]);
    setRanking([]);
    setJugadorInicial(null);
    setPlayers([]);
  };

  const comenzar = () => {
    if (jugadorInicial !== null) {
      const rotada = [
        ...lista.slice(jugadorInicial),
        ...lista.slice(0, jugadorInicial),
      ];
      setPlayers(rotada);
      setFase("game");
    }
  };

  return (
    <div className="start-container">
      <h1>🎮 Animales 🐾</h1>
      <div className="input-section">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del jugador"
        />
        <button id="btniniciales" onClick={agregarJugador}>
          Agregar
        </button>
        <button id="btniniciales" onClick={borrarTodo}>
          🗑️ Borrar todo
        </button>
      </div>

      <h2>Jugadores</h2>
      <div className="tarjetas-container">
        {lista.map((j, i) => (
          <div
            key={i}
            className={`tarjeta ${jugadorInicial === i ? "seleccionado" : ""}`}
            onClick={() => setJugadorInicial(i)}
          >
            <div className="nombre">{j.nombre}</div>
            <button
              className="papelera"
              onClick={(e) => {
                e.stopPropagation();
                borrarJugador(i);
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <button onClick={comenzar} disabled={jugadorInicial === null}>
        🚀 Comenzar
      </button>

      <h2>🏆 Ranking Top 10</h2>
      <table className="ranking">
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
