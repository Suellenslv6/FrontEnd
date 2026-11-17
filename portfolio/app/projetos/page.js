"use client";
import { useEffect, useState } from "react";
import { perfil, projetos } from "@/lib/dados";

export default function Projetos() {
  const [repos, setRepos] = useState([]);
  const [estado, setEstado] = useState("carregando");

  // Integração com a GitHub API (pública, sem chave)
  useEffect(() => {
    fetch(`https://api.github.com/users/${perfil.github}/repos?sort=updated&per_page=12`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((dados) => { setRepos(dados); setEstado("ok"); })
      .catch(() => setEstado("erro"));
  }, []);

  return (
    <>
      <h1>Projetos desenvolvidos</h1>
      <ul className="grade">
        {projetos.map((p) => (
          <li key={p.nome} className="card destaque">
            <h3>{p.nome}</h3>
            <p>{p.desc}</p>
            <p className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</p>
            <a href={p.link} target="_blank" rel="noreferrer">Ver código no GitHub</a>
          </li>
        ))}
      </ul>

      <h2>Meus repositórios no GitHub</h2>
      {estado === "carregando" && <p>Carregando repositórios...</p>}
      {estado === "erro" && <p>Não foi possível carregar os repositórios. Tente recarregar a página.</p>}
      <ul className="grade">
        {repos.map((r) => (
          <li key={r.id} className="card">
            <h3>{r.name}</h3>
            <p>{r.description || "Sem descrição."}</p>
            <p className="tags">{r.language && <span>{r.language}</span>}<span>★ {r.stargazers_count}</span></p>
            <a href={r.html_url} target="_blank" rel="noreferrer">Abrir repositório</a>
          </li>
        ))}
      </ul>
    </>
  );
}
