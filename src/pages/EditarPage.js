import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Spinner,
  Badge,
  Offcanvas,
  ListGroup,
} from "react-bootstrap";





function EditarPage() {
    const { idItem } = useParams()
//const [item, setItem] = useState({}); //informações do user que veio da minha API
const [showEdit, setShowEdit] = useState(false); //controlar a visualização form // true -> form aparece
const [form, setForm] = useState({
    acervo: "",
    tipo_equipamento: "",
    modelo: "",
    status: "",
    garantia: "",
    localizacao: [],
});

//const stack = ["React", "JS", "HTML", "CSS", "NodeJS", "MongoDB", "Express"];

  //const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  //const [showTasks, setShowTasks] = useState(false);

  function handleChange(e) {
    if (e.target.name === "active") {
      setForm({ ...form, active: e.target.checked });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //clonando o form para que possamos fazer as alterações necessárias
      const clone = { ...form };
      delete clone._id;

      await axios.put(`https://ironrest.cyclic.app/localizaTI/${idItem}`, clone);

      toast.success("Alterações salvas");
      setReload(!reload);
      setShowEdit(false);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }
    return ( 
        <div>
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Acervo</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Insira o acervo do item"
                          name="acervo"
                          value={form.acervo}
                          onChange={handleChange}
                          autoFocus
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Tipo de Equipamento</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Insira tipo de equipamento"
                          name="tipo_equipamento"
                          value={form.tipo_equipamento}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Insira o modelo do Equipamento"
                          name="modelo"
                          value={form.modelo}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          type="S"
                          placeholder="Insira o email do funcionário"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Salário</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Insira o valor do salário R$"
                          name="salario"
                          value={form.salario}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Select
                          name="departamento"
                          onChange={handleChange}
                          defaultValue={form.departamento}
                        >
                          <option>Selecione uma opção</option>
                          <option value="Front-End">Front-End</option>
                          <option value="Back-End">Back-End</option>
                          <option value="Mobile">Mobile</option>
                          <option value="Financeiro">Financeiro</option>
                          <option value="Marketing">Marketing</option>
                          <option value="People">People</option>
                          <option value="Full-Stack">Full-Stack</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Data de Admissão</Form.Label>
                        <Form.Control
                          type="date"
                          name="dataAdmissao"
                          value={form.dataAdmissao}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Adicione sua foto</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Insira a url da sua foto de perfil"
                          name="foto"
                          value={form.foto}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Row>
                  <Col>
                    <Button
                      variant="outline-danger"
                      onClick={() => setShowEdit(false)}
                    >
                      Voltar
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-success" onClick={handleSubmit}>
                      Salvar Alterações
                    </Button>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        label="Funcionário ativo na empresa"
                        name="active"
                        checked={form.active}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
            
        </div>
     );
}

export default EditarPage;