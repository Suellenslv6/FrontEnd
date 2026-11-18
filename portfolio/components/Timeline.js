export default function Timeline({ itens }) {
  return (
    <ol className="timeline">
      {itens.map((i) => (
        <li key={i.titulo}>
          <time>{i.periodo}</time>
          <h3>{i.titulo}</h3>
          <p className="lugar">{i.lugar}</p>
          <h3>{i.Curso}</h3>
          <p>{i.desc}</p>
        </li>
      ))}
    </ol>
  );
}
