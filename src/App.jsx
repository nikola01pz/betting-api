import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AddFunds from "./pages/AddFunds"

export default function App(){
  const [userData, setUserData] = useState(null)
  const handleLoginResponse = (data) => {
    setUserData(data)
  }

  return (
    <>
      <Navbar handleLoginResponse={handleLoginResponse} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home userData={userData} handleLoginResponse={handleLoginResponse} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-funds" element={<AddFunds />} />
        </Routes>
      </div>
    </>
  )
}