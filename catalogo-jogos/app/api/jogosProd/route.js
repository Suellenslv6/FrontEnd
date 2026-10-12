import Parse from "parse/node";
import { NextResponse } from "next/server";

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com";

export async function GET() {
  try {
    const query = new Parse.Query("Jogos");
    query.descending("createdAt");
    const resultados = await query.find();

    const jogos = resultados.map((j) => ({
      id: j.id,
      name: j.get("name"),
      price: j.get("price"),
      year: j.get("year"),
    }));

    return NextResponse.json(jogos);
  } catch (error) {
    console.error("Erro no GET:", error);
    return NextResponse.json(
      { mensagem: "Erro ao buscar jogos: " + error.message },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const dados = await request.json();
    console.log("Recebido:", dados);

    const Jogo = Parse.Object.extend("Jogos");
    const jogo = new Jogo();
    jogo.set("name", dados.name);
    jogo.set("price", Number(dados.price));
    jogo.set("year", Number(dados.year));

    // ... resto do código igual

    const salvo = await jogo.save();

    return NextResponse.json(
      {
        id: salvo.id,
        name: dados.name,
        price: Number(dados.price),
        year: Number(dados.year),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no POST:", error);
    return NextResponse.json(
      { mensagem: "Erro ao cadastrar jogo: " + error.message },
      { status: 500 }
    );
  }
}