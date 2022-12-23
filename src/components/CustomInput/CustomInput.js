import React from 'react'

const CustomInput = ({
  arrayToSelect,
  changeState,
  changeStateSelected,
  disabled,
  errors,
  label,
  name,
  pattern,
  placeholder,
  regularExpression,
  readOnly,
  state,
  touch,
  type,
  validateFunction,
  value,
}) => {
  const onChange = (e) => {
    const value = e.target.value
    // if (type === 'select') {
    //   changeStateSelected(value)
    // } else {
    //   changeState({ ...state, [name]: value })
    // }
    changeState({ ...state, [name]: value })
  }

  console.log('array', arrayToSelect)
  console.log('array type', typeof arrayToSelect)

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
    disabled={disabled}
    name={name}
    onChange={onChange}
    pattern={pattern}
    placeholder={placeholder}
    readOnly={readOnly}
    type={type}
    value={value}
  />

  if (type === 'select' && (typeof (arrayToSelect) == 'object' || typeof (arrayToSelect) == 'array')) {
    inputToRender = <select
      name={name}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className='form__input'
      value={value}>
      {
        arrayToSelect &&
        arrayToSelect.map((item) =>
          <option key={item.id} value={item.id}>
            {item.name}
          </option>)
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
