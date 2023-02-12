import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PagesUserHome from './pages/user-home/PagesUserHome';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
    <>
      <Header />
      <Routes>
        <Route path="/myhome" element={<PagesUserHome />} />
      </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;
