import React from 'react';
import Orders from '../../components/user/MyOrder/Orders';
import NavBar from '../../components/user/NavBar/NavBar';
import './myorder.css'; // We'll create this CSS file
import Footer from '../../components/user/Footer/Footer'

function Myorders() {
  return (
    <div className="myorders-page">
      <NavBar />
      <div className="myorders-content">
        <Orders />
      </div>
       <Footer/>
    </div>
  );
}

export default Myorders;