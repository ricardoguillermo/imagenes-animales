import { useEffect, useState } from "react";
import "../styles/startScreen.css";

export default function StartScreen({ setPlayers, setFase }) {
  const [nombre, setNombre] = useState("");
  const [lista, setLista] = useState([]);
  const [jugadorInicial, setJugadorInicial] = useState(null);

  useEffect(() => {
    const guardados = localStorage.getItem("jugadores");
    if (guardados) {
      const parsed = JSON.parse(guardados);
      setLista(parsed);
      setPlayers(parsed);
    }
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

  const comenzar = () => {
    if (jugadorInicial !== null) {
      // rotar la lista para que el jugador seleccionado empiece primero
      const rotada = [...lista.slice(jugadorInicial), ...lista.slice(0, jugadorInicial)];
      setPlayers(rotada);
      setFase("game");
    }
  };

  return (
    <div className="start-container">
      <h1>🎮 Juego de Animales 🐾</h1>
      <div className="input-section">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del jugador"
        />
        <button onClick={agregarJugador}>Agregar</button>
      </div>
      <div className="tarjetas-container">
        {lista.map((j, i) => (
          <div
            key={i}
            className={`tarjeta ${jugadorInicial === i ? "seleccionado" : ""}`}
            onClick={() => setJugadorInicial(i)}
          >
            <div className="nombre">{j.nombre}</div>
          </div>
        ))}
      </div>
      <button onClick={comenzar} disabled={jugadorInicial === null}>
        🚀 Comenzar
      </button>
    </div>
  );
}
