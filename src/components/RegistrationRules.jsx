import React from "react"

export default function RegistrationRules() {
  return (
    <div className="register-rules">
        <h2>Registration rules:</h2>
        <ul>
            <li>Email adress must be valid and not used yet</li>
            <li>Username must be unique and contain atleast three letters, no numbers or special signs allowed</li>
            <li>Password must contain atleast 8 symbols including upper letter, number and special sign</li>
            <li>First and last name can only contain letters</li>
            <li>You must be atleast 18 years old to register</li>
        </ul>
    </div>
  )
}