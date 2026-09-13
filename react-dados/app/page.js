'use client';

import { useState } from 'react';
import styles from './page.module.css';

const TOTAL_RODADAS = 5;

export default function JogoDeDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosJogador1, setDadosJogador1] = useState([null, null]);
  const [dadosJogador2, setDadosJogador2] = useState([null, null]);
  const [jogador1Jogou, setJogador1Jogou] = useState(false);
  const [jogador2Jogou, setJogador2Jogou] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [placar, setPlacar] = useState({ jogador1: 0, jogador2: 0, empates: 0 });
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [mensagemFinal, setMensagemFinal] = useState('');

  function rolarDado() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogarJogador1() {
    if (jogador1Jogou || jogoFinalizado) return;
    const novosDados = [rolarDado(), rolarDado()];
    setDadosJogador1(novosDados);
    setJogador1Jogou(true);
    verificarFimDaRodada(true, jogador2Jogou, novosDados, dadosJogador2);
  }

  function jogarJogador2() {
    if (jogador2Jogou || jogoFinalizado) return;
    const novosDados = [rolarDado(), rolarDado()];
    setDadosJogador2(novosDados);
    setJogador2Jogou(true);
    verificarFimDaRodada(jogador1Jogou, true, dadosJogador1, novosDados);
  }

  function verificarFimDaRodada(j1Jogou, j2Jogou, dados1, dados2) {
    if (!(j1Jogou && j2Jogou)) return;

    const soma1 = dados1[0] + dados1[1];
    const soma2 = dados2[0] + dados2[1];

    let resultadoRodada;
    const novoPlacar = { ...placar };

    if (soma1 > soma2) {
      resultadoRodada = 'Jogador 1 venceu';
      novoPlacar.jogador1 += 1;
    } else if (soma2 > soma1) {
      resultadoRodada = 'Jogador 2 venceu';
      novoPlacar.jogador2 += 1;
    } else {
      resultadoRodada = 'Empate';
      novoPlacar.empates += 1;
    }

    setMensagem(resultadoRodada);
    setPlacar(novoPlacar);

    if (rodada === TOTAL_RODADAS) {
      finalizarJogo(novoPlacar);
    }
  }

  function finalizarJogo(placarFinal) {
    let resultado;
    if (placarFinal.jogador1 > placarFinal.jogador2) {
      resultado = 'Jogador 1 venceu a partida!';
    } else if (placarFinal.jogador2 > placarFinal.jogador1) {
      resultado = 'Jogador 2 venceu a partida!';
    } else {
      resultado = 'Empate geral!';
    }
    setMensagemFinal(resultado);
    setJogoFinalizado(true);
  }

  function proximaRodada() {
    setRodada((r) => r + 1);
    setDadosJogador1([null, null]);
    setDadosJogador2([null, null]);
    setJogador1Jogou(false);
    setJogador2Jogou(false);
  }

  function reiniciarJogo() {
    setRodada(1);
    setDadosJogador1([null, null]);
    setDadosJogador2([null, null]);
    setJogador1Jogou(false);
    setJogador2Jogou(false);
    setMensagem('');
    setPlacar({ jogador1: 0, jogador2: 0, empates: 0 });
    setJogoFinalizado(false);
    setMensagemFinal('');
  }

  const ambosJogaram = jogador1Jogou && jogador2Jogou;

  // ---------- TELA DE FIM DE JOGO ----------
  if (jogoFinalizado) {
    return (
      <div className={styles.tela}>
        <div className={styles.cartaoFinal}>
          <h1 className={styles.tituloFinal}>Fim de Jogo!</h1>
          <p className={styles.placarFinal}>Jogador 1: {placar.jogador1} vitória(s)</p>
          <p className={styles.placarFinal}>Jogador 2: {placar.jogador2} vitória(s)</p>
          <p className={styles.resultadoFinal}>{mensagemFinal}</p>
          <button className={styles.botaoReiniciar} onClick={reiniciarJogo}>
            Jogar Novamente
          </button>
        </div>
      </div>
    );
  }

  // ---------- TELA DO JOGO ----------
  return (
    <div className={styles.tela}>
      <div className={styles.cartao}>
        <h1>Jogo de Dados</h1>
        <p className={styles.rodada}>Rodada {rodada}/{TOTAL_RODADAS}</p>

        <div className={styles.colunas}>
          <div className={styles.coluna}>
            <h2>Jogador 1</h2>
            <div className={styles.dados}>
              <Dado valor={dadosJogador1[0]} />
              <Dado valor={dadosJogador1[1]} />
            </div>
            <button onClick={jogarJogador1} disabled={jogador1Jogou}>
              Jogar
            </button>
          </div>

          <div className={styles.coluna}>
            <h2>Jogador 2</h2>
            <div className={styles.dados}>
              <Dado valor={dadosJogador2[0]} />
              <Dado valor={dadosJogador2[1]} />
            </div>
            <button onClick={jogarJogador2} disabled={jogador2Jogou}>
              Jogar
            </button>
          </div>
        </div>

        <div className={styles.mensagem}>
          {mensagem || 'Aguardando jogadas...'}
        </div>

        {ambosJogaram && (
          <button className={styles.botaoAvancar} onClick={proximaRodada}>
            Próxima rodada
          </button>
        )}
      </div>
    </div>
  );
}

function Dado({ valor }) {
  return <div className={styles.dado}>{valor ?? '?'}</div>;
}