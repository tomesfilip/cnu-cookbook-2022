import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './components/shared/Layout';
import Routes from './Routes';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes />
        <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
      </Layout>
    </Router>
  );
};

export default App;
