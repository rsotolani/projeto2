import { Navbar, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar( {showList, setShowList}) {

  //const navigate = useNavigate();

  return (
    <Navbar bg="light" variant="light">
        <Container>
            <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand as="div">
                <i>localiza</i><strong>TI</strong>
            </Navbar.Brand>
            </Link>

            {/* <Button onClick={(e) => {
              e.preventDefault();
                setShowList(!showList);
                navigate("/");
                }}>
              <Navbar.Brand>Listar</Navbar.Brand>
            </Button> */}
            
        </Container>
      </Navbar>
  );
}

export default NavBar;