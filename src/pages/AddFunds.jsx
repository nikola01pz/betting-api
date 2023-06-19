import React, { useState } from "react"
import axios from "axios"
import "../styles/addFunds.css"
import { useRecoilState} from "recoil"
import { balanceState } from "../components/atoms"

const paymentMethods = [
  {name: "BetIt Coupon", type: "coupon" },
  {name: "Winning ticket", type: "coupon" },
  {name: "Revolut", type: "card" },
  {name: "PaySafeCard", type: "coupon" },
  {name: "Skrill", type: "card" },
  {name: "Visa", type: "card" },
  {name: "Maestro", type: "card" },
  {name: "Mastercard", type: "card" },
  {name: "Diners", type: "card" },
]

export default function AddFundsSimulation( {userData}) {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [cardNumber, setCardNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [amount, setAmount] = useState("")
  const [addFundsMessage, setAddFundsMessage] = useState("")
  const [, setUserBalance] = useRecoilState(balanceState)

  const handleClick = (method) => {
    setSelectedMethod(method)
    setCardNumber("")
    setCvv("")
    setAmount("")
  }

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value)
  }

  const handleCvvChange = (e) => {
    setCvv(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value))
  }

  function handleAddFunds() {
    if (selectedMethod.type === "card") {
      handleAddFundsCard()
    } else if (selectedMethod.type === "coupon") {
      handleAddFundsCoupon()
    }
  }


  const handleAddFundsCard = async (event) => {
    const addFundsRequest = {
      username: userData?.username,
      amount
    }

    try {
      const response = await axios.post("http://localhost:5000/add_funds", addFundsRequest)
      console.log("Request successful:", response)
      setAddFundsMessage("Funds have been added!")
      setTimeout(() => {
        setAddFundsMessage("")
      }, 2000)
      setUserBalance((prevBalance) => prevBalance + amount)
    } catch (error) {
      if (amount > 10000) {
        setAddFundsMessage("Maximal amount to add is 10000€")
      }
      if (amount < 5) {
        setAddFundsMessage("Minimal amount to add is 5€")
      }
      setTimeout(() => {
        setAddFundsMessage("")
      }, 2000)
    }
  }

  const handleAddFundsCoupon = async (event) => {
    const addFundsRequest = {
      username: userData?.username,
      amount: Math.floor(Math.random() * 150) + 10
    }

    try {
      const response = await axios.post("http://localhost:5000/add_funds", addFundsRequest)
      console.log("Request successful:", response)
      setAddFundsMessage(`${addFundsRequest.amount}€ have been added!`)
      setTimeout(() => {
        setAddFundsMessage("")
      }, 2000);
      setUserBalance((prevBalance) => prevBalance + addFundsRequest.amount)
    } catch (error) {
      setTimeout(() => {
        setAddFundsMessage("")
      }, 2000)
    }
  }

  return (
    <>
      <div className="grid-payment-types">
        {paymentMethods.map((paymentMethod) => (
          <div key={paymentMethod.name}
            className={`grid-item2 ${selectedMethod === paymentMethod ? "selected" : ""}`}
            onClick={() => handleClick(paymentMethod)}>
            <span>{paymentMethod.name}</span>
          </div>
        ))}
      </div>
      {selectedMethod && (
        <div>
            <h2 className="payment-type">{selectedMethod.name}</h2>
            {selectedMethod.type === "card" ? (
                <div className="details-div">
                    <div>
                      <label className="addFunds-label">Card Number:</label>
                      <input 
                        className="payment-input" 
                        placeholder="Enter card number" 
                        value={cardNumber} 
                        maxLength={16}
                        onChange={handleCardNumberChange}/>
                    </div>
                    <div>
                      <label className="addFunds-label">CVV:</label>
                      <input 
                      className="payment-input" 
                      placeholder="Enter your cvv" 
                      value={cvv} 
                      type="number"
                      maxLength={3}
                      onChange={handleCvvChange}/>
                    </div>
                    <div>
                      <label className="addFunds-label">Amount:</label>
                      <input 
                        className="payment-input" 
                        placeholder="Enter amount to deposit" 
                        value={amount} 
                        type="number"
                        onChange={handleAmountChange}/>
                    </div>

                </div>
            ) : (
                <div className="details-div">
                  <label className="addFunds-label">Code:</label>
                  <input 
                    className="payment-input" 
                    placeholder="enter your code" 
                    maxLength={10}
                    value={cardNumber} 
                    onChange={handleCardNumberChange}/>
                </div>
            )}
            <button className="add-funds" onClick={handleAddFunds}>Add Funds</button>
            <div className="addFunds-message">
              {addFundsMessage && <div>{addFundsMessage}</div>}
            </div>
        </div>
      )}
    </>
  )
}