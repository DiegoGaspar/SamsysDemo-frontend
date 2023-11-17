import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ClientDTO } from "../../models/client/clientDTO";
import { ClientEditDTO } from "../../models/client/clientEditDTO";
import { MessagingHelper } from "../../models/helper/messagingHelper";
import { ClientService } from "../../services/clientService";
import ClientStatusComponent from "../../components/client/statusComponent";

export default function EditClient() {
    const { id } = useParams<{ id: string; }>();
    const [clientToUpdate, setClientToUpdate] = useState<ClientEditDTO>();
    const [isActive, setIsActive] = useState<boolean>(true);

    const [errorMessage, setErrorMessage] = useState<string>();
    const [successMessage, setSuccessMessage] = useState<string>();

    const clientService = new ClientService();

    const get = async () => {
        var resultGetClient: MessagingHelper<ClientDTO | null> = await clientService.Get(Number(id));

        if (resultGetClient.success == false) {
            setErrorMessage(resultGetClient.message);
            setSuccessMessage("");
            return;
        }

        var client: ClientEditDTO = {
            name: resultGetClient.obj!.name,
            phoneNumber: resultGetClient.obj!.phoneNumber,
            concurrencyToken: resultGetClient.obj!.concurrencyToken
        }

        setErrorMessage("");
        setClientToUpdate(client);
        setIsActive(resultGetClient.obj!.isActive);
    }

    const update = async () => {
        var resultUpdate: MessagingHelper<ClientDTO | null> = await clientService.Update(Number(id), clientToUpdate!);

        if (resultUpdate.success == false) {
            setErrorMessage(resultUpdate.message);
            setSuccessMessage("");
            return;
        }

        setSuccessMessage("Cliente atualizado com sucesso");
        setErrorMessage("");
        setClientToUpdate(resultUpdate.obj!)
    }

    useEffect(() => {
        get();
    }, [])

    return (
        <>
            <div style={{ width: "100%" }}>
                <Row>
                    <Col xl={12}>
                        <h1>Editar Cliente</h1>
                    </Col>
                </Row>
            </div>


            <div style={{ width: "20%", marginTop: "2em", display: "inline-block" }}>
                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Nome: </label>
                    </Col>
                    <Col xl={6}>
                        <input type="text"
                            value={clientToUpdate?.name ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientToUpdate({ ...clientToUpdate, name: e.target.value })} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={6} style={{ textAlign: "right" }}>
                        <label>Contacto: </label>
                    </Col>
                    <Col xl={6}>
                        <input type="text"
                            value={clientToUpdate?.phoneNumber ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientToUpdate({ ...clientToUpdate, phoneNumber: e.target.value })} />
                    </Col>
                </Row>

                <Row>
                    <Col xl={12}>
                        <button className="btnUpdateClient"
                            onClick={update}>
                            Atualizar
                        </button>
                    </Col>
                </Row>

                <Row>
                    <ClientStatusComponent
                        id={Number(id)}
                        isActive={isActive}
                        xl={12}
                        style={{ width: "100%", marginTop: "1em" }}
                        setErrorMessage={setErrorMessage}
                        setSuccessMessage={setSuccessMessage} />
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