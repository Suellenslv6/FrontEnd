"use client";

import { useState } from "react";

export default function FormJogos({ aoCadastrar }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [anoCriacao, setAnoCriacao] = useState("");

  function enviarFormulario(e) {
    e.preventDefault();
    if (!nome.trim() || !preco) {
      return;
    }

    aoCadastrar({
      nome: nome.trim(),
      preco: Number(preco),
      anoCriacao: anoCriacao ? Number(anoCriacao) : undefined,
    });

    setNome("");
    setPreco("");
    setAnoCriacao("");
  }

  return (
    <form className="formulario" onSubmit={enviarFormulario}>
      <h2>Novo jogo</h2>

      <label>
        Nome
        <input
          type="text"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          placeholder="Ex. Fifa26"
        />
      </label>

      <label>
        Preço
        <input
          type="number"
          min="0"
          step="0.01"
          value={preco}
          onChange={(evento) => setPreco(evento.target.value)}
          placeholder="Ex. 80"
        />
      </label>

      <label>
        Ano de criação
        <input
          type="number"
          value={anoCriacao}
          onChange={(evento) => setAnoCriacao(evento.target.value)}
          placeholder="Ex. 2006"
        />
      </label>

      <button type="submit">Cadastrar jogo</button>
    </form>
  );
}