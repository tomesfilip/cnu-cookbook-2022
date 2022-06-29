import { Container } from 'reactstrap';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className="mt-4">{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
