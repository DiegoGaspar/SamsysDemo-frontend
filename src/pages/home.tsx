
export default function Home() {

    return (
        <>
            <h2>
                Enunciado
            </h2>

            <div style={{ marginTop: "1em" }}>
                <p>
                    Pretendemos que seja mantida a coerência técnica do projeto, ou seja deverão ser mantidas as mesmas frameworks e tecnologias que já estejam incorporadas no projeto de teste (quer a nivel de frontend quer a nivel de backend), excepto se as mesmas estiverem a provocar algum erro.
                    <br></br>
                    Vamos querer analisar os diferentes commits pelo que deverá colocar este projeto no github, ou similar, e dar-nos acesso a esse repositório.
                </p>
            </div>

            <div style={{ marginTop: "2em" }}>
                <h4>Pontos a desenvolver</h4>

                <ul>
                    <li>Adicionar campo "Data Nascimento" na entidade cliente.</li>
                    <li>Implementar página, endpoint e processo na api para criar um cliente</li>
                    <li>Implementar página, endpoint e processo na api para listar todos os clientes</li>
                    <li>Qualquer tipo de melhoria será contabilizada</li>
                </ul>
            </div>

            <div style={{ marginTop: "2em" }}>
                <h4>
                    Algumas dicas:
                </h4>
                <p>
                    Existe, implementada, uma rota e página para fazer a atualização de um cliente.
                    <br></br>
                    Quando a listagem estiver implementada deve colocar um link em cada registo para redirecionar
                    essa página.
                </p >
            </div>
        </>
    )
}