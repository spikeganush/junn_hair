import React from 'react'
import Card from '../components/Card'

function List({ appointments }) {
  return (
    <main>
      <div className="wrapper">
        {/* map appointments to list and show a card for each appointment */}
        {appointments &&
          appointments.map((appointment) => (
            <Card appointment={appointment} key={appointment.id} />
          ))}
      </div>
    </main>
  )
}

export default List
