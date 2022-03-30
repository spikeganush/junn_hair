import React from 'react'
//firebase components
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import db from '../firebase'

function List({ appointments }) {
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'appointments', id))
      .then(() => {})
      .catch((error) => {
        console.log(error)
      })
  }

  const updateReminder = async (id, status) => {
    await updateDoc(doc(db, 'appointments', id), {
      messageReminder: status,
    })
  }

  const updateFinalMessage = async (id, status) => {
    await updateDoc(doc(db, 'appointments', id), {
      finalMessage: status,
    })
  }

  return (
    <main>
      <div className="wrapper">
        {/* map appointments to list and show a card for each appointment */}
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
              <p>Deposit amount : ${appointment.depositAmount}</p>
              <button
                className="button_delete"
                onClick={() => handleDelete(appointment.id)}
              >
                Delete
              </button>
              <div className="checkbox-area">
                <div className="checkboxes">
                  <input
                    type="checkbox"
                    checked={appointment ? appointment.messageReminder : false}
                    id="reminder"
                    onChange={() => {
                      updateReminder(
                        appointment.id,
                        !appointment.messageReminder
                      )
                    }}
                  />
                  <label htmlFor="reminder">Reminder</label>
                </div>
                <div className="checkboxes">
                  <input
                    type="checkbox"
                    checked={appointment ? appointment.finalMessage : false}
                    id="final"
                    onChange={() => {
                      updateFinalMessage(
                        appointment.id,
                        !appointment.finalMessage
                      )
                    }}
                  />
                  <label htmlFor="final">Final</label>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}

export default List
