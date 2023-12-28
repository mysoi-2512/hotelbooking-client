import React, { useState } from 'react'
import  { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'

const FindBooking = () => {

    const [ confirmationCode, setConfirmationCode ] = useState("")
    const [ error, setError ] = useState("")
    const [ successMessage, setSuccessMessage ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDelete, setIsDelete ] = useState(false)
    const [ bookingInfo, setBookingInfo ] = useState({
        bookingId: "",
        room: { id: "", roomType: "" },
        bookingConfirmationCode: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    })

    const clearBookingInfo = {
        id: "",
        room: { id: "", roomType: "" },
        bookingConfirmationCode: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    }

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError("")
        } catch (error) {
            setBookingInfo(clearBookingInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId)
            setIsDelete(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(clearBookingInfo)
            setConfirmationCode("")
            setError("")
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDelete(false)
        }, 3000)
    }

    return (
        <>
            <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
                <h2>Find My Booking</h2>
                <form onSubmit={handleSubmit} className='col-md-6 mt-2'>
                    <div className='input-group mb-3'>
                        <input 
                            type="text" 
                            className='form-control'
                            id='confirmationCode'
                            name='confimationCode'
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder='Enter yout booking confirmation code'
                        />
                        <button className='btn btn-hotel input-group-text'>Find booking</button>
                    </div>
                </form>

                {isLoading ? ( 
                    <div>Finding Booking ...</div>
                ) : error ? (
                    <div className='text-danger'>Error: {error}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className='col-md-6 mt-4 mb-5 card card-body'>
                        <h3>Booking Information</h3>
                        <hr />
                        <table className='table '>
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope='row'>Booking Confirmation Code</th>
                                    <td>{bookingInfo.bookingConfirmationCode}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Booking ID</th>
                                    <td>{bookingInfo.bookingId}</td>
                                </tr>                                
                                <tr>
                                    <th scope='row'>Room ID</th>
                                    <td>{bookingInfo.room.id}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Room Type</th>
                                    <td>{bookingInfo.room.roomType}</td>
                                </tr>
                                <tr>
                                <th scope='row'>Check-In Date</th>
                                    <td>{bookingInfo.checkInDate}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Check-Out Date</th>
                                    <td>{bookingInfo.checkOutDate}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Full Name</th>
                                    <td>{bookingInfo.guestFullName}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Email Address</th>
                                    <td>{bookingInfo.guestEmail}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Adults</th>
                                    <td>{bookingInfo.numOfAdults}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Children</th>
                                    <td>{bookingInfo.numOfChildren}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>Total Guest</th>
                                    <td>{bookingInfo.totalNumOfGuest}</td>
                                </tr>
                            </tbody>
                        </table>

                        {!isDelete && (
                            <button className='btn btn-danger'
                                onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
                            >
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
                {isDelete && (
                    <div className='alert alert-success mt-3' role='alert'> 
                        {successMessage}
                    </div>
                )}
            </div>
        </>
    )
}

export default FindBooking