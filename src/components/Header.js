import { Link } from 'react-router-dom';
import { Navbar, Container, NavbarBrand } from 'reactstrap';

const Header = () => {
  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand href="/">Cookbook</NavbarBrand>
        <Link to="/prilohy" className="btn btn-primary">
          Přílohy
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
