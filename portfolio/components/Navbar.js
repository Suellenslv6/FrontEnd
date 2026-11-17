"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/", "Home"],
  ["/sobre", "Sobre"],
  ["/academica", "Acadêmica"],
  ["/profissional", "Profissional"],
  ["/projetos", "Projetos"],
];

export default function Navbar() {
  const atual = usePathname();
  return (
    <header className="topo">
      <nav className="nav" aria-label="Principal">
        <span className="marca">SL</span>
        <ul>
          {links.map(([href, nome]) => (
            <li key={href}>
              <Link href={href} className={atual === href ? "ativo" : ""}>{nome}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
