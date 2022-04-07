import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import validator from 'validator'
import db from '../firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

function Home({ clients, data, currentUser, messageHome }) {
  const [value, onChange] = useState(new Date())
  const [customerName, setCustomerName] = useState()
  const [customerEmail, setCustomerEmail] = useState()
  const [customerPhone, setCustomerPhone] = useState()
  const [depositAmount, setDepositAmount] = useState(0)
  const [nameFilteredData, setNameFilteredData] = useState([])
  const [emailFilteredData, setEmailFilteredData] = useState([])
  const [phoneFilteredData, setPhoneFilteredData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleNameFilter = (e) => {
    const searchWord = e.target.value
    setCustomerName(searchWord)
    const newFilter = clients.filter((value) => {
      return value.customerName.toLowerCase().includes(searchWord.toLowerCase())
    })
    if (customerName?.length === 0) {
      setNameFilteredData([])
    } else {
      setNameFilteredData(newFilter)
    }
  }

  const handleEmailFilter = (e) => {
    const searchWord = e.target.value
    setCustomerEmail(searchWord)
    const newFilter = clients.filter((value) => {
      return value.customerEmail
        .toLowerCase()
        .includes(searchWord.toLowerCase())
    })
    if (customerEmail?.length === 0) {
      setEmailFilteredData([])
    } else {
      setEmailFilteredData(newFilter)
    }
  }

  const handlePhoneFilter = (e) => {
    const searchWord = e.target.value
    setCustomerPhone(searchWord)
    const newFilter = clients.filter((value) => {
      return value.customerPhone
        .toLowerCase()
        .includes(searchWord.toLowerCase())
    })
    if (customerPhone?.length === 0) {
      setPhoneFilteredData([])
    } else {
      setPhoneFilteredData(newFilter)
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
        const data = {
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
          depositAmount: depositAmount,
          messageReminder: false,
          finalMessage: false,
          date: value,
        }

        saveDataClient()
        await addDoc(collection(db, 'appointments'), data)
        setLoading(false)
        setError('')
        setCustomerName('')
        setCustomerEmail('')
        setCustomerPhone('')
        setDepositAmount(0)
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

  return (
    <main>
      {!currentUser ? (
        <h1>{messageHome}</h1>
      ) : (
        <>
          <h1 className="welcome">Welcome {currentUser.displayName}</h1>
          <h2 className="appointment-date">Select the appointment date:</h2>
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
                onChange={handleNameFilter}
                value={customerName ? customerName : ''}
                tabIndex={1}
              />
              {nameFilteredData?.length <= 3 && nameFilteredData?.length !== 0 && (
                <div className="dataResult">
                  {nameFilteredData.map((value, key) => {
                    return (
                      <div
                        className="search-return"
                        key={key}
                        onClick={() => {
                          setCustomerName(value.customerName)
                          setCustomerEmail(value.customerEmail)
                          setCustomerPhone(value.customerPhone)
                          setDepositAmount(value.depositAmount)
                          setNameFilteredData([])
                        }}
                      >
                        {value.customerName}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Customer email:</label>
              <input
                autoComplete="off"
                type="email"
                required
                id="email"
                placeholder="Enter email"
                onChange={handleEmailFilter}
                value={customerEmail ? customerEmail : ''}
                tabIndex={2}
              />
              {emailFilteredData?.length <= 3 &&
                emailFilteredData?.length !== 0 && (
                  <div className="dataResult">
                    {emailFilteredData.map((value, key) => {
                      return (
                        <div
                          className="search-return"
                          key={key}
                          onClick={() => {
                            setCustomerName(value.customerName)
                            setCustomerEmail(value.customerEmail)
                            setCustomerPhone(value.customerPhone)
                            setDepositAmount(value.depositAmount)
                            setEmailFilteredData([])
                          }}
                        >
                          {value.customerEmail}
                        </div>
                      )
                    })}
                  </div>
                )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Customer phone number:</label>
              <input
                autoComplete="off"
                type="tel"
                required
                id="phone"
                placeholder="Phone number"
                onChange={handlePhoneFilter}
                value={customerPhone ? customerPhone : ''}
                tabIndex={2}
              />
              {phoneFilteredData?.length <= 3 &&
                phoneFilteredData?.length !== 0 && (
                  <div className="dataResult">
                    {phoneFilteredData.map((value, key) => {
                      return (
                        <div
                          className="search-return"
                          key={key}
                          onClick={() => {
                            setCustomerName(value.customerName)
                            setCustomerEmail(value.customerEmail)
                            setCustomerPhone(value.customerPhone)
                            setDepositAmount(value.depositAmount)
                            setPhoneFilteredData([])
                          }}
                        >
                          {value.customerPhone}
                        </div>
                      )
                    })}
                  </div>
                )}
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
