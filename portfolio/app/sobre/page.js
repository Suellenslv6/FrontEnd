import { perfil, tecnologias } from "@/lib/dados";

export const metadata = { title: "Sobre | Suellen" };

export default function Sobre() {
  return (
    <>
      <h1>Sobre mim</h1>
      <p className="resumo">{perfil.resumo}</p>
      <h2>Tecnologias e módulos usados neste site</h2>
      <ul className="grade">
        {tecnologias.map((t) => (
          <li key={t.nome} className="card">
            <h3>{t.nome}</h3>
            <p>{t.uso}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
