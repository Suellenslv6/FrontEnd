"use client";

import { useEffect, useRef, useState } from "react";

export default function FormJogos({ aoCadastrar }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [capa, setCapa] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const pularBusca = useRef(false);

  useEffect(() => {
    if (pularBusca.current) {
      pularBusca.current = false;
      return;
    }

    if (name.trim().length < 3) {
      setSugestoes([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const resposta = await fetch(`/api/capa?nome=${encodeURIComponent(name)}`);
        const dados = await resposta.json();
        setSugestoes(Array.isArray(dados) ? dados : []);
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [name]);

  function escolher(jogo) {
    pularBusca.current = true;
    setName(jogo.name);
    setCapa(jogo.capa);
    setYear(jogo.year);
    setSugestoes([]);
  }

  async function enviar(e) {
    e.preventDefault();

    await aoCadastrar({ name, price, year, capa });

    setName("");
    setPrice("");
    setYear("");
    setCapa("");
    setSugestoes([]);
  }

  return (
    <form onSubmit={enviar} className="form-jogos">
      <h2>Novo jogo</h2>

      <label htmlFor="name">Nome</label>
      <input
        id="name"
        type="text"
        placeholder="Ex. Fifa26"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
        required
      />

      {sugestoes.length > 0 && (
        <ul className="sugestoes">
          {sugestoes.map((s) => (
            <li key={s.name + s.year} onClick={() => escolher(s)}>
              <img src={s.capa} alt="" />
              <span>
                {s.name} {s.year && `(${s.year})`}
              </span>
            </li>
          ))}
        </ul>
      )}

      <label htmlFor="price">Preço</label>
      <input
        id="price"
        type="number"
        step="0.01"
        placeholder="Ex. 80"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label htmlFor="year">Ano de criação</label>
      <input
        id="year"
        type="number"
        placeholder="Ex. 2006"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />

      {capa && (
        <img src={capa} alt="Prévia da capa" className="previa-capa" />
      )}

      <button type="submit">Cadastrar jogo</button>
    </form>
  );
}