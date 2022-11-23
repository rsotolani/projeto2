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



function EditarPagebkp() {
    const { idItem } = useParams()
    const [showEdit, setShowEdit] = useState(false); 
    const [form, setForm] = useState({
        acervo: "",
        tipo_equipamento: "",
        modelo: "",
        status: "",
        garantia: "",
        localizacao: [
            {
                local:"",
                usuario:"",
                data_entrega:"",
                data_devolucao:""
            }
        ],
       
    });

    const [reload, setReload] = useState(false);
    const [notebooks, setNotebooks] = useState([]);
    const [showHistorico, setShowHistorico] = useState(false);
    const navigate = useNavigate(); 


  useEffect(() => {
    async function fetchNotebooks() {
      const response = await axios.get(
        `https://ironrest.cyclic.app/localizaTI/${idItem}`
      );
      setNotebooks(response.data);
    }

    fetchNotebooks();
  }, []);

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
      const clone = { ...form };
      delete clone._id;

      await axios.put(`https://ironrest.cyclic.app/localizaTI/${idItem}`, clone);

      toast.success("Alterações salvas");
      setReload(!reload);
      setShowEdit(false);
      navigate(`/item/${notebooks._id}`);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  async function handleDeleteTask(index) {
    try {
      const clone = { ...notebooks };
      delete clone._id;

      clone.localizacao.splice(index, 1);

      await axios.put(`https://ironrest.cyclic.app/localizaTI/${idItem}`, clone);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Task não foi excluída");
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
                          placeholder={notebooks.acervo}
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
                          placeholder={notebooks.tipo}
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
                          placeholder={notebooks.modelo}
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
                          type="text"
                          placeholder={notebooks.status}
                          name="status"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Garantia</Form.Label>
                        <Form.Select
                          name="garantia"
                          onChange={handleChange}
                          defaultValue={form.garantia}
                        >
                          <option>Selecione uma opção</option>
                          <option value="true">Sim</option>
                          <option value="False">Não</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <Button variant="outline-danger"onClick={() => setShowHistorico(true)}>
                      Exibir Histórico
                    </Button>
                    
                    {showHistorico === true && (
                    
                        <ListGroup>
                            {notebooks.localizacao.map((notebook, index) => {
                            return (
                                <div  key={index} >
                                    <ListGroup.Item>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteTask(index)}
                                        >
                                            Apagar Registro
                                        </Button>{" "}
                                        <div>
                                            Local: {notebook.local}<br></br>
                                            Usuário Responsável: {notebook.usuario}<br></br>
                                            Data de Entrega: {notebook.data_entrega}<br></br>
                                            Data Devolução: {notebook.data_devolucao}
                                        </div>
                                    </ListGroup.Item>
                            </div>
                            );
                        })
                        .reverse()}
                        </ListGroup>
                    )}   
                    
                   
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
                  
                </Row>
                
              </Card.Footer>
            </Card>
            
        </div>
     );
}

export default EditarPagebkp;