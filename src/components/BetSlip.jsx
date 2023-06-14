import React from "react"

export default function BetSlip() {

  return (
    <>
        <table className="table-bet-slip">
          <thead>
            <tr>  
              <th className="bet-slip-title" >My bet slip</th>
              <th className="bet-slip-clear-all" colSpan="2" >Clear All</th>
            </tr>
          </thead>
          
          <tbody>
            <tr>
              <td className="bet-slip-offer-name">Dinamo Zagreb-Olymp.Pireus</td>
              <td>1</td>
              <td>1.55</td>
            </tr>
            <tr>
              <td className="bet-slip-offer-name">CSKA Moskva-Manchester Utd</td>
              <td>f+2</td>
              <td>3.1</td>
            </tr>
            <tr>
              <td className="bet-slip-offer-name">Wolfsburg-PSV Eindhoven</td>
              <td>X</td>
              <td>1.7</td>
            </tr>
            <tr>
              <td className="bet-slip-offer-name">Ćorić B.-Donskoy E.</td>
              <td>2</td>
              <td>1.5</td>
            </tr>
            <tr>
              <td className="bet-slip-offer-name">Malmö FF-Shakhtar Donetsk</td>
              <td>1X</td>
              <td>1.2</td>
            </tr>
            <tr>
              <td className="bet-slip-offer-name">CSKA Moskva-Manchester Utd</td>
              <td>2</td>
              <td>3.1</td>
            </tr>
            <tr>
              <td className="bet-slip-offer-name">Wolfsburg-PSV Eindhoven</td>
              <td>1</td>
              <td>1.7</td>
            </tr>
            <tr>
              <td className="bet-slip-offer-name">Ćorić B.-Donskoy E.</td>
              <td>2</td>
              <td>1.5</td>
            </tr>
            <tr>
              <td className="bet-slip-offer-name">Malmö FF-Shakhtar Donetsk</td>
              <td>X2</td>
              <td>1.2</td>
            </tr>
          </tbody>
        </table>

        <div className="bet-slip-total-count">
          Total coefficient: 139.48
          <br/>
          Payout: -
        </div>
        <input className="stake-input" type="text" placeholder="Minimal stake is 0.25" maxLength="6"/>
        <input className="payment-button" type="submit" value="Bet" />
    </>
  )
}