import React, { useState } from "react"
import axios from "axios"

export default function BetSlip( {userData, betSlip, setBetSlip}) {
  const [stake, setStake] = useState(0.25)
  const [loginMessage, setLoginMessage] = useState("")
  const [betMessage, setBetMessage] = useState("")

  function calculateTotalCoefficient(betSlip) {
    const totalCoefficient = betSlip.reduce(
      (total, offer) => total*offer.coefficient, 1)
    return totalCoefficient.toFixed(2)
  }

  function handleClearAll() {
    setBetSlip([])
  }

  function handleDeleteGame(index) {
    const updatedBetSlip = [...betSlip]
    updatedBetSlip.splice(index, 1)
    setBetSlip(updatedBetSlip)
  }

  const totalCoefficient = calculateTotalCoefficient(betSlip)
  const returns = (stake*totalCoefficient).toFixed(2)
  const payout = (returns*0.85).toFixed(2)
  const tax = (returns*0.15).toFixed(2)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!userData || !userData.username) {
      setLoginMessage("Please login to bet.")
      setTimeout(() => {
        setLoginMessage("")
      }, 2000)
      return
    }

    const newBetSlip = {
      username: userData?.username,
      stake,
      bets: betSlip.map((offer) => ({
        offer: offer.id,
        tip: offer.type,
      }))
    }
  
    try {
      const response = await axios.post("http://localhost:5000/bet_slip", newBetSlip)
      console.log("Request successful:", response)
      setBetMessage("Bet has been placed!")
      setTimeout(() => {
        setBetMessage("")
      }, 2000)
    } catch (error) {
      if (stake < 0.25) {
        setBetMessage("Minimal stake is 0.25€")
      } 
      if (payout > 10000) {
        setBetMessage("Maximal payout is 10000€")
      }
      if(stake > userData.balance) {
        setBetMessage("Insufficient funds")
      }
      setTimeout(() => {
        setBetMessage("")
      }, 2000)
    }
  };
  
  return (
    <>
      <table className="table-betSlip">
        <thead>
          <tr>
            <th className="betSlip-title" colSpan="2">My bet slip</th>
            <th className="betSlip-clearAll" colSpan="2" onClick={handleClearAll}>Delete All</th>
          </tr>
          <tr>  
            <th className="betSlip-game" colSpan="2">Game</th>
            <th>Tip</th>
            <th>Coef</th>
          </tr>
        </thead>

        <tbody>
          {betSlip.map((offer, index) => (
            <tr key={index}>
              <td className="td-deleteGame"> 
                <button className="button-deleteGame" onClick={() => handleDeleteGame(index)}>x</button>
              </td>
              <td className="betSlip-offerName">{offer.game}</td>
              <td>{offer.type}</td>
              <td>{offer.coefficient}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="betSlip-totalCount">
        Total coefficient: {betSlip.length ? totalCoefficient : "-"}
        <br />
        Total returns: {betSlip.length ? `${returns}€` : "-"}
        <br/>
        15% Tax: {betSlip.length ? `${tax}€` : "-"}
        <div className="betSlip-payout">
        Payout: {betSlip.length ? `${payout}€` : "-"}
        </div>
      </div>
      <input className="stake-input" 
        placeholder="Minimal stake is 0.25€" 
        maxLength="6" value={stake} 
        onChange={(e) => setStake(parseFloat(e.target.value))} />
      <input className="payment-button" 
        type="submit" 
        value="Bet" 
        onClick={handleSubmit}/>
      <div className="betSlip-messages">
        {loginMessage && <div>{loginMessage}</div>}
        {betMessage && <div>{betMessage}</div>}
      </div>

    </>
  )
}