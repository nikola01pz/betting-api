import React from 'react';
import './Register.css'


export default function Register() {
  return (
    <form className="register-form">
      <label >
        Email:
        <input type="email" name="email" placeholder="Enter email" />
      </label>
      <br />
      <label >
        Username:
        <input type="text" name="username" placeholder="Enter username" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" placeholder="Enter password" />
      </label>
      <br />
      <label>
        First Name:
        <input type="text" name="first_name" placeholder="Enter first name" />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="last_name" placeholder="Enter last name" />
      </label>
      <br />
      <label>
        Birthdate:
        <input type="date" name="birth_date" placeholder="Enter birthdate" />
      </label>
      <br />
      <input className="reg-button" type="submit" value="Register" />
    </form>
  );

}