import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../img/logo.png'
import Auth from './Auth'

function Header({ authed, handleLogout, setMessageHome }) {
  //useState to open and close the login popup
  const [loginPopup, setLoginPopup] = useState(false)

  return (
    //navbar with a link to home, message, list, user at the left and at the right a link to an icon for login
    // with using vanilla css
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="left">
          <NavLink className="navbar-brand" to="/">
            <img
              src={logo}
              className="logo d-inline-block align-center"
              alt=""
            />
            <span className="navbar-brand mb-0 h1">
              <strong>
                <span className="text-light">
                  <i className="fas fa-home"></i>
                </span>
                <span className="text-light"> Home</span>
              </strong>
            </span>
          </NavLink>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/message">
                <strong>
                  <span className="text-light">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="text-light"> Message</span>
                </strong>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/list">
                <strong>
                  <span className="text-light">
                    <i className="fas fa-list"></i>
                  </span>
                  <span className="text-light"> List</span>
                </strong>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="right">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <strong>
                {authed ? (
                  <>
                    <span className="text-light">
                      <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span
                      className="text-light login-link"
                      onClick={() => {
                        handleLogout()
                        setLoginPopup(true)
                      }}
                    >
                      {' '}
                      Logout
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-light">
                      <i className="fas fa-sign-in-alt"></i>
                    </span>
                    <span
                      className="text-light login-link"
                      onClick={() => setLoginPopup(true)}
                    >
                      {' '}
                      Login
                    </span>
                  </>
                )}
              </strong>
            </li>
          </ul>
        </div>
      </nav>

      {loginPopup && (
        <div className="popup-profil-container">
          <div className="modal-container">
            <span className="cross" onClick={() => setLoginPopup(false)}>
              &#10005;
            </span>
            <div className="log-container">
              <Auth
                signin={true}
                signup={false}
                forgot={false}
                popup={setLoginPopup}
                setMessageHome={setMessageHome}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
