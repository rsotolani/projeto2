import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Container, Card, Col, Row, Button} from "react-bootstrap"
import axios from "axios";
import "../App.css";

function ListagemPage({reload, setReload, search=""}) {
  const [notebooks, setNotebooks] = useState([]);


  useEffect(() => {
    async function fetchNotebooks() {
      const response = await axios.get(
        "https://ironrest.cyclic.app/localizaTI"
      );
      setNotebooks(response.data);
    }

    fetchNotebooks();
  }, [reload]);


  console.log(notebooks);
  console.log("search=",search);

  return (
    <div>
      <Container>
      {notebooks
        .filter( (notebook) => notebook.modelo.toLowerCase().includes(search.toLowerCase()) ||
                               notebook.acervo.toLowerCase().includes(search.toLowerCase()))
        .map((notebook) => {
        return (
            <Card className="text-center" bg="light" key={notebook._id} >
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
                  <p>Localização</p>
                  { (notebook.localizacao.length > 0) && 
                    (notebook.localizacao.map((notebookHistotico,noteIndex) => {
                      return (
                        <div key={noteIndex} >
                            <div>
                                <p>
                                  <strong>Local</strong>: {notebookHistotico.local} |
                                  <strong>Usuário Responsável</strong>: {notebookHistotico.usuario}
                                </p>
                                <p>
                                  Data de Entrega: {notebookHistotico.data_entrega} |
                                  Data de Devolução: {notebookHistotico.data_devolucao}
                                </p>
                            </div>
                        </div>          
                      );
                  }))}
                </Row>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Row>
                  <Col>
                    <Link to={`/item/${notebook._id}`}>
                      <Button
                        variant="outline-secondary">
                        Ver detalhes
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
        )}
      )}
      </Container>
    </div>
  );
}

export default ListagemPage