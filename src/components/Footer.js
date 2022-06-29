import { Container } from 'reactstrap';

const Footer = () => {
  return (
    <Container as="footer">
      <hr />
      <p>&copy; {new Date().getFullYear()} &middot; CN Group CZ a.s.</p>
    </Container>
  );
};

export default Footer;
