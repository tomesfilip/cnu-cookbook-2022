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
      <div className="container mx-auto px-4 mt-4">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
