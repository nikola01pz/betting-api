import React from "react"

export default function BetSlip( {betSlip, setBetSlip, stake, setStake}) {
  function calculateTotalCoefficient(betSlip) {
    const totalCoefficient = betSlip.reduce(
      (accumulator, offer) => accumulator * offer.coefficient, 1)
    return totalCoefficient.toFixed(2)
  }

  function handleClearAll() {
    setBetSlip([])
  }

  return (
    <>
      <table className="table-betSlip">
        <thead>
          <tr>
            <th className="betSlip-title" >My bet slip</th>
            <th className="betSlip-clearAll" colSpan="2" onClick={handleClearAll}>Clear All</th>
          </tr>
          <tr>  
            <th className="betSlip-game">Game</th>
            <th>Tip</th>
            <th>Coef</th>
          </tr>
        </thead>

        <tbody>
          {betSlip.map((offer, index) => (
            <tr key={index}>
              <td className="betSlip-offer-name">{offer.game}</td>
              <td>{offer.type}</td>
              <td>{offer.coefficient}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="betSlip-total-count">
        Treble: {calculateTotalCoefficient(betSlip)}
        <br/>
        Payout: {(stake*calculateTotalCoefficient(betSlip)*0.85).toFixed(2)}€
        <br/>
        15% Tax: {(stake*calculateTotalCoefficient(betSlip)*0.15).toFixed(2)}€
      </div>
      <input className="stake-input" 
        type="text" 
        placeholder="Minimal stake is 0.25€" 
        maxLength="6" value={stake} 
        onChange={(e) => setStake(e.target.value)} />
      <input className="payment-button" type="submit" value="Bet" />
    </>
  )
}