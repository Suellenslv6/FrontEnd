export default function Header({ titulo, subtitulo }) {
  return (
    <header className="cabecalho">
      <h1>{titulo}</h1>
      {subtitulo && <p>{subtitulo}</p>}
    </header>
  );
}