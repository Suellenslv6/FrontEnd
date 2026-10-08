"use client";

import { useEffect, useState } from "react";
import Parse from "./jogosParse";

export default function Home() {
  const [jogos, setJogos] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");

  async function listar() {
    const query = new Parse.Query("Jogosantigos");
    const results = await query.find();
    setJogos(results);
  }

  async function criar(e) {
    e.preventDefault();
    const Jogo = Parse.Object.extend("Jogosantigos");
    const jogo = new Jogo();
    jogo.set("name", name);
    jogo.set("price", Number(price));
    jogo.set("year", Number(year));
    await jogo.save();
    setName("");
    setPrice("");
    setYear("");
    listar();
  }

  useEffect(() => {
    listar();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Catálogo de jogos</h1>

      <form onSubmit={criar} style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Preço" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input placeholder="Ano" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {jogos.map((j) => (
          <li key={j.id}>
            {j.get("name")} ({j.get("year")}) - R$ {j.get("price")}
          </li>
        ))}
      </ul>
    </main>
  );
}