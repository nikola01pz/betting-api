import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [offerData, setOfferData] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:5000/league-offers')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    data.forEach(item => {
      item.offers.forEach(async offerId => {
        const res = await axios.get(`http://localhost:5000/offer/${offerId}`);
        setOfferData(prevData => ({ ...prevData, [offerId]: res.data }));
      });
    });
  }, [data]);

  const groupedData = data.reduce((acc, current) => {
    if (acc[current.id]) {
      acc[current.id].offers.push(...current.offers);
    } else {
      acc[current.id] = {
        id: current.id,
        title: current.title,
        offers: current.offers
      };
    }
    return acc;
  }, {});

  return (
    <div>
      {Object.values(groupedData).map(function (data) {
        return (
          <>
            <table>
              <thead>
                <tr>
                  <th className="table_title">{data.title}</th>
                  <th className="time">Time</th>
                  <th className="tv_channel">TV</th>
                  <th className="statistics">Statistics</th>
                  <th>1</th>
                  <th>X</th>
                  <th>2</th>
                  <th>1X</th>
                  <th>X2</th>
                  <th>12</th>
                  <th>f+2</th>
                </tr>
              </thead>
              <tbody>
                {data.offers.map(offer => {
                  const offerDetails = offerData[offer];
                  return (
                    <tr key={offer}>
                      {offerDetails ? (
                        <>
                          <td className="game">{offerDetails.game}</td>
                          <td className="time">
                            {offerDetails.time &&
                              new Date(offerDetails.time).toLocaleString('hr-HR', {
                                day: '2-digit',
                                month: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                                timeZone: "UTC"
                              })}
                          </td>
                          <td className="tv_channel">{offerDetails.tv_channel}</td>
                          <td className="statistics">{offerDetails.statistics ? 'Yes' : 'No'}</td>
                          <td className="tip">{offerDetails.tips.find(tip => tip.Name === '1') ? offerDetails.tips.find(tip => tip.Name === '1').Value : '-'}</td>
                          <td className="tip">{offerDetails.tips.find(tip => tip.Name === 'X') ? offerDetails.tips.find(tip => tip.Name === 'X').Value : '-'}</td>
                          <td className="tip">{offerDetails.tips.find(tip => tip.Name === '2') ? offerDetails.tips.find(tip => tip.Name === '2').Value : '-'}</td>
                          <td className="tip">{offerDetails.tips.find(tip => tip.Name === '1X') ? offerDetails.tips.find(tip => tip.Name === '1X').Value : '-'}</td>
                          <td className="tip">{offerDetails.tips.find(tip => tip.Name === 'X2') ? offerDetails.tips.find(tip => tip.Name === 'X2').Value : '-'}</td>
                          <td className="tip">{offerDetails.tips.find(tip => tip.Name === '12') ? offerDetails.tips.find(tip => tip.Name === '12').Value : '-'}</td>
                          <td className="tip">{offerDetails.tips.find(tip => tip.Name === 'f+2') ? offerDetails.tips.find(tip => tip.Name === 'f+2').Value : '-'}</td>
                        </>
                      ) : (
                        <td>Loading...</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      })}
    </div>
  );
}