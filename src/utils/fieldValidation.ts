interface ValidationErrors {
  [key: string]: string;
}

interface FormValues {
  [key: string]: unknown;
  name?: string;
  email?: string;
}

// Regular expressions for validation
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
const NIT_REGEX = /^\d{1,8}-\d{1}$/; // Format: 12345678-9
const PHONE_REGEX = /^\d{8}$/; // 8 digits for Guatemala

/**
 * Validates form fields based on field names
 * @param values - Form values object
 * @param fields - Array of field names to validate
 * @returns Object containing validation errors
 */
export const validatedFormFields = (
  values: FormValues,
  fields: string[]
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate name if included
  if (fields.includes('name')) {
    if (!values.name) {
      errors.name = 'Por favor ingresa tu nombre';
    } else if (!NAME_REGEX.test(values.name)) {
      errors.name = 'El nombre solo puede contener letras y espacios';
    }
  }

  // Validate each field
  fields.forEach((field) => {
    const value = values[field];

    // Email validation
    if (field === 'email') {
      if (!value) {
        errors.email = 'Por favor ingresa una dirección de correo electrónico';
      } else if (typeof value === 'string' && !EMAIL_REGEX.test(value)) {
        errors.email = 'El correo ingresado es inválido';
      }
      return; // Skip generic required check for email
    }

    // NIT validation
    if (field === 'nit' && value && typeof value === 'string') {
      if (!NIT_REGEX.test(value)) {
        errors.nit = 'El NIT debe tener el formato: 12345678-9';
      }
    }

    // Phone validation
    if (field === 'phone' && value && typeof value === 'string') {
      if (!PHONE_REGEX.test(value)) {
        errors.phone = 'El teléfono debe tener 8 dígitos';
      }
    }

    // Generic required field validation
    if (!value && field !== 'email') {
      errors[field] = `El campo ${field} es requerido.`;
    }
  });

  return errors;
};

/**
 * Validates an email address
 * @param email - Email string to validate
 * @returns true if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validates a name
 * @param name - Name string to validate
 * @returns true if valid, false otherwise
 */
export const validateName = (name: string): boolean => {
  return NAME_REGEX.test(name);
};

/**
 * Validates a NIT (Tax ID) for Guatemala
 * @param nit - NIT string to validate
 * @returns true if valid, false otherwise
 */
export const validateNIT = (nit: string): boolean => {
  return NIT_REGEX.test(nit);
};

/**
 * Validates a phone number for Guatemala
 * @param phone - Phone string to validate
 * @returns true if valid, false otherwise
 */
export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

/**
 * Checks if a string is empty or only whitespace
 * @param value - String to check
 * @returns true if empty or whitespace, false otherwise
 */
export const isEmpty = (value: string | undefined | null): boolean => {
  return !value || value.trim().length === 0;
};

/**
 * Validates required fields in a form
 * @param values - Form values
 * @param requiredFields - Array of required field names
 * @returns Object containing errors for empty required fields
 */
export const validateRequiredFields = (
  values: FormValues,
  requiredFields: string[]
): ValidationErrors => {
  const errors: ValidationErrors = {};

  requiredFields.forEach((field) => {
    const value = values[field];
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && isEmpty(value))
    ) {
      errors[field] = `El campo ${field} es requerido`;
    }
  });

  return errors;
};

