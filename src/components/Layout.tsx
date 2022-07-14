import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="lg:px-12 mt-4">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
