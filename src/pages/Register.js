import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [birth_date, setBirthdate] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault();
    try{
      const formattedBirthdate = birth_date.split("-").reverse().join("-");
      console.log(JSON.stringify({ email, username, password, first_name, last_name, birth_date: formattedBirthdate}))
      const response = await axios.post('http://localhost:5000/register',{
        email, username, password, first_name, last_name, birth_date: formattedBirthdate
      });
      setMessage('Successful register! Please login into your account.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      console.log(response);
    }catch(error){
      console.error(error);
      console.log(error.response);
      setMessage('Unsuccessfull register! Please try again.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }

  return (
    <div>
      <div className="reg-rules">
        <div>Email adress must be valid and not used yet</div>
        <div>Username must be unique and contain atleast 3 letters, no numbers or special signs allowed</div>
        <div>Password must contain atleast 8 symbols including upper letter, number and special sign</div>
        <div>First and last name can only contain letters</div>
        <div>You must be atleast 18 years old to register</div>
      </div>

      <form className="register-form" onSubmit={handleRegister}>
        <label >
          Email:
          <input type="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <br />
        <label >
          Username:
          <input type="text" name="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <br />
        <label>
          First Name:
          <input type="text" name="first_name" placeholder="Enter first name" value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" placeholder="Enter last name" value={last_name} onChange={(e) => setLastName(e.target.value)}/>
        </label>
        <br />
        <label>
          Birthdate:
          <input type="date" name="birth_date" placeholder="Enter birthdate" value={birth_date} onChange={(e) => setBirthdate(e.target.value)}/>
        </label>
        <br />
        <input className="reg-button" type="submit" value="Register" />
        {message && <div className="submit-message">{message}</div>}
      </form>
    </div>

  );

}