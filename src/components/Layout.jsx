import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';

import '../css/app.css'
import '../css/global.css'
import '../css/header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.json';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;