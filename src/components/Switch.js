import React from 'react'
import './Switch.css'

const Switch = ({ isOn, text, data, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        readOnly={true}
        className="react-switch-checkbox"
        id="react-switch-new"
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor="react-switch-new"
        onClick={handleToggle}
      >
        <span className={`react-switch-button`} />
      </label>
      {text}
    </>
  )
}

export default Switch
