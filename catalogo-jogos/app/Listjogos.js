import Jogos  from "./Jogos"

export default function ListJogos( jogos ){

    if(jogos.length === 0){
        return <p>nnehum jogo cadastrado.</p>
    }

    return(
        <section>
            <h2 classname='tituo-secao'>Jogos cadastrados</h2>

            <div classname='grid'>
                {jogos.map((jogos)=>(
                    <jogos key={jogos.id} produto ={jogos}/>
                ))}

            </div>
        </section>
    )
}