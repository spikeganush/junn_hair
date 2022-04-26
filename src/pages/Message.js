import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import db from '../firebase'
import Card from '../components/Card'
import EditAppointment from '../components/EditAppointment'

function Message({ appointments, finalMessages }) {
  const [edit, setEdit] = useState(false)
  const [appointmentEdit, setAppointmentEdit] = useState()

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

  if (!edit) {
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
              <Card
                appointment={appointment}
                key={appointment.id}
                handleAction={handleReminder}
                handlePayment={handlePayment}
                text="Reminder sent"
                setEdit={setEdit}
                edit={edit}
                setAppointmentEdit={setAppointmentEdit}
                type="message"
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
              <Card
                appointment={finalMessage}
                key={finalMessage.id}
                handleAction={handlefinalMessage}
                handlePayment={handlePayment}
                text="Final message sent"
                setEdit={setEdit}
                edit={edit}
                setAppointmentEdit={setAppointmentEdit}
                type="message"
              />
            ))}
        </div>
      </main>
    )
  } else {
    return (
      <main>
        <h1 className="title">Edit</h1>

        {/* Edit the appointment selectioned */}
        {appointmentEdit && (
          <EditAppointment
            appointment={appointmentEdit}
            setAppointmentEdit={setAppointmentEdit}
            setEdit={setEdit}
            edit={edit}
          />
        )}
      </main>
    )
  }
}

export default Message
