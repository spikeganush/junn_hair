import React from 'react'
import Switch from './Switch'
//firebase components
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import db from '../firebase'

function Card({ appointment }) {
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'appointments', id))
      .then(() => {})
      .catch((error) => {
        console.log(error)
      })
  }

  const updatePayed = async (id, status) => {
    await updateDoc(doc(db, 'appointments', id), {
      payed: status,
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

      <div className="checkbox-area" key={appointment.id}>
        <div className="checkboxes">
          <Switch
            isOn={appointment ? appointment.payed : false}
            text="Deposite payed"
            data={appointment}
            handleToggle={() => updatePayed(appointment.id, !appointment.payed)}
          />
        </div>
        <div className="checkboxes">
          <Switch
            isOn={appointment ? appointment.messageReminder : false}
            text="Reminder"
            data={appointment}
            handleToggle={() =>
              updateReminder(appointment.id, !appointment.messageReminder)
            }
          />
        </div>
        <div className="checkboxes">
          <Switch
            isOn={appointment ? appointment.finalMessage : false}
            text="Final Message"
            data={appointment}
            handleToggle={() =>
              updateFinalMessage(appointment.id, !appointment.finalMessage)
            }
          />
        </div>
      </div>
      <button
        className="button_delete"
        onClick={() => handleDelete(appointment.id)}
      >
        Delete
      </button>
    </div>
  )
}

export default Card
