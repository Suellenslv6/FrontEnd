function Jogos({ Jogos }){

    return(

        <article>
            <h2>{Jogos.nome</h2>
            <strong>
                R$ {Number(jogos.preco).toFixed(2).replace(".", ",")}
            </strong>
        </article>
    )
}

export default Jogos;