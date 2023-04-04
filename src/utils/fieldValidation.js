export const validatedFormFields = (values, fields) => {
  const errors = {}

  if (fields.includes('name')) {
    if (!values.name) {
      errors.name = ' Por favor ingresa tu nombre'
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
      errors.name = ' El nombre solo puede contener letras y espacios'
    }
  }

  fields.each((field) => {
    if (field === 'email') {
      if (!values.email) {
        errors.email = 'Por favor ingresa una dirección de correo eletrónico'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'El correo ingresado es invalido'
      }
    }

    if (!values[field]) {
      errors[field] = `El campo ${field} es requerido.`
    }
  })

  return errors
}
