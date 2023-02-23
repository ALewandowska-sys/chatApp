import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PagesUserHome from './pages/user-home/PagesUserHome';
import Header from './components/header/Header';
import Register from './auth/register/Register';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/myhome" element={<PagesUserHome />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
