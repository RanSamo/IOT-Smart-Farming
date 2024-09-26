import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Adjust the path if needed
import Overview from './Pages/Overview/Overview'; // Adjust the path if needed
import Insights from './Pages/Insights/Insights'; // Ensure you have an Insights component

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Layout>
    </Router>
  );
};
export default App;
