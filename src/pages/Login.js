import React from 'react';
import './Login.css'


export default function Login() {
  return (
    <form className="login-form">
      <label className="text">
        Username:
        <input type="text" name="username" placeholder="Enter username or email" />
      </label>
      <br />
      <label className="text">
        Password:
        <input type="password" name="password" placeholder="Enter password" />
      </label>
      <br />
      <input className="log-button" type="submit" value="Login" />
    </form>
  );

}