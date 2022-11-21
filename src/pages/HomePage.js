import {Link} from "react-router-dom";


function HomePage() {
    return ( 
        <div>
            <h1><i>localiza</i>TI</h1>
            <h2>[search box...]</h2>

            <div className="home alink">
                <Link to="/">Home</Link>
            </div>

            <div className="listar alink">
                <Link to="/items">Listar itens</Link>
            </div>

            <div className="random-beer alink">
                <Link to="/new-item">Novo item</Link>
            </div>

        </div>
     );
}

export default HomePage;

