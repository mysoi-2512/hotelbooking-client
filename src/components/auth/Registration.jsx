import React, { useState } from 'react'
import { registerUser } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'
import { Form, FormControl } from 'react-bootstrap'

const Registration = () => {

    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [ isSubmitted, setisSubmitted ] = useState(false)

    const handleInputChange = (e) => {
        setRegistration({...registration, [e.target.name] : e.target.value})
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        setisSubmitted(true)
        const form = e.target
        if (form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            try {
                const result = await registerUser(registration)                
                setSuccessMessage(result)
                setErrorMessage("")
                setRegistration({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                })
                setisSubmitted(false)
            } catch (error) {
                setSuccessMessage("")
                setErrorMessage(`Registration error: ${error.message}`)
            }
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {successMessage && <p className='alert alert-success'>{successMessage}</p>}

                <h2 className='text-center'>Register</h2>

                <Form noValidate onSubmit={handleRegistration}>
                    <Form.Group>
                        <Form.Label htmlFor='firstName' className='hotel-color'>First Name</Form.Label>                                
                            <FormControl
                                required
                                type='text'
                                id='firstName'
                                name='firstName'
                                value={registration.firstName}
                                placeholder='Enter your first name'
                                onChange={handleInputChange}
                                isInvalid={isSubmitted && !registration.firstName}
                            />
                        <FormControl.Feedback type='invalid'>
                            Please enter your first name!
                        </FormControl.Feedback>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label htmlFor='lastName' className='hotel-color'>Last Name</Form.Label>                                
                            <FormControl
                                required
                                type='text'
                                id='lastName'
                                name='lastName'
                                value={registration.lastName}
                                placeholder='Enter your last name'
                                onChange={handleInputChange}
                                isInvalid={isSubmitted && !registration.lastName}
                            />
                        <FormControl.Feedback type='invalid'>
                            Please enter your last name!
                        </FormControl.Feedback>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label htmlFor='email' className='hotel-color'>Email</Form.Label>                                
                            <FormControl
                                required
                                type='email'
                                id='email'
                                name='email'
                                value={registration.email}
                                placeholder='Enter your email'
                                onChange={handleInputChange}
                                isInvalid={isSubmitted && !registration.email}
                            />
                        <FormControl.Feedback type='invalid'>
                            Please enter your email!
                        </FormControl.Feedback>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label htmlFor='password' className='hotel-color'>Password</Form.Label>                                
                            <FormControl
                                required
                                type='password'
                                id='password'
                                name='password'
                                value={registration.password}
                                placeholder='Enter your password'
                                onChange={handleInputChange}
                                isInvalid={isSubmitted && !registration.password}
                            />
                        <FormControl.Feedback type='invalid'>
                            Please enter your password!
                        </FormControl.Feedback>
                    </Form.Group>

                    <div className='mt-3'>
                        <button 
                            type='submit' 
                            className='btn btn-hotel'
                            style={{ marginRight: "10px" }}
                        >
                            Register
                        </button>
                        <span style={{ marginLeft: "10px"}}>
                            Already have an account?
                            <Link to={"/login"}>Login</Link>
                        </span>
                    </div>

                </Form>
        </section>
    )
}

export default Registration