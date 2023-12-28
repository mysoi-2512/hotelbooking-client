import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import Header from '../common/Header'

const BookingSuccess = () => {

    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error

    return (
        <div className='container'>
            <Header title="Booking Success"/>
            <div className='mt-5'>
                {message ? (
                    <div>
                        <h3 className='text-success'>Booking Success!</h3>
                        <p className='text-success'>{message}</p>
                    </div>
                ) : (
                    <div>
                        <h3 className='text-danger'>Booking Failed!</h3>
                        <p className='text-danger'>{error}</p>
                    </div>
                )}
            </div> 
            <Link to={"/"} className="btn btn-outline-success ml-5">
                  Back
            </Link>           
        </div>
    )
}

export default BookingSuccess