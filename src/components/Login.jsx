import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./../styles/login.css"

export default function Login({handleLoginResponse}) {
  const navigate = useNavigate()
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUser, setLoggedUser] = useState({
    balance: 0,
    email: "",
    first_name: "",
    last_name: "",
    username: "",
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/login",{
        user, 
        password,
      })
      const {balance, email, first_name, last_name, username} = response.data
      const loggedUser = {
        balance,
        email,
        first_name,
        last_name,
        username,
      }
      setLoggedUser(loggedUser)
      setIsLoggedIn(true)
      console.log(response)
      handleLoginResponse(loggedUser)
    } catch(error) {
      console.error(error)
      setMessage("failed")
      setTimeout(() => {
        setMessage("")
      }, 2000)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate("/")
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="submit-message">{message}</div>
          <div className="loggedUser-firstname">
            {loggedUser.first_name && (
              <span>Welcome {loggedUser.first_name}!</span>
            )}
          </div>
          <div className="loggedUser-balance">
            {loggedUser.balance && (
              <span>Balance: €{loggedUser.balance}</span>
            )}
            <Link to="/add-funds">
              <button className="add-balance">Deposit</button>
            </Link>
          </div>
          
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <form className="login-form" onSubmit={handleLogin}>
            <label>
              <input className="login-input" 
                type="text" 
                name="username" 
                placeholder="username or email" 
                value={user} 
                onChange={(e) => setUser(e.target.value)}/>
              <input  className="login-input" 
                type="password" 
                name="password" 
                placeholder="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <input className="login-button" type="submit" value="Login" />
            {message && <div className="submit-message">{message}</div>}
          </form>
          <Link to="/register">
              <button className="register-button">Register</button>
          </Link>
        </>
      )}
    </>
  )
}