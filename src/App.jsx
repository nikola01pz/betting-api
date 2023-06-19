import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"
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
    <div>
      <RecoilRoot>
        <Navbar handleLoginResponse={handleLoginResponse} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home userData={userData} handleLoginResponse={handleLoginResponse} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-funds" element={<AddFunds userData={userData}/>} />
          </Routes>
        </div>
      </RecoilRoot>
    </div>
  )
}