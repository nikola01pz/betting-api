import React, { useState } from "react"
import "./../styles/addFunds.css"

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

export default function AddFundsSimulation() {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [cardNumber, setCardNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [amount, setAmount] = useState("")

  const handleClick = (method) => {
    setSelectedMethod(method);
    setCardNumber("")
    setCvv("")
    setAmount("")
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value)
  }

  const handleCvvChange = (e) => {
    setCvv(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  const handleAddFunds = () => {
    console.log("Adding funds:", {
      cardNumber,
      cvv,
      amount,
    })
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
                <div className="payment-details">
                    <input 
                      className="payment-input" 
                      placeholder="Card Number" 
                      value={cardNumber} 
                      onChange={handleCardNumberChange}/>
                    <input 
                      className="payment-input" 
                      placeholder="CVV" 
                      value={cvv} 
                      onChange={handleCvvChange}/>
                    <input 
                      className="payment-input" 
                      placeholder="Amount" 
                      value={amount} 
                      onChange={handleAmountChange}/>
                </div>
            ) : (
                <div className="payment-details">
                    <input 
                      className="payment-input" 
                      placeholder="Code" 
                      value={cardNumber} 
                      onChange={handleCardNumberChange}/>
                </div>
            )}
            <button className="add-funds" onClick={handleAddFunds}>Add Funds</button>
        </div>
      )}
    </>
  )
}