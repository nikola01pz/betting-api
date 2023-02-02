import React from 'react';

export default function Login() {
  return (
    <form className="login-form">
      <label>
        User:
        <input type="text" name="username" placeholder="Enter username or email" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" placeholder="Enter password" />
      </label>
      <br />
      <input className="log-button" type="submit" value="Login" />
    </form>
  );

}