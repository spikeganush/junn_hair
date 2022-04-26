import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import validator from 'validator'
import db from '../firebase'
import {
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

function EditAppointment({ appointment, setEdit, edit }) {
  const [value, onChange] = useState(
    appointment.appointmentDate
      ? appointment.appointmentDate.toDate()
      : new Date()
  )
  const [customerName, setCustomerName] = useState(
    appointment.customerName ? appointment.customerName : ''
  )
  const [customerEmail, setCustomerEmail] = useState(
    appointment.customerEmail ? appointment.customerEmail : ''
  )
  const [customerPhone, setCustomerPhone] = useState(
    appointment.customerPhone ? appointment.customerPhone : ''
  )
  const [depositAmount, setDepositAmount] = useState(
    appointment.depositAmount ? appointment.depositAmount : 0
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  //here to delete the client in the DB to update later
  useEffect(() => {
    deleteData()
  }, [])

  const deleteData = async () => {
    //get clients docs firebase
    const clients = collection(db, 'clients')
    const q = query(clients, where('customerEmail', '==', customerEmail))

    const snapshot = await getDocs(q)

    if (snapshot.size !== 0) {
      let id
      snapshot.forEach((doc) => {
        id = doc.id
      })
      deleteDoc(doc(db, 'clients', id))
    }
  }

  const saveDataClient = async () => {
    const dataClients = {
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      depositAmount: depositAmount,
    }

    //get clients docs firebase
    const clients = collection(db, 'clients')
    const q = query(clients, where('customerEmail', '==', customerEmail))
    const snapshot = await getDocs(q)
    if (snapshot.size === 0) {
      await addDoc(collection(db, 'clients'), dataClients)
    }
  }

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
        //await addDoc(collection(db, 'appointments'), data)
        await updateDoc(doc(db, 'appointments', appointment.id), {
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
          depositAmount: depositAmount,
          appointmentDate: value,
        })
        saveDataClient()
        setLoading(false)
        setError('')
        setCustomerName('')
        setCustomerEmail('')
        setCustomerPhone('')
        setDepositAmount(0)
        setSuccess('Appointment booked successfully')
        setTimeout(() => {
          setSuccess('')
          setEdit(!edit)
        }, 2000)
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
    <>
      <Calendar onChange={onChange} value={value} />
      <form className="add-customer__form" autoComplete="off">
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <label htmlFor="name">Customer name:</label>
          <input
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
        <button disabled={loading} className="button" onClick={registerHandler}>
          {loading ? 'Register ...' : 'Register'}
        </button>
        <button
          disabled={loading}
          className="button-cancel"
          onClick={() => {
            saveDataClient()
            setEdit(!edit)
          }}
        >
          Cancel
        </button>
      </form>
    </>
  )
}

export default EditAppointment
