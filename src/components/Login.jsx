import React, { useState } from "react"
import axios from "axios"
import "./../styles/login.css"

export default function Login() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/login",{
        user, 
        password,
      })
      setMessage("successful")
      setTimeout(() => {
        setMessage("")
      }, 3000)
      console.log(response)
    } catch(error) {
      console.error(error)
      setMessage("failed");
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  return (
    <>
    <form className="login-form" onSubmit={handleLogin}>
      <label>
        <input className="login-input" type="text" name="username" placeholder="username or email" value={user} 
          onChange={(e) => setUser(e.target.value)}/>
        <input  className="login-input" type="password" name="password" placeholder="password" value={password} 
          onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <input className="log-button" type="submit" value="Login" />
      {message && <div className="submit-message">{message}</div>}
    </form>
    </>
  )
}