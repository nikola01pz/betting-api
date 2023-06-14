import React, { useState } from "react"
import axios from "axios"
import RegistrationRules from "./../components/RegistrationRules"
import "./../styles/register.css"

export default function Register() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [birth_date, setBirthdate] = useState("")
  const [message, setMessage] = useState("")

  const handleRegister = async (event) => {
    event.preventDefault()
    try{
      const formattedBirthdate = birth_date.split("-").reverse().join("-")
      console.log(JSON.stringify({ 
        email, username, password, first_name, last_name, birth_date: formattedBirthdate}))
      const response = await axios.post("http://localhost:5000/register",{
        email, username, password, first_name, last_name, birth_date: formattedBirthdate
      })
      setMessage("Successful register! Please login into your account.")
      setTimeout(() => {
        setMessage("")
      }, 3000)
      console.log(response)
    }catch(error){
      console.error(error)
      console.log(error.response)
      setMessage("Unsuccessful register! Please try again.")
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  return (
    <>
      <RegistrationRules/>

      <form className="register-form" onSubmit={handleRegister}>
        <div className="register-div">
          <label className="register-label">Email:</label>
          <input className="register-input" type="email" name="email" placeholder="Enter email" value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="register-div">
          <label className="register-label">Username:</label>
          <input className="register-input" type="text" name="username" placeholder="Enter username" value={username} 
            onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="register-div">
          <label className="register-label">Password:</label>
          <input className="register-input" type="password" name="password" placeholder="Enter password" value={password} 
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="register-div">
          <label className="register-label">First name:</label>
          <input className="register-input" type="text" name="first_name" placeholder="Enter first name" value={first_name} 
            onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div className="register-div">
          <label className="register-label">Last name:</label>
          <input className="register-input" type="text" name="last_name" placeholder="Enter last name" value={last_name} 
            onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className="register-div">
          <label className="register-label">Birthdate:</label>
          <input className="register-input" type="date" name="birth_date" placeholder="Enter birthdate" value={birth_date} 
            onChange={(e) => setBirthdate(e.target.value)}/>
        </div>
        <input className="button-register" type="submit" value="Register" />
        {message && <div className="submit-message">{message}</div>}
      </form>
    </>
  )
}