import React from 'react';
import { Link } from "react-router-dom";
import { CiCircleQuestion } from "react-icons/ci";
import "../../css/animate404.css"

const Error404 = ({ history }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Abarca toda la altura visible del viewport
    backgroundColor: '#95c2de',
  };

  const mainboxStyle = {
    backgroundColor: '#95c2de',
    height: '600px',
    width: '600px',
    position: 'relative'
  };

  const errStyle = {
    color: '#ffffff',
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '11rem',
    position: 'absolute',
    left: '20%',
    top: '8%'
  };

  const errorIconStyle = {
    position: 'absolute',
    fontSize: '11rem',
    left: '38%',
    top: '15%',
    color: '#ffffff'
  };

  const err2Style = {
    color: '#ffffff',
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '11rem',
    position: 'absolute',
    left: '68%',
    top: '8%'
  };

  const msgStyle = {
    textAlign: 'center',
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '1.6rem',
    position: 'absolute',
    left: '16%',
    top: '45%',
    width: '75%'
  };

  

  return (
<div style={containerStyle}>
      <div style={mainboxStyle}>
        <div className='conten_404'>
          <div style={errStyle}>4</div>
          {/* Aplica la clase fa-spin al icono */}
          <CiCircleQuestion className="far fa-question-circle fa-spin" style={errorIconStyle}></CiCircleQuestion>
          <div style={err2Style}>4</div>
        </div>
        <div style={msgStyle}>
          Ooops..
          <p>Page not found! Return to <Link to="/welcome"  className="home_link">home</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default Error404;



