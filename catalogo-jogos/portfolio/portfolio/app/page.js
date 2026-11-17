import Link from "next/link";
import { perfil } from "@/lib/dados";

export default function Home() {
  return (
    <section className="hero">
      <p className="ola">Olá, eu sou</p>
      <h1 className="pixel">{perfil.nome}</h1>
      <p className="cargo">{perfil.cargo}</p>
      <p className="resumo">{perfil.resumo}</p>
      <div className="botoes">
        <Link href="/projetos" className="btn">Ver meus projetos</Link>
        <Link href="/sobre" className="btn sec">Conhecer minhas tecnologias</Link>
      </div>
      <p className="links">
        <a href={`https://github.com/${perfil.github}`} target="_blank" rel="noreferrer">GitHub</a>
        <a href={perfil.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={`mailto:${perfil.email}`}>E-mail</a>
      </p>
    </section>
  );
}
