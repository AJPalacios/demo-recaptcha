import React from "react";
import "./style.css";

const App = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let _token = document.getElementById("token");
    window.grecaptcha.ready(function() {
      window.grecaptcha.execute(`${process.env.REACT_APP_RECAPTCHA}`, {action: 'submit'}).then((token) => {
        _token.value = `${token}`;
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