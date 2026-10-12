"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import FormJogos from "./FormJogos";

export default function Page() {
  const [jogos, setJogos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  async function carregarJogos() {
    try {
      const resposta = await fetch("/api/jogosProd");
      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(dados.mensagem);
        return;
      }
      setJogos(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.error(error);
      setMensagem("Não foi possível carregar os jogos");
    }
  }

  useEffect(() => {
    carregarJogos();
  }, []);

  async function cadastrarJogos(jogo) {
    setMensagem("");
    try {
      const resposta = await fetch("/api/jogosProd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jogo),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setMensagem(dados.mensagem);
        return;
      }

      setJogos((atuais) => [dados, ...atuais]);
      setMensagem("Jogo cadastrado com sucesso");
    } catch (error) {
      console.error(error);
      setMensagem("Não foi possível cadastrar o jogo");
    }
  }

  return (
    <>
      <Header titulo="Catálogo de Jogos" subtitulo="Projeto Frontend e Backend" />

      <main className="conteudo">
        <section className="card-form">
          <FormJogos aoCadastrar={cadastrarJogos} />
          {mensagem && <p className="mensagem">{mensagem}</p>}
        </section>

        <section className="secao-lista">
          <h2>Jogos cadastrados</h2>

          <div className="grade">
            {jogos.map((j) => (
              <article key={j.id} className="card-jogo">
                <h3>{j.name}</h3>
                <p>Ano: {j.year}</p>
                <strong>R$ {Number(j.price).toFixed(2).replace(".", ",")}</strong>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}