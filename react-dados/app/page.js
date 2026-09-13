'use client';

import { useState } from 'react';
import styles from './page.module.css';

const TOTAL_RODADAS = 5;

// Componente Dado: recebe a prop "valor" (1 a 6) e mostra a IMAGEM
// correspondente, salva dentro do projeto em /public/dados/
function Dado({ valor }) {
  return (
    <img
      src={`/dados/${valor}.png`}
      alt={`Dado mostrando ${valor}`}
      className={styles.dado}
    />
  );
}

// Componente principal do jogo
export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosJogador1, setDadosJogador1] = useState(null); // null = ainda não jogou nesta rodada
  const [dadosJogador2, setDadosJogador2] = useState(null);

  // NOVO: controla de quem é a vez (1 ou 2). Só o botão desse
  // jogador fica habilitado, atendendo ao requisito do enunciado.
  const [turnoAtual, setTurnoAtual] = useState(1);

  const [mensagem, setMensagem] = useState('');
  const [placar, setPlacar] = useState({ jogador1: 0, jogador2: 0, empates: 0 });
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [mensagemFinal, setMensagemFinal] = useState('');

  function rolarDado() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Jogador 1 joga (só funciona se for a vez dele)
  function jogarJogador1() {
    if (turnoAtual !== 1 || jogoFinalizado) return;
    const novosDados = [rolarDado(), rolarDado()];
    setDadosJogador1(novosDados);
    setTurnoAtual(2); // passa a vez para o jogador 2
  }

  // Jogador 2 joga (só funciona se for a vez dele)
  function jogarJogador2() {
    if (turnoAtual !== 2 || jogoFinalizado) return;
    const novosDados = [rolarDado(), rolarDado()];
    setDadosJogador2(novosDados);
    resolverRodada(dadosJogador1, novosDados);
  }

  // Chamada assim que o jogador 2 (o segundo a jogar) termina a rodada
  function resolverRodada(dados1, dados2) {
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
      resultado = '🏆 Jogador 1 venceu a partida!';
    } else if (placarFinal.jogador2 > placarFinal.jogador1) {
      resultado = '🏆 Jogador 2 venceu a partida!';
    } else {
      resultado = '🤝 Empate geral!';
    }
    setMensagemFinal(resultado);
    setJogoFinalizado(true);
  }

  function proximaRodada() {
    setRodada((r) => r + 1);
    setDadosJogador1(null);
    setDadosJogador2(null);
    setTurnoAtual(1); // a rodada nova sempre começa com o jogador 1
  }

  function reiniciarJogo() {
    setRodada(1);
    setDadosJogador1(null);
    setDadosJogador2(null);
    setTurnoAtual(1);
    setMensagem('');
    setPlacar({ jogador1: 0, jogador2: 0, empates: 0 });
    setJogoFinalizado(false);
    setMensagemFinal('');
  }

  const ambosJogaram = dadosJogador1 !== null && dadosJogador2 !== null;

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
              {dadosJogador1 ? (
                <>
                  <Dado valor={dadosJogador1[0]} />
                  <Dado valor={dadosJogador1[1]} />
                </>
              ) : (
                <div className={styles.dadoVazio}>?</div>
              )}
            </div>
            {/* Só habilitado quando for a vez do jogador 1 */}
            <button onClick={jogarJogador1} disabled={turnoAtual !== 1}>
              Jogar
            </button>
          </div>

          <div className={styles.coluna}>
            <h2>Jogador 2</h2>
            <div className={styles.dados}>
              {dadosJogador2 ? (
                <>
                  <Dado valor={dadosJogador2[0]} />
                  <Dado valor={dadosJogador2[1]} />
                </>
              ) : (
                <div className={styles.dadoVazio}>?</div>
              )}
            </div>
            {/* Só habilitado quando for a vez do jogador 2 */}
            <button onClick={jogarJogador2} disabled={turnoAtual !== 2}>
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