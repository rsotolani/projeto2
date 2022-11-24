import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Container, Card, Row, Col, Button, Table } from "react-bootstrap";
import EmprestaItem from "../components/EmprestaItem";


function DetalhesPage() {
  const {idItem} = useParams();
  const [item, setItem] = useState();
  const [showHistorico, setShowHistorico] = useState(false);
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(true);


  // function ultimoLocal(locais){
  //   if (locais.length <= 0) return false;
  //   let local = (locais[locais.length - 1]);
  //   return local;
  // }

  useEffect(() => {
    async function fetchItem() {
      const response = await axios.get(
        `https://ironrest.cyclic.app/localizaTI/${idItem}`
      );
      setItem(response.data);
      setIsLoading(false);
      //console.log(response.data);
    }
    fetchItem();
  }, [idItem]);

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

  //console.log("isloading=",isLoading);
  console.log(item);

  return (
    <Container>
      { !isLoading && (
        <Card className="text-center" bg="light">
            <Card.Header>
                <Card.Title>Número de Acervo: {item.acervo}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table bordered hover variant="light-dark" className="mt-2">
                <thead>
                  <tr>
                    <th>Tipo de equipamento</th>
                    <th>Modelo</th>
                    <th>Garantia</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.tipo_equipamento}</td>
                    <td>{item.modelo}</td>
                    <td>{item.garantia}</td>
                    <td>{item.status}</td>
                  </tr>
                </tbody>
              </Table>
              <Row>
                <hr />
                <p>
                  <Button variant="outline-secondary" onClick={() => setShowHistorico(true)}>
                    Exibir Histórico
                  </Button>
                </p>
                {showHistorico === true && item.localizacao.length > 0 && (
                  <Table bordered hover variant="light-dark" className="mt-2">
                      <thead>
                        <tr>
                          <th>Data de entrega</th>
                          <th>Local</th>
                          <th>Usuário Responsável</th>
                          <th>Data de devolução</th>
                        </tr>
                      </thead>
                      <tbody>
                      { (item.localizacao.map((local,localIndex) => {
                        return (
                          <tr key={localIndex}>
                          <td>{local.data_entrega}</td>
                          <td>{local.local}</td>
                          <td>{local.usuario}</td>
                          <td>{local.data_devolucao}</td>
                        </tr>
                        )}))
                      } 
                      </tbody>
                    </Table>
                  )}   
                </Row>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Row>
                  <Col>
                    <Link to={`/`}>
                      <Button
                        variant="outline-secondary">
                        Voltar
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to={`/item/editar/${idItem}`}>
                        <Button variant="success" >
                            Editar este item
                        </Button>
                    </Link>
                  </Col>
                  <Col>
                    <EmprestaItem item={item}/>
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={handleDelete}>
                        Excluir Registro
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
      )}
        
    </Container>
  );
}

export default DetalhesPage;