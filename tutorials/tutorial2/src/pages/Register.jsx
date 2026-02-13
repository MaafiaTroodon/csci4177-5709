import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  doPasswordsMatch,
  isLettersOnly,
  isValidEmail,
  isValidPassword,
} from '../utils/validators.js'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Register() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const updateField = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!isLettersOnly(values.firstName)) {
      nextErrors.firstName = 'First name must contain only letters.'
    }

    if (!isLettersOnly(values.lastName)) {
      nextErrors.lastName = 'Last name must contain only letters.'
    }

    if (!isValidEmail(values.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!isValidPassword(values.password)) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    if (!doPasswordsMatch(values.password, values.confirmPassword)) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      navigate('/profile', {
        state: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        },
      })
    }
  }

  return (
    <main className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={values.firstName}
          onChange={updateField}
          type="text"
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={values.lastName}
          onChange={updateField}
          type="text"
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={values.email}
          onChange={updateField}
          type="email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          value={values.password}
          onChange={updateField}
          type="password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={updateField}
          type="password"
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <button type="submit">Register</button>
      </form>
    </main>
  )
}

export default Register
