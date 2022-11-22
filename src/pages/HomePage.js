import {Link} from "react-router-dom";
import { useState } from "react";
import CadastroPage from "./CadastroPage";
import { Container, Button, FloatingLabel, Form} from "react-bootstrap"


function HomePage() {
    const [search, setSearch] = useState("");

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    return ( 
        <div><Container>
            <h1><i>localiza</i>TI</h1>
            <FloatingLabel
                controlId="floatingInput"
                label="Pesquise por acervo / modelo"
                className="my-3">
                <Form.Control
                    type="text"
                    placeholder="pesquise"
                    value={search}
                    onChange={handleSearch}
                    autoFocus
                />
            </FloatingLabel>

            <div className="home alink">
                <Link to="/">Home</Link>
            </div>

            <div className="listar alink">
                <Link to="/items">Listar itens</Link>
            </div>

            <div className="new alink">
                {/* <Link to="/new-item">Novo item</Link>*/}
                <CadastroPage />
            </div>

        </Container></div>
     );
}

export default HomePage;

