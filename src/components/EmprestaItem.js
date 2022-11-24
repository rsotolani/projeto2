import { Button, Modal, Row, Form } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
//import axios from "axios";

function EmprestaItem(item) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    local: "",
    usuario: "",
    data_entrega: "",
    data_devolucao: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("item=",item)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      toast.success("Emprestimo realizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  return ( 
    <div>
      <Button variant="outline-success" onClick={handleShow}>
        Emprestar item
      </Button>
      <Modal show={show} onHide={handleClose} size="l">
        <Modal.Header>
          <Modal.Title>Emprestar o item acervo n. {item.item.acervo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <i>{item.item.tipo_equipamento} - {item.item.modelo}</i>
          <hr />
          <Form>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Local:</Form.Label>
                <Form.Control
                  type="text"
                  palceholder="Localidade "
                  name="local"
                  value={form.local}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Responsável:</Form.Label>
                <Form.Control
                  type="text"
                  palceholder="Nome do responsável "
                  name="usuario"
                  value={form.usuario}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Data do empréstimo:</Form.Label>
                <Form.Control
                  type="date"
                  name="data_entrega"
                  value={form.data_entrega}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data da devolução:</Form.Label>
                <Form.Control
                  type="date"
                  name="data_devolucao"
                  value={form.data_devolucao}
                  onChange={handleChange}
                />
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
    </div>
 
  );
}

export default EmprestaItem;