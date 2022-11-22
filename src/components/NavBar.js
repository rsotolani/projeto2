import { Navbar, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="light" variant="light">
        <Container>
            <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand as="div">
                <i>localiza</i><strong>TI</strong>
            </Navbar.Brand>
            </Link>
            <Link to="/items" style={{ textDecoration: "none" }}>
                <Navbar.Brand>Listar</Navbar.Brand>
            </Link>
        </Container>
      </Navbar>
  );
}

export default NavBar;