import Navbar from 'react-bootstrap/Navbar';
import { Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" sticky="top" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Food Search App</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link as={NavLink} to="/">
            Main
          </Nav.Link>
          <Nav.Link as={NavLink} to="/search">
            Search
          </Nav.Link>
          <Nav.Link as={NavLink} to="/results">
            Results
          </Nav.Link>
          <Nav.Link as={NavLink} to="/pagenotfound">
            PageNotFound
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;