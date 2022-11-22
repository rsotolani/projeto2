import {Link} from "react-router-dom";

function HeaderLocalizaTI() {
    return ( 
        <div>
            <h3><i>localiza</i>TI</h3>
            <div className="home alink">
                <Link to="/">Home</Link>
            </div>

            <div className="listar alink">
                <Link to="/items">Listar itens</Link>
            </div>
        </div>
     );
}

export default HeaderLocalizaTI;