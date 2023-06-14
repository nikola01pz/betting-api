import React from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Login from "./Login"
import "./../styles/navbar.css"

export default function Navbar(){
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        BetIt
      </Link>
      <ul>
        <Login/>
        <CustomLink to="/">Live bets</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch( {path: resolvedPath.pathname, end:true})
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}