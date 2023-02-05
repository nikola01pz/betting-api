import React, { useState } from "react"
import axios from "axios"

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
      setMessage("Successful login")
      setTimeout(() => {
        setMessage("")
      }, 3000)
      console.log(response)
    } catch(error) {
      console.error(error)
      setMessage("Wrong user or password");
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }

  return (
    <>
    <form className="login-form" onSubmit={handleLogin}>
      <label>
        User:
        <input type="text" name="username" placeholder="Enter username or email" value={user} 
          onChange={(e) => setUser(e.target.value)}/>
      </label>
      <label>
        Password:
        <input type="password" name="password" placeholder="Enter password" value={password} 
          onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <input className="log-button" type="submit" value="Login" />
      {message && <div className="submit-message">{message}</div>}
    </form>
    </>
  )
}