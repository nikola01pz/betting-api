import React, { useState } from "react"
import BetSlip from "./../components/BetSlip"
import Offers from "./../components/Offers"
import "./../styles/offers.css"
import "./../styles/betSlip.css"
import "./../styles/home.css"

export default function Home() {
  const [betSlip, setBetSlip] = useState([])
  const [stake, setStake] = useState(0.25)

  const addToBetSlip = (offer, coefficient, type) => {
    const offerIndex = betSlip.findIndex((item) => item.game === offer.game)
    if (offerIndex !== -1) {
      const updatedBetSlip = [...betSlip]
      updatedBetSlip[offerIndex] = { ...offer, coefficient, type }
      setBetSlip(updatedBetSlip)
    } else {
      const newBetSlipItem = { ...offer, coefficient, type }
      setBetSlip((prevBetSlip) => [...prevBetSlip, newBetSlipItem])
    }
  };

  return (
    <div className="grid-home">
      <div className="grid-offers">
        <Offers addToBetSlip={addToBetSlip} />
      </div>
      <div className="grid-betSlip">
        <BetSlip
          betSlip={betSlip}
          setBetSlip={setBetSlip}
          stake={stake}
          setStake={setStake}
        />
      </div>
    </div>
  )
}
