import React from 'react'

const CustomInput = ({
  state,
  changeState,
  type,
  label,
  placeholder,
  name,
  value,
  arrayToSelect,
  regularExpression,
  validateFunction,
  touch,
  errors
}) => {
  console.log('touch', touch)
  console.log('errors', errors[name])
  const onChange = (e) => {
    changeState({ ...state, [name]: e.target.value })
  }

  const validation = () => {
    if (regularExpression) {
      console.log('regularExpression', regularExpression)
    }

    if (validateFunction) {
      validateFunction()
    }
  }

  let inputToRender = <input
    className='form__input'
    name={name}
    type={type}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
  />

  if (type === 'select') {
    inputToRender = <select
      name={name}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className='form__input'
      value={value}>
      {
        arrayToSelect &&
        arrayToSelect.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)
      }
    </select>
  }

  return (
    <div className='form__control'>
      <label htmlFor={name} className='form__label'>{label}</label>
      {
        inputToRender
      }
      {
        touch && errors[name] && (
          <p style={{ color: 'red' }}> {errors[name]}</p>
        )
      }
    </div >
  )
}

export default CustomInput
