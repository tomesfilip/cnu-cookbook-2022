import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="lg:px-12 mt-4">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
