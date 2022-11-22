import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "../App.css";

function ListagemPage() {
  const [notebooks, setNotebooks] = useState([]);


  useEffect(() => {
    async function fetchNotebooks() {
      const response = await axios.get(
        "https://ironrest.cyclic.app/localizaTI"
      );
      setNotebooks(response.data);
    }

    fetchNotebooks();
  }, []);


  console.log(notebooks);

  return (
    <div>
      {notebooks.map((notebook) => {
        return (
            <div  key={notebook._id} >
              <Link to={`/item/${notebook._id}`}>
                <div>
                    <p>
                        Acervo: {notebook.acervo}
                    </p>
                    <p>
                        Tipo: {notebook.tipo_equipamento}
                    </p>
                    <p>
                        Modelo: {notebook.modelo}
                    </p>
                    <p>
                        Status: {notebook.status}
                    </p>
                    <p>
                        Garantia: {notebook.garantia}
                    </p>
                    <p>
                        Localização
                    </p>
                    {notebook.localizacao.length > 0 && (
                    notebook.localizacao.map((notebookHistotico,noteIndex) => {
                    return (
                        <div  key={noteIndex} >
                            <div>
                                <p>
                                    Local: {notebookHistotico.local}
                                </p>
                                <p>
                                    Usuário Responsável: {notebookHistotico.usuario}
                                </p>
                                <p>
                                    Data de Entrega: {notebookHistotico.data_entrega}
                                </p>
                                <p>
                                    Data de Devolução: {notebookHistotico.data_devolucao}
                                </p>
                                <hr></hr>
                            </div>
                        </div>          
                    );
                  })
                  )}
                    <hr></hr>
                </div>
                </Link>
            </div>          
        );
      })}
    </div>
  );
}

export default ListagemPage