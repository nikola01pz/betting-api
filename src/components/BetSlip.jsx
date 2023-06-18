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

  function handleDeleteGame(index) {
    const updatedBetSlip = [...betSlip]
    updatedBetSlip.splice(index, 1)
    setBetSlip(updatedBetSlip)
  }

  const totalCoefficient = calculateTotalCoefficient(betSlip)
  const payout = (stake*totalCoefficient*0.85).toFixed(2)
  const tax = (stake*totalCoefficient*0.15).toFixed(2)

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

      <div className="betSlip-total-count">
        Total Coefficient: {betSlip.length ? totalCoefficient : "-"}
        <br />
        Payout: {betSlip.length ? `${payout}€` : "-"}
        <br />
        15% Tax: {betSlip.length ? `${tax}€` : "-"}
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