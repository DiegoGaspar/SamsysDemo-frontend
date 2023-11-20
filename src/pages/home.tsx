import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { MessagingHelper } from "../models/helper/messagingHelper";
import { ClientService } from "../services/clientService";
import { PaginationHelper } from "../models/helper/paginationHelper";

export default function Home() {
    const [listToClients, setListAllClient]= useState<PaginationHelper>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();
    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);

    const clientService = new ClientService();

    const getAll = async (page:number) => {
        if(page === undefined || page ===0){
            page = 1;
        }
        setPage(page);
        console.log("PAGINA:",page)

        var resultGetAllClient: MessagingHelper<PaginationHelper | null> = await clientService.GetAll(page, 5);
        console.log("RESULTADO:",resultGetAllClient)
        if (resultGetAllClient.success == false) {
            setErrorMessage(resultGetAllClient.message);
            setSuccessMessage("");
            return;
        }

        setListAllClient(resultGetAllClient.obj!)
        setLastPage(resultGetAllClient.obj?.totalPages!);
        setErrorMessage("");
    }
    useEffect(() => {
        getAll(1);
    }, [])

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div style={{ width: "100%" }}>
            <Row>
                <Col xl={12}>
                    <h1>Clientes</h1>
                </Col>
            </Row>
        </div>
            <a href="/client/create" className="nav-item nav-link">
                <button >
                    Novo Cliente
                </button>
            </a>
        </nav>

        <div>
            <table className="table">
                <thead>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Data de Nascimento</th>
                    <th>Ação</th>
                </thead>
                <tbody>
                    {listToClients?.items?.map((elemnt,index) =>(
                        <tr key={index}>
                            <td>{elemnt.id}</td>
                            <td>{elemnt.name}</td>
                            <td>{elemnt.phoneNumber}</td>
                            <td>{elemnt.dataNascimento}</td>
                            <td>                                
                                <Row>
                                    <Col xl={12}>
                                        <a className="navbar-brand" href={"/client/edit/"+elemnt.id}>
                                            <button className="btnUpdateClient" >
                                                    Editar
                                            </button>
                                        </a>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        {page !== 1 ? <button type='button' onClick={() => getAll(1)}>Primeira</button> : <button type='button' disabled>Primeira</button>}{" "}

        {page !== 1 ? <button type='button' onClick={() => getAll(page - 1)}>{page - 1}</button>: "" }{" "}
        
        <button type='button' disabled>{page}</button>{" "}

        {page + 1 <= lastPage ? <button type='button' onClick={() => getAll(page + 1)}>{page + 1}</button>: ""}{" "}

        {page !== lastPage ? <button type='button' onClick={() => getAll(lastPage)}>Última</button> : <button type='button' disabled>Última</button>}{" "}
           
        </div>

        {errorMessage &&
            <Row>
                <Col xl={12} className="error">
                    {errorMessage}
                </Col>
            </Row>
        }

        {successMessage &&
            <Row>
                <Col xl={12} className="success">
                    {successMessage}
                </Col>
            </Row>
        }

      </>
    )
}
