import React from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import db from '../firebase'

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

  return (
    <main>
      {appointments.length > 0 ? (
        <h1>Reminder (more than 5 days)</h1>
      ) : (
        <h1>No reminder</h1>
      )}
      {/* map appointments to list and show a card for each appointment more than 5 days but less than 7 */}
      {appointments &&
        appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <h2>Name: {appointment.customerName}</h2>
            <p>Email: {appointment.customerEmail}</p>
            <p>Phone: {appointment.customerPhone}</p>
            <p>
              Appointment date:{' '}
              {appointment.date.toDate().toLocaleString([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handleReminder(appointment.id)}
            >
              Reminder sent
            </button>
          </div>
        ))}
      {finalMessages.length > 0 ? (
        <h1 className="final-message-title">
          final message (more than 7 days)
        </h1>
      ) : (
        <h1 className="final-message-title">No final message</h1>
      )}
      {/* map appointments to list and show a card for each appointment more than 7 days */}
      {finalMessages &&
        finalMessages.map((finalMessage) => (
          <div className="appointment-card" key={finalMessage.id}>
            <h2>Name: {finalMessage.customerName}</h2>
            <p>Email: {finalMessage.customerEmail}</p>
            <p>Phone: {finalMessage.customerPhone}</p>
            <p>
              Appointment date:{' '}
              {finalMessage.date.toDate().toLocaleString([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => handlefinalMessage(finalMessage.id)}
            >
              Final message sent
            </button>
          </div>
        ))}
    </main>
  )
}

export default Message
