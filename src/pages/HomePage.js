//import {Link} from "react-router-dom";
import { useState } from "react";

import CadastroPage from "./CadastroPage";
import ListagemPage from "./ListagemPage";

import { Container, FloatingLabel, Form, Col} from "react-bootstrap"


function HomePage() {
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const handleCloseSearch = () => setShowSearch(false);
    const handleShowSearch = () => setShowSearch(true);

    const [reload, setReload] = useState(false);

    function handleSearch(e) {
        setSearch(e.target.value);
        (e.target.value.length > 0) ? handleShowSearch() : handleCloseSearch();
    }

    return ( 
        <div><Container>
            
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

            <div className="new alink">
                {/* <Link to="/new-item">Novo item</Link>*/}
                <CadastroPage reload={reload} setReload={setReload} />
            </div>

            <Col>
                {(showSearch) && ( <ListagemPage reload={reload} setReload={setReload} search={search}/> )}
            </Col>

        </Container></div>
     );
}

export default HomePage;

