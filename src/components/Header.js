import { Navbar, Container, NavbarBrand } from 'reactstrap';

const Header = () => {
  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand href="/">Cookbook</NavbarBrand>
      </Container>
    </Navbar>
  );
};

export default Header;
