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
  ListGroup,
} from "react-bootstrap";


const localizacoes = [];

function EditarPage() {
    const { idItem } = useParams()
    const [showEdit, setShowEdit] = useState(true); 
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
                data_devolucao:"",
            }
        ],  
    });

    const [formLocalizacao, setFormLocalizacao] = useState({
            local:"",
            usuario:"",
            data_entrega:"",
            data_devolucao:""
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
  }, [idItem]);

  function handleChange(e) {
    if (e.target.name === "active") {
      setForm({ ...form, active: e.target.checked });
      return;
    }
    if(e.target.name==="usuario"||e.target.name==="local"||e.target.name==="data_devolucao"||e.target.name==="data_entrega"){
        setFormLocalizacao({ ...formLocalizacao,[e.target.name]: e.target.value });
    } else setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let clone = { ...form };
      //pega o registro de histórico que ja existia na planilha
      let cloneNotebooks = {...notebooks}
      //se houver registro, então adiciona os objetos de localização no array localizações
      if (cloneNotebooks.localizacao.length>0){
        cloneNotebooks.localizacao.map((objetolocalizacao) => {
            return (
                localizacoes.push(objetolocalizacao)
            );})
      }
      //adiciona os itens inseridos via formulario
      localizacoes.push(formLocalizacao);
      //limpa o primeiro registro vazio inserido na inicialização do formulário principal
      const index = clone.localizacao.indexOf(e.target.name);
      clone.localizacao.splice(index, 1);

      //adiciona objeto por objeto do array de localizações no campo de localização
      //do clone que será mandado para a atualização da collection
      localizacoes.map((localizacaoitem) => {
        return (
            clone.localizacao.push(localizacaoitem)
        );})
      
      delete clone._id;
      
      if (!clone.acervo){
        delete clone.acervo;
      }
      if (!clone.tipo_equipamento){
        delete clone.tipo_equipamento;
      }
      if (!clone.modelo){
        delete clone.modelo;
      }
      if (!clone.status){
        delete clone.status;
      }
      if (!clone.garantia){
        delete clone.garantia;
      }

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
        <div>{showEdit && (
          <Container>
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
                        <Form.Label>Tipo de Item</Form.Label>
                        <Form.Select
                          name="tipo_equipamento"
                          onChange={handleChange}
                          defaultValue={form.tipo_equipamento}
                        >
                          <option value="notebook">Notebook</option>
                          <option value="computador">Computador</option>
                          <option value="impressora">Impressora</option>
                          <option value="celular">Celular</option>
                          <option value="outro">Outro</option>
                        </Form.Select>
                        
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
                      <Form.Label>Status do equipamento:</Form.Label>
                        <Form.Select
                            name="status"
                            onChange={handleChange}>
                            <option>Selecione uma opção</option>
                            <option defaultValue="Em operação">Em operação</option>
                            <option value="Fora de uso">Fora de uso</option>
                        </Form.Select>   
                      </Form.Group>
                    </Col>

                    

                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                      <Form.Label>Garantia do equipamento:</Form.Label>
                        <Form.Select
                            name="garantia"
                            onChange={handleChange}>
                            <option>Selecione uma opção</option>
                            <option defaultValue="true">Em garantia</option>
                            <option value="false">Fora de garantia</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  Registro de Empréstimo
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Localização</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Insira a Localização do Equipamento"
                          name="local"
                          value={formLocalizacao.local}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Responsável</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Insira o nome do usuário Responsável"
                          name="usuario"
                          value={formLocalizacao.usuario}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Entrega</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Data de Entrega"
                          name="data_entrega"
                          value={formLocalizacao.data_entrega}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Devolução</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Data da Devolução"
                          name="data_devolucao"
                          value={formLocalizacao.data_devolucao}
                          onChange={handleChange}
                        />
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
        </Container>  
        )}
              
        </div>
     );
}

export default EditarPage;