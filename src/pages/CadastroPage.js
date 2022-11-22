import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import HeaderLocalizaTI from "../components/HeaderLocalizaTI";

function CadastroPage({ reload, setReload }) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        acervo: "",
        tipo_equipamento: "",
        modelo: "",
        status: "",
        garantia: false,
        localizacao: []
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("https://ironrest.cyclic.app/localizaTI", form);
            handleClose();
            setForm({
                acervo: "",
                tipo_equipamento: "",
                modelo: "",
                status: "",
                garantia: false,
                localizacao: []
            });
            toast.success("Item de TI cadastrado com sucesso!");
            setReload(!reload);
        } catch (error) {
            console.log(error);
            toast.error("Algo deu errado. Tente novamente.");
        }
    }

    return ( 
        <div>
            
        <Col>
            <Button variant="success" onClick={handleShow}>
                + Criar novo item
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header>
                    <Modal.Title>Adição de novo item de TI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de acervo:</Form.Label>
                                <Form.Control
                                    type="text"
                                    palceholder="Insira o número do acervo do item de TI"
                                    name="acervo"
                                    value={form.acervo}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de item:</Form.Label>
                                <Form.Select
                                    name="tipo_equipamento"
                                    onChange={handleChange}>
                                    <option>Selecione uma opção</option>
                                    <option value="Notebook" selected>Notebook</option>
                                    <option value="Computador">Computador</option>
                                    <option value="Impressora">Impressora</option>
                                    <option value="Celular">Celular</option>
                                    <option value="Outro">Outro</option>
                                </Form.Select>                                
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Modelo do equipamento:</Form.Label>
                                <Form.Control
                                    type="text"
                                    palceholder="Insira a marca e modelo do item de TI"
                                    name="modelo"
                                    value={form.modelo}
                                    onChange={handleChange}                                
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Status do equipamento:</Form.Label>
                                <Form.Select
                                    name="status"
                                    onChange={handleChange}>
                                    <option>Selecione uma opção</option>
                                    <option value="Em operação" selected>Em operação</option>
                                    <option value="Fora de uso">Fora de uso</option>
                                </Form.Select>                                
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Garantia do equipamento:</Form.Label>
                                <Form.Select
                                    name="garantia"
                                    onChange={handleChange}>
                                    <option>Selecione uma opção</option>
                                    <option value="true" selected>Em garantia</option>
                                    <option value="false">Fora de garantia</option>
                                </Form.Select>                                
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Salvar Item
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </Col></div>
     );
}

export default CadastroPage;