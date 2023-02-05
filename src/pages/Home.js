import React, { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  const [leagueOffersData, setLeagueOffersData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/league-offers")
      .then(response => {
        const offers = response.data
        const leagueOffersPromise = offers.map(async offer => {
          const leagueOfferData = { id: offer.id, title: offer.title, offers: [] }
          const offersPromise = offer.offers.map(async offerId => {
            const offerResponse = await axios.get(`http://localhost:5000/offer/${offerId}`)
            return offerResponse.data
          })
          leagueOfferData.offers = await Promise.all(offersPromise)
          return leagueOfferData
        })
        Promise.all(leagueOffersPromise)
          .then(leagueOffersData => {
            setLeagueOffersData(leagueOffersData);
            console.log(leagueOffersData)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="grid-container">

      <div className="grid-item-1">
        {leagueOffersData.map((leagueOffer, index) => {
          return (
            <table key={index} className="table-offers">
              <thead>
                <tr>
                  <th className="table-offers-title">{leagueOffer.title}</th>
                  <th className="table-offers-tv"></th>
                  <th className="table_time"></th>
                  <th className="table-offers-statistics">Stats</th>
                  <th className="table-offers-tip">1</th>
                  <th className="table-offers-tip">X</th>
                  <th className="table-offers-tip">2</th>
                  <th className="table-offers-tip">1X</th>
                  <th className="table-offers-tip">X2</th>
                  <th className="table-offers-tip">12</th>
                  <th className="table-offers-tipf2">f+2</th>
                </tr>
              </thead>
              <tbody>
                {leagueOffer.offers.map(function (offer, index) {
                  return (
                    <tr key={index}>
                      <td className="table-offers-game">{offer.game}</td>
                      <td className="table-offers-tv">{offer.tv_channel}</td>
                      <td className="table-offers-time">
                        {offer.time && new Date(offer.time).toLocaleString("hr-HR", {
                            day: "2-digit", 
                            month: "2-digit", 
                            hour: "2-digit", 
                            minute: "2-digit", 
                            hour12: false, 
                            timeZone: "UTC"
                        })}
                      </td>
                      <td className="table-offers-statistics">{offer.statistics ? "Yes" : "No"}</td>
                      <td className="table-offers-tip">{offer.tips.find(tip => tip.Name === "1") ? 
                        offer.tips.find(tip => tip.Name === "1").Value : "-"}</td>
                      <td className="table-offers-tip">{offer.tips.find(tip => tip.Name === "X") ? 
                        offer.tips.find(tip => tip.Name === "X").Value : "-"}</td>
                      <td className="table-offers-tip">{offer.tips.find(tip => tip.Name === "2") ? 
                        offer.tips.find(tip => tip.Name === "2").Value : "-"}</td>
                      <td className="table-offers-tip">{offer.tips.find(tip => tip.Name === "1X") ? 
                        offer.tips.find(tip => tip.Name === "1X").Value : "-"}</td>
                      <td className="table-offers-tip">{offer.tips.find(tip => tip.Name === "X2") ? 
                        offer.tips.find(tip => tip.Name === "X2").Value : "-"}</td>
                      <td className="table-offers-tip">{offer.tips.find(tip => tip.Name === "12") ? 
                        offer.tips.find(tip => tip.Name === "12").Value : "-"}</td>
                      <td className="table-offers-tipf2">{offer.tips.find(tip => tip.Name === "f+2") ? 
                        offer.tips.find(tip => tip.Name === "f+2").Value : "-"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        })}
      </div>

      <div className="grid-item-2">
        <table className="table-bet-slip">
          <thead>
            <th className="bet-slip-title" >My bet slip</th>
            <th colSpan="2" className="bet-slip-clear-all">Clear All</th>
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
      </div>
    </div>
  )
}
