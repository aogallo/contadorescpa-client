import React from 'react'
import Select from 'react-select'

const CustomInput = ({
  arrayToSelect,
  customClass,
  changeState,
  changeStateSelected,
  disabled,
  errors,
  label,
  name,
  pattern,
  placeholder,
  // regularExpression,
  readOnly,
  state,
  touch,
  type,
  // validateFunction,
  value,
  required
}) => {
  const onChange = (e) => {
    const value = e.target.value
    if (type === 'select') {
      changeStateSelected(value, name)
    } else {
      changeState({ ...state, [name]: value })
    }
  }

  // const validation = () => {
  //   if (regularExpression) {
  //     console.log('regularExpression', regularExpression)
  //   }

  //   if (validateFunction) {
  //     validateFunction()
  //   }
  // }

  let inputToRender = (
    <input
      className='form__input'
      disabled={disabled}
      name={name}
      onChange={onChange}
      pattern={pattern}
      placeholder={placeholder}
      readOnly={readOnly}
      type={type}
      value={value}
      required={required}
    />
  )

  if (type === 'select' && (typeof arrayToSelect === 'object')) {
    // if (type == 'select' && arrayToSelect.lenght > 0) {
    const handleSelectFunction = changeStateSelected || changeState
    const newOptions = arrayToSelect.map(element => (
      {
        value: element.id,
        label: element.name
      }
    ))
    const valueSelect = newOptions.filter(option => option.value === value)
    inputToRender = (
      <Select
        className=''
        value={valueSelect}
        onChange={(event) => handleSelectFunction(event, name)}
        styles={{
          control: (baseStyles, state) => {
            return {
              ...baseStyles,
              borderColor: state.isFocused ? 'blue' : 'black',
              borderRadius: 10,
              ...customClass.control
            }
          },
          singleValue: (styles) => {
            return {
              ...styles,
              ...customClass.singleValue
            }
          }
        }}
        options={newOptions}
      />
    )
  }

  return (
    <div className='form__control'>
      <label
        htmlFor={name}
        className={`form__label ${customClass && customClass.label}`}
      >
        {label}
      </label>
      {
        inputToRender
      }
      {
        touch && errors[name] && (
          <p style={{ color: 'red' }}> {errors[name]}</p>
        )
      }
    </div>
  )
}

export default CustomInput
