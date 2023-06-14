import React from "react"
import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import AddFunds from "./pages/AddFunds"

export default function App(){
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-funds" element={<AddFunds />} />
        </Routes>
      </div>
    </>
  )
}