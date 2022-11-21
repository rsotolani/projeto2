import { useState, useEffect } from "react";
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
                    <p>
                        Local: {notebook.localizacao[0].local}
                    </p>
                    <p>
                        Usuário Responsável: {notebook.localizacao[0].usuario}
                    </p>
                    <p>
                        Data de Entrega: {notebook.localizacao[0].data_entrega}
                    </p>
                    <p>
                        Data de Devolução: {notebook.localizacao[0].data_devolucao}
                    </p>
                    <hr></hr>
                </div>
            </div>          
        );
      })}
    </div>
  );
}

export default ListagemPage