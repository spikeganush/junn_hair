import React from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import db from '../firebase'
import CardMessage from '../components/CardMessage'

function Message({ appointments, finalMessages }) {
  const handleReminder = async (id) => {
    const docRef = doc(db, 'appointments', id)
    await updateDoc(docRef, {
      messageReminder: true,
    })
  }

  const handlefinalMessage = async (id) => {
    const docRef = doc(db, 'appointments', id)
    await updateDoc(docRef, {
      finalMessage: true,
    })
  }

  const handlePayment = async (id) => {
    const docRef = doc(db, 'appointments', id)
    await updateDoc(docRef, {
      payed: true,
    })
  }

  return (
    <main>
      {appointments.length > 0 ? (
        <h1 className="title">Reminder (more than 5 days)</h1>
      ) : (
        <h1 className="title">No reminder</h1>
      )}
      <div className="wrapper">
        {/* map appointments to list and show a card for each appointment more than 5 days but less than 7 */}
        {appointments &&
          appointments.map((appointment) => (
            <CardMessage
              appointment={appointment}
              key={appointment.id}
              handleAction={handleReminder}
              handlePayment={handlePayment}
              text="Reminder sent"
            />
          ))}
      </div>
      {finalMessages.length > 0 ? (
        <h1 className="title">Final message (more than 7 days)</h1>
      ) : (
        <h1 className="title">No final message</h1>
      )}
      <div className="wrapper">
        {/* map appointments to list and show a card for each appointment more than 7 days */}
        {finalMessages &&
          finalMessages.map((finalMessage) => (
            <CardMessage
              appointment={finalMessage}
              key={finalMessage.id}
              handleAction={handlefinalMessage}
              handlePayment={handlePayment}
              text="Final message sent"
            />
          ))}
      </div>
    </main>
  )
}

export default Message
