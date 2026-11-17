import { DM_Sans, Press_Start_2P } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const corpo = DM_Sans({ subsets: ["latin"], variable: "--f-corpo" });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--f-pixel" });

export const metadata = {
  title: "Suellen | Portfólio",
  description: "Currículo e portfólio de desenvolvimento front-end com React e Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${corpo.variable} ${pixel.variable}`}>
        <Navbar />
        <main className="pagina">{children}</main>
        <footer className="rodape">© 2026 Suellen · Feito com Next.js</footer>
      </body>
    </html>
  );
}
