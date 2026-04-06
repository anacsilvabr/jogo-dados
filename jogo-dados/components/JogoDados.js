"use client";
import { useState } from "react";
import Dado from "./Dados";

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosJ1, setDadosJ1] = useState([1, 1]);
  const [dadosJ2, setDadosJ2] = useState([1, 1]);
  const [placar, setPlacar] = useState({ j1: 0, j2: 0 });
  const [historico, setHistorico] = useState([]);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [j1Jogou, setJ1Jogou] = useState(false);

  const rolarDado = () => Math.floor(Math.random() * 6) + 1;

  const jogarJ1 = () => {
    if (jogoFinalizado) return;

    const d1 = rolarDado();
    const d2 = rolarDado();

    setDadosJ1([d1, d2]);
    setJ1Jogou(true);
  };

  const jogarJ2 = () => {
    if (jogoFinalizado || !j1Jogou) return;

    const d1 = rolarDado();
    const d2 = rolarDado();

    const somaJ1 = dadosJ1[0] + dadosJ1[1];
    const somaJ2 = d1 + d2;

    setDadosJ2([d1, d2]);

    setPlacar((prev) => ({
      j1: prev.j1 + somaJ1,
      j2: prev.j2 + somaJ2,
    }));
    
    const novaRodada = {
      rodada,
      j1: somaJ1,
      j2: somaJ2,
    };

    setHistorico((prev) => [...prev, novaRodada]);

    setJ1Jogou(false);

    if (rodada === 5) {
      setJogoFinalizado(true);
    } else {
      setRodada((r) => r + 1);
    }
  };

  const vencedorFinal = () => {
    if (placar.j1 > placar.j2) return "🏆 Jogador 1 venceu!";
    if (placar.j2 > placar.j1) return "🏆 Jogador 2 venceu!";
    return "🤝 Empate!";
  };

  const reiniciar = () => {
    setRodada(1);
    setDadosJ1([1, 1]);
    setDadosJ2([1, 1]);
    setPlacar({ j1: 0, j2: 0 });
    setHistorico([]);
    setJogoFinalizado(false);
    setJ1Jogou(false);
  };

  return (
    <div className="container">
      <h1>🎲 Jogo de Dados</h1>

      <div>Rodada: {rodada}</div>

      <div className="jogadores">
        <div>
          <h3>Jogador 1</h3>
          <Dado valor={dadosJ1[0]} />
          <Dado valor={dadosJ1[1]} />
          <br />
          <button onClick={jogarJ1} disabled={j1Jogou || jogoFinalizado}>
            Jogar J1
          </button>
        </div>

        <div>
          <h3>Jogador 2</h3>
          <Dado valor={dadosJ2[0]} />
          <Dado valor={dadosJ2[1]} />
          <br />
          <button onClick={jogarJ2} disabled={!j1Jogou || jogoFinalizado}>
            Jogar J2
          </button>
        </div>
      </div>

      <h3>Placar: {placar.j1} x {placar.j2}</h3>

      {/* 📜 HISTÓRICO */}
      <div>
        <h3>Histórico (últimas rodadas)</h3>
        <ul>
          {historico.map((r, index) => (
            <li key={index}>
              Rodada {r.rodada}: J1 ({r.j1}) x J2 ({r.j2})
            </li>
          ))}
        </ul>
      </div>

      {jogoFinalizado && (
        <div>
          <h2>{vencedorFinal()}</h2>
          <button onClick={reiniciar}>Reiniciar</button>
        </div>
      )}
    </div>
  );
}