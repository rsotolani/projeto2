import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Container, Card, Col, Row, Button, Table} from "react-bootstrap"
import axios from "axios";
import "../App.css";

function ListagemPage({reload, setReload, search=""}) {
  const [notebooks, setNotebooks] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchItems() {
      const response = await axios.get(
        "https://ironrest.cyclic.app/localizaTI"
      );
      setNotebooks(response.data);
      setItems(response.data);
      setIsLoading(false);
    }

    fetchItems();
  }, [reload]);

  function ultimoLocal(locais){
    if (locais.length <= 0) return false;
    let local = (locais[locais.length - 1]);
    return local;
  }


  return (
    <div>
      <Container>
        <Table bordered hover variant="light-dark" className="mt-2">
          <thead>
            <tr>
              <th>Acervo</th>
              <th>Equipamento</th>
              <th>Modelo</th>
              <th>Local</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && 
              items
              .filter( (item) =>  item.modelo.toLowerCase().includes(search.toLowerCase()) ||
                                  item.acervo.toLowerCase().includes(search.toLowerCase()))
              .map((item) => {
                return (
                    <tr>
                      <td>{item.acervo}</td>
                      <td>{item.tipo_equipamento}</td>
                      <td>{item.modelo}</td>
                      <td>{ultimoLocal(item.localizacao) &&
                        ultimoLocal(item.localizacao).local}</td>
                      <td>
                        <Link to={`/item/${item._id}`}>
                          <Button variant="outline-secondary">
                        Ver detalhes
                      </Button>
                    </Link></td>
                    </tr>
                )}
              )
            }

          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ListagemPage