import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Container, Card, Row, Col, Button } from "react-bootstrap";


function DetalhesPage() {
  const {idItem} = useParams();
  const [notebook, setNotebook] = useState([]);
  const [showHistorico, setShowHistorico] = useState(false);
  const navigate = useNavigate(); 


  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(
        `https://ironrest.cyclic.app/localizaTI/${idItem}`
      );
      setNotebook(response.data);
      console.log(response.data)
    }
    fetchUser();
  }, []);

  async function handleDelete(e) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/localizaTI/${idItem}`);
      navigate("/");
      toast.success("Item deletado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado ao deletar esse Item");
    }
  }

  return (
    <Container>
        <Card className="text-center" bg="light">
            <Card.Header>
                <Card.Title>Número de Acervo: {notebook.acervo}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                  <Col>
                    <Card.Title>Tipo de equipamento</Card.Title>
                    <Card.Text>{notebook.tipo_equipamento}</Card.Text>
                    <Card.Title>Modelo</Card.Title>
                    <Card.Text>{notebook.modelo}</Card.Text>
                  </Col>
                  <Col>
                   <Card.Title>Status</Card.Title>
                    <Card.Text>{notebook.status}</Card.Text>
                    <Card.Title>Garantia</Card.Title>
                    <Card.Text>{notebook.garantia}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <hr />
                  <p>
                  <Button variant="outline-secondary" onClick={() => setShowHistorico(true)}>
                    Exibir Histórico de Localizações
                  </Button></p>
                  {showHistorico === true && 
                  (notebook.localizacao.map((notebookHistotico,noteIndex) => {
                    return (
                        <div key={noteIndex} >
                            <Row className="text-left">
                              <Col>
                                <strong>Local</strong>: {notebookHistotico.local}
                              </Col>
                              <Col>
                                Data de Entrega: {notebookHistotico.data_entrega}
                              </Col>
                            </Row>
                            <Row className="text-left">
                              <Col>
                                <strong>Usuário Responsável</strong>: {notebookHistotico.usuario}
                              </Col>
                              <Col>
                                Data de Devolução: {notebookHistotico.data_devolucao}
                              </Col>
                            </Row>
                        </div> 
                    )}
                  ))}
                </Row>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Row>
                  <Col>
                    <Link to={`/items`}>
                      <Button
                        variant="outline-secondary">
                        Voltar
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button variant="success" >
                        Atualizar localização
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="outline-danger" onClick={handleDelete}>
                        Excluir Registro
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
    </Container>
  );
}

export default DetalhesPage;