import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './components/Layout';
import Routes from './Routes';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
};

export default App;
