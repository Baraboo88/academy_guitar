import React from 'react';
import Main from '../main/main';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import GuitarCardDetails from '../guitar-card-details/guitar-card-details';
import NotFound from '../not-found/not-found';
import Cart from '../cart/cart';


function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/product/:id/:tab" element={<GuitarCardDetails/>}/>
        <Route path="/product/:id" element={<GuitarCardDetails/>}/>
        <Route path="/cart/" element={<Cart/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
