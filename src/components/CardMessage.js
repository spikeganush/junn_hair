import React from 'react'

function CardMessage({ appointment, handleAction, handlePayment, text }) {
  return (
    <div className="appointment-card" key={appointment.id}>
      <h2>Name: {appointment.customerName}</h2>
      <p>Email: {appointment.customerEmail}</p>
      <p>Phone: {appointment.customerPhone}</p>
      <p>
        Appointment date:{' '}
        {appointment.appointmentDate.toDate().toLocaleString('en-GB', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })}
      </p>
      <p>Deposit amount : ${appointment.depositAmount}</p>
      <button
        className="btn btn-primary"
        onClick={() => handleAction(appointment.id)}
      >
        {text}
      </button>
      <button
        className="btn btn-primary"
        disabled={appointment.payed}
        onClick={() => handlePayment(appointment.id)}
      >
        {appointment.payed ? 'Deposit payed' : 'Pay the deposit'}
      </button>
    </div>
  )
}

export default CardMessage
