import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const nome = searchParams.get("nome");

  if (!nome || nome.trim().length < 3) {
    return NextResponse.json([]);
  }

  try {
    const url = `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&search=${encodeURIComponent(nome)}&page_size=5`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      return NextResponse.json({ mensagem: "Erro ao buscar capa" }, { status: 500 });
    }

    const dados = await resposta.json();

    const jogos = dados.results
      .filter((j) => j.background_image)
      .map((j) => ({
        name: j.name,
        capa: j.background_image,
        year: j.released ? Number(j.released.slice(0, 4)) : "",
      }));

    return NextResponse.json(jogos);
  } catch (error) {
    console.error("Erro na busca de capa:", error);
    return NextResponse.json({ mensagem: "Erro ao buscar capa" }, { status: 500 });
  }
}