import React from 'react';
import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';

const Home = () => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, [])
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;