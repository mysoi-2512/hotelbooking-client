import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const numOfDays = checkOutDate.diff(checkInDate, "days");

    const navigate = useNavigate();

    const [ isBookingConfirmed, setIsBookingConfirmed ] = useState(false)
    const [ isProcessingPayment, setIsProcessingPayment ] = useState(false)

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000);
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])    
    
    return (
        <div className='card card-body mt-5'>
            <h4>Reservation Summary</h4>
            <hr />

            <table className='table '>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>Full name</th>
                        <td>{booking.guestFullName}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Email</th>
                        <td>{booking.guestEmail}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Check-In Date</th>
                        <td>{moment(booking.checkInDate).format("MMM Do YYYY")}</td>
                    </tr>
                    <tr>
                    <th scope='row'>Check-Out Date</th>
                        <td>{moment(booking.checkOutDate).format("MMM Do YYYY")}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Number of Days</th>
                        <td>{numOfDays}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Number of Adults</th>
                        <td>{booking.numOfAdults}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Number of Children</th>
                        <td>{booking.numOfChildren > 0 ? booking.numOfChildren : 0}</td>
                    </tr>
                </tbody>
            </table>


            {payment > 0 ? (
                <>
                    <p className='hotel-color'>
                        Total Payment : <strong>${payment}</strong>
                    </p>
                    {isFormValid && !isBookingConfirmed ? (
                        <Button
                            variant='success'
                            onClick={handleConfirmBooking}
                        >
                            {isProcessingPayment ? (
                                <>
                                    <span
                                        className='spinner-border spinner-border-sm mr-2'
                                        role='status'
                                        aria-hidden='true'></span>
                                    Booking Confirmed, redirecting to payment ...
                                </>
                            ) : (
                                "Confirm Booking and proceed to payment"
                            )}
                        </Button>
                    ) : isBookingConfirmed ? (
                        <div className='d-flex justify-content-center aligh-items-center'>
                            <div className='spinner-border text-primary' role='status'>
                                <span className='sr-only'>Loading</span>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <p className='text-danger'>Check-out date must be after check-in date </p>
            )}
        </div>
  )
}

export default BookingSummary