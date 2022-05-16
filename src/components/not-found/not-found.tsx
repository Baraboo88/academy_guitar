import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import {Link} from 'react-router-dom';

function NotFound() {
  return (
    <div >
      <Header/>
      <main style={{display: 'flex', flexDirection:'column', alignItems: 'center', padding: 30}}>
        <h1>404 Not Found</h1>
        <Link to={'/'}>На главную</Link>
      </main>
      <Footer/>
    </div>
  );
}

export default NotFound;
