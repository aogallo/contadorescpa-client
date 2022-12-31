import React from 'react'
import Select from 'react-select'

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
    if (type === 'select' && name == 'company') {
      changeStateSelected(value)
    } else {
      changeState({ ...state, [name]: value })
    }
    // changeState({ ...state, [name]: value })
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
    const newOptions = arrayToSelect.map(element => (
      {
        value: element.id,
        label: element.name
      }
    ))
    inputToRender = <Select
      className=''
      onChange={(event) => changeStateSelected(event)}
      styles={{
        control: (baseStyles, state) => {
          return {
            ...baseStyles,
            borderColor: state.isFocused ? 'blue' : 'black',
            borderRadius: 10,
          }
        }
      }}
      // theme={(theme) => {
      //   console.log('theme', theme)
      //   return ({
      //     ...theme,
      //     borderRadius: 10,
      //   })
      // }}
      options={newOptions} />
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
