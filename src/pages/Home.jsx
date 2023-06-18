import React, { useState } from "react"
import BetSlip from "./../components/BetSlip"
import Offers from "./../components/Offers"
import "./../styles/offers.css"
import "./../styles/betSlip.css"
import "./../styles/home.css"

export default function Home({ userData, handleLoginResponse }) {
  const [betSlip, setBetSlip] = useState([])

  const addToBetSlip = (offer, id, coefficient, type) => {
    const offerIndex = betSlip.findIndex((item) => item.game === offer.game)
    if (offerIndex !== -1) {
      const updatedBetSlip = [...betSlip]
      updatedBetSlip[offerIndex] = { ...offer, id, coefficient, type }
      setBetSlip(updatedBetSlip)
    } else {
      const newBetSlipItem = { ...offer, id, coefficient, type }
      setBetSlip((prevBetSlip) => [...prevBetSlip, newBetSlipItem])
    }
  }

  return (
    <div className="grid-home">
      <div className="grid-offers">
        <Offers addToBetSlip={addToBetSlip} />
      </div>
      <div className="grid-betSlip">
        <BetSlip 
          userData={userData} 
          betSlip={betSlip} 
          setBetSlip={setBetSlip} 
          handleLoginResponse={handleLoginResponse} />
      </div>
    </div>
  )
}
