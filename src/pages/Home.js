import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import validator from 'validator'
import db from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

function Home({ currentUser, messageHome }) {
  const [value, onChange] = useState(new Date())
  const [customerName, setCustomerName] = useState()
  const [customerEmail, setCustomerEmail] = useState()
  const [customerPhone, setCustomerPhone] = useState()
  const [depositAmount, setDepositAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const registerHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (value === undefined) {
      setTimeout(() => {
        setError('')
      }, 5000)
      setLoading(false)
      return setError('Please select a date')
    }

    if (
      customerName === undefined &&
      customerEmail === undefined &&
      customerPhone === undefined &&
      depositAmount === 0
    ) {
      setTimeout(() => {
        setError('')
      }, 5000)
      setLoading(false)
      return setError('Please fill all the fields')
    }

    if (customerName === undefined) {
      setTimeout(() => {
        setError('')
      }, 5000)
      setLoading(false)
      return setError('Please enter customer name')
    }

    if (customerEmail === undefined) {
      setTimeout(() => {
        setError('')
      }, 5000)
      setLoading(false)
      return setError('Please enter customer email')
    }

    if (depositAmount === 0) {
      setTimeout(() => {
        setError('')
      }, 5000)
      setLoading(false)
      return setError('Please enter deposit amount')
    }

    if (!validator.isEmail(customerEmail)) {
      setTimeout(() => {
        setError('')
      }, 5000)
      setLoading(false)
      return setError('Please enter valid email')
    }

    if (customerPhone === undefined) {
      setTimeout(() => {
        setError('')
      }, 5000)
      setLoading(false)
      return setError('Please enter customer phone number')
    }

    if (
      customerName !== undefined &&
      customerEmail !== undefined &&
      customerPhone !== undefined
    ) {
      try {
        const data = {
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
          depositAmount: depositAmount,
          messageReminder: false,
          finalMessage: false,
          date: value,
        }
        const res = await addDoc(collection(db, 'appointments'), data)
        setLoading(false)
        setError('')
        setCustomerName('')
        setCustomerEmail('')
        setCustomerPhone('')
        setSuccess('Appointment booked successfully')
        setTimeout(() => {
          setSuccess('')
        }, 5000)
        setLoading(false)
        onChange(new Date())
      } catch (err) {
        console.log(err)
        setLoading(false)
        setError(err.message)
      }
    }
  }

  return (
    <main>
      {!currentUser ? (
        <h1>{messageHome}</h1>
      ) : (
        <>
          <h1 className="welcome">Welcome {currentUser.displayName}</h1>
          <h2 className="appointment-date">Select the appointment date:</h2>
          <Calendar onChange={onChange} value={value} />
          <form className="add-customer__form">
            {error && <span className="error-message">{error}</span>}
            {success && <span className="success-message">{success}</span>}
            <div className="form-group">
              <label htmlFor="name">Customer name:</label>
              <input
                type="text"
                required
                id="name"
                placeholder="Customer name"
                onChange={(e) => setCustomerName(e.target.value)}
                value={customerName ? customerName : ''}
                tabIndex={1}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Customer email:</label>
              <input
                type="email"
                required
                id="email"
                placeholder="Enter email"
                onChange={(e) => setCustomerEmail(e.target.value)}
                value={customerEmail ? customerEmail : ''}
                tabIndex={2}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Customer phone number:</label>
              <input
                type="tel"
                required
                id="phone"
                placeholder="Phone number"
                onChange={(e) => setCustomerPhone(e.target.value)}
                value={customerPhone ? customerPhone : ''}
                tabIndex={2}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Deposit amount $:</label>
              <input
                type="number"
                required
                id="amount"
                placeholder="Deposit amount"
                onChange={(e) => setDepositAmount(e.target.value)}
                value={depositAmount ? depositAmount : ''}
                tabIndex={2}
              />
            </div>
            <button
              disabled={loading}
              className="button"
              onClick={registerHandler}
            >
              {loading ? 'Register ...' : 'Register'}
            </button>
          </form>
        </>
      )}
    </main>
  )
}

export default Home
