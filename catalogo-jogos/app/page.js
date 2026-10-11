"use client";

import { useEffect, useState } from "react";
import Parse from "./jogosParse";
import Header from "./Header";
import FormJogos from "./FormJogos";

export default function Home() {
  const [jogos, setJogos] = useState([]);

  async function listar() {
    const query = new Parse.Query("Jogosantigos");
    const results = await query.find();
    setJogos(results);
  }

  async function cadastrar(dados) {
    const Jogo = Parse.Object.extend("Jogosantigos");
    const jogo = new Jogo();
    jogo.set("name", dados.nome);
    jogo.set("price", dados.preco);
    jogo.set("year", dados.anoCriacao);
    await jogo.save();
    listar();
  }

  useEffect(() => {
    listar();
  }, []);

 return (
  <>
    <Header titulo="Catálogo de Jogos" subtitulo="Projeto Frontend e Backend" />

    <main className="conteudo">
      <div id="novo">
        <FormJogos aoCadastrar={cadastrar} />
      </div>

      <ul id="jogos" className="lista">
        {jogos.map((j) => (
          <li key={j.id}>
            {j.get("name")} ({j.get("year")}) - R$ {j.get("price")}
          </li>
        ))}
      </ul>
    </main>
  </>
)}