import React, { useState } from 'react'
import Card from '../components/Card'
import EditAppointment from '../components/EditAppointment'

function List({ appointments }) {
  const [edit, setEdit] = useState(false)
  const [appointmentEdit, setAppointmentEdit] = useState()

  if (!edit) {
    return (
      <main>
        <div className="wrapper">
          {/* map appointments to list and show a card for each appointment */}
          {appointments &&
            appointments.map((appointment) => (
              <Card
                appointment={appointment}
                key={appointment.id}
                setEdit={setEdit}
                edit={edit}
                setAppointmentEdit={setAppointmentEdit}
                type="list"
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

export default List
