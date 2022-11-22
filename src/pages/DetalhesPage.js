import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {Button} from "react-bootstrap";
import toast from "react-hot-toast";


function DetalhesPage() {
  const {idItem} = useParams();
  const [notebook, setNotebook] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
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
    <div>
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
            <div>
            <Button variant="outline-danger" onClick={handleDelete}>
                Excluir Registro
            </Button>
            <Button variant="outline-danger"onClick={() => setShowEdit(true)}>
                Exibir Histórico
            </Button>
            {showEdit === true && (
                notebook.localizacao.map((notebook_l,noteIndex) => {
                    return (
                        <div  key={noteIndex} >
                            <div>
                                <p>
                                    Local: {notebook_l.local}
                                </p>
                                <p>
                                    Usuário Responsável: {notebook_l.usuario}
                                </p>
                                <p>
                                    Data de Entrega: {notebook_l.data_entrega}
                                </p>
                                <p>
                                    Data de Devolução: {notebook_l.data_devolucao}
                                </p>
                                <hr></hr>
                            </div>
                        </div>          
                    );
                })
            )}
             </div>
            
        </div>
    </div>
  );
}

export default DetalhesPage;