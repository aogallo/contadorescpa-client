import React from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const CustomDatePicker = ({
  changeDate,
  errors,
  label,
  name,
  touch,
  state,
  value,
}) => {
  const handleChange = (date) => {
    changeDate({
      ...state,
      [name]: date
    })
  }

  return (
    <div className='form__control'>
      <label htmlFor={name} className='form__label'>
        {label}
      </label>
      <div>
        <DatePicker
          className='form__input form__input--date'
          todayButton="Hoy"
          selected={value}
          onChange={(date) => handleChange(date)}
          dateFormat='dd/MM/yyyy'
        >
        </DatePicker>
      </div>
      {
        touch && errors[name] && (
          <p style={{ color: 'red' }}> {errors[name]}</p>
        )
      }
    </div>
  )
}

export default CustomDatePicker
