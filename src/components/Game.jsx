import { useEffect, useState } from "react";
import "../styles/game.css";
import animalesData from "../animales.json";

const MAX_RONDAS = 10;
const TIEMPO_POR_RONDA = 20;

export default function Game({ players, setFase, setScores }) {
  const jugador = players[0]; // Solo un jugador a la vez
  const [ronda, setRonda] = useState(1);
  const [puntaje, setPuntaje] = useState(0);
  const [pregunta, setPregunta] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [tiempo, setTiempo] = useState(TIEMPO_POR_RONDA);
  const [mensaje, setMensaje] = useState("");
  const [anterior, setAnterior] = useState(null);

  useEffect(() => {
    iniciarRonda();
  }, []);

  useEffect(() => {
    if (tiempo <= 0) verificarRespuesta(null);
    const timer = setInterval(() => setTiempo((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [tiempo]);

  const iniciarRonda = () => {
    const animalesDisponibles = [...animalesData];
    let correcto = animalesDisponibles.splice(
      Math.floor(Math.random() * animalesDisponibles.length),
      1
    )[0];

    while (correcto.nombre === anterior) {
      correcto = animalesDisponibles.splice(
        Math.floor(Math.random() * animalesDisponibles.length),
        1
      )[0];
    }

    const distractores = animalesDisponibles
      .sort(() => 0.5 - Math.random())
      .slice(0, 7); // Selecciona 7 distractores en lugar de 3

    const opciones = [...distractores, correcto].sort(
      () => 0.5 - Math.random()
    );

    setPregunta(correcto);
    setOpciones(opciones);
    setAnterior(correcto.nombre);
    setTiempo(TIEMPO_POR_RONDA);
    setMensaje("");
    decirNombre(correcto.nombre);
  };

  const decirNombre = (nombre) => {
    const speech = new SpeechSynthesisUtterance(nombre);
    speech.lang = "es-ES";
    window.speechSynthesis.speak(speech);
  };

  const verificarRespuesta = (seleccion) => {
    const esCorrecto = seleccion === pregunta.nombre;
    const puntosGanados = esCorrecto ? tiempo : 0;
    setPuntaje((p) => p + puntosGanados);
    setMensaje(esCorrecto ? "✅ Correcto" : `❌ Era ${pregunta.nombre}`);

    setTimeout(() => {
      if (ronda < MAX_RONDAS) {
        setRonda((r) => r + 1);
        iniciarRonda();
      } else {
        terminarJuego();
      }
    }, 1500);
  };

  const terminarJuego = () => {
    const resultado = [{ nombre: jugador.nombre, puntaje }];
    setScores(resultado);
    setFase("end");
  };

  return (
    <div className="game-container">
      <h2>Jugador: {jugador.nombre}</h2>
      <p>
        Ronda {ronda} de {MAX_RONDAS}
      </p>
      <p>¿Cuál es el {pregunta?.nombre}?</p>
      <div className="opciones">
        {opciones.map((a, i) => (
          <img
            key={i}
            src={a.imagen}
            alt="animal"
            onClick={() => verificarRespuesta(a.nombre)}
          />
        ))}
      </div>
      <p className="tiempo">⏱️ Tiempo: {tiempo}s</p>
      <p className="mensaje">{mensaje}</p>
    </div>
  );
}
