import React from "react"
import BetSlip from "./../components/BetSlip"
import Offers from "./../components/Offers"
import "./../styles/tables.css"
import "./../styles/bet-slip.css"
import "./../styles/home.css"

export default function Home() {

  return (
    <div className="grid-home">
      <div className="grid-offers">
        <Offers/>
      </div>
      <div className="grid-betSlip">
        <BetSlip/>
      </div>
    </div>
  )
}
