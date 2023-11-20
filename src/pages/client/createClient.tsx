import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { ClientService } from "../../services/clientService";
import { ClientCriateDTO } from "../../models/client/clientCreateDTO";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientDTO } from "../../models/client/clientDTO";


export default function CreateClient() {
  
    const [clientToCreate, setClientToCreate] = useState<ClientCriateDTO>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();

    const clientService = new ClientService();
    
    const criar = async () => {
        var resultUpdate: MessagingHelper<ClientDTO | null> = await clientService.Post(clientToCreate!);

        if (resultUpdate.success == false) {
            setErrorMessage(resultUpdate.message);
            setSuccessMessage("");
            return;
        }

        setSuccessMessage("Cliente cadastrado com sucesso.");
        setErrorMessage("");
        setClientToCreate(null!)
    }


    useEffect(() => {
        
    }, [])

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div style={{ width: "100%" }}>
                <Row>
                    <Col xl={12}>
                        <h1>Novo Cliente</h1>
                    </Col>
                </Row>
            </div>
        </nav>


            <div style={{ width: "20%", marginTop: "2em", display: "inline-block" }}>
                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Nome: </label>
                    </Col>
                    <Col xl={6}>
                        <input 
                        type="text"
                        value={clientToCreate?.name ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientToCreate({ ...clientToCreate, name: e.target.value })}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Contacto: </label>
                    </Col>
                    <Col xl={6}>
                        <input 
                        type="text"
                        value={clientToCreate?.phoneNumber ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientToCreate({ ...clientToCreate, phoneNumber: e.target.value })}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Data de Nascimento: </label>
                    </Col>                    
                    <Col xl={6}>
                    <input
                        name="date"
                        placeholder="date placeholder"
                        type="date"
                        value={clientToCreate?.dataNascimento ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientToCreate({ ...clientToCreate, dataNascimento: e.target.value })}
                        />
                    </Col>
                </Row>



                <Row>
                    <Col xl={12}>
                        <button className="btnUpdateClient" type="submit" onClick={criar}>
                            Cadastrar Cliente
                        </button>
                    </Col>
                </Row>

                <Row>
                    <Col xl={12}>
                        <a className="navbar-brand" href="/">
                            <button className="btnUpdateClient" >
                                    Cancelar
                            </button>
                        </a>
                    </Col>
                </Row>

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
            </div>
        </>
    )
}