import React, { useEffect } from "react";
import {
  withGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import "./style.css";

const App = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let _token = document.getElementById("token");
    let _action = document.getElementById("action");
    window.grecaptcha.ready(function() {
      window.grecaptcha.execute(`${process.env.REACT_APP_RECAPTCHA}`, {action: 'submit'}).then((token) => {
        _token.value = `${token}`;
        const data = {
          secret: process.env.REACT_APP_RECAPTCHA_SECRET,
          response: token,
        }
        fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_RECAPTCHA_SECRET}&response=${token}`,{
          method: 'post',
        })
        .then(r => {
          console.log(r)
        })
      });
    });

  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email"/>
        <input id="token" type="hidden"/>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" type="text"/>
        <input type="submit"/>
      </form>
    </div>
  );
}

export default App;