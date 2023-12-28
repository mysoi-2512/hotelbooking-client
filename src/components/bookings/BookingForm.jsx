import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomById, bookRoom } from '../utils/ApiFunctions';
import moment from 'moment';
import { Form, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {

    const currentUser = localStorage.getItem("userId")

    const [ isValidated, setIsValidated ] = useState(false)
    const [ isSubmitted, setIsSubmited ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ roomPrice, setRoomPrice ] = useState(0)
    const [ booking, setBooking ] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: ""
    })

    const { roomId } = useParams();
    const navigate = useNavigate();

    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }

    const getRoomPriceById = async(roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate, "days")
        const price = roomPrice ? roomPrice : 0;
        return diffInDays * price
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = booking.numOfChildren > 0 ? parseInt(booking.numOfChildren) : 0;
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = () => {
        if (booking.checkInDate && booking.checkOutDate) {
            if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
                setErrorMessage("Check-out date must be after check-in date")
                return false
            } else {
                setErrorMessage("")
                return true
            }
        }
	}

    const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.target
		if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
			e.stopPropagation()
		} else {
            setIsValidated(true)
		}
        setIsSubmited(true)
	}    

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking)
            console.log(confirmationCode);
            setIsSubmited(true)
            navigate("/booking-success", { state: { message: confirmationCode } })
        } catch (error) {
            setErrorMessage(error.message)
            navigate("/booking-success", { state: { error: errorMessage } })
        }
    }

    return (
        <>
            <div className='mb-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card card-body mt-5'>
                            <h4>Reserve Room</h4>
                            <hr />
                            <Form noValidate validated={isValidated}
                                onSubmit={handleSubmit}
                            >
                                <Form.Group>
                                    <Form.Label htmlFor='guestFullName' className='hotel-color'>Full Name</Form.Label>                                
                                    <FormControl
                                        required
                                        type='text'
                                        id='guestFullName'
                                        name='guestFullName'
                                        value={booking.guestFullName}
                                        placeholder='Enter your full name'
                                        onChange={handleInputChange}
                                        isInvalid={isSubmitted && !booking.guestFullName}
                                    />
                                    <FormControl.Feedback type='invalid'>
                                        Please enter your fullname
                                    </FormControl.Feedback>
                                </Form.Group>

                                <Form.Group className='mt-2'>
                                    <Form.Label htmlFor='guestEmail' className='hotel-color'>Email</Form.Label>                                
                                    <FormControl
                                        required
                                        type='email'
                                        id='guestEmail'
                                        name='guestEmail'
                                        value={booking.guestEmail}
                                        placeholder='Enter your email'
                                        onChange={handleInputChange}
                                        isInvalid={isSubmitted && !booking.guestEmail}
                                    />
                                    <FormControl.Feedback type='invalid'>
                                        Please enter your email
                                    </FormControl.Feedback>
                                </Form.Group>

                                <fieldset className='mt-3'>
                                    <h5>Calendar</h5>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <Form.Group>
                                                <Form.Label htmlFor='checkInDate' className='hotel-color'>Check-in Date</Form.Label>                                
                                                <FormControl
                                                    required
                                                    type='date'
                                                    id='checkInDate'
                                                    name='checkInDate'
                                                    value={booking.checkInDate}
                                                    placeholder='Check-in Date'
                                                    onChange={handleInputChange}
                                                    isInvalid={isSubmitted && !booking.checkInDate}
                                                />
                                                <FormControl.Feedback type='invalid'>
                                                    Please select check-in date
                                                </FormControl.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group>
                                                <Form.Label htmlFor='checkOutDate' className='hotel-color'>Check-out Date</Form.Label>                                
                                                <FormControl
                                                    required
                                                    type='date'
                                                    id='checkOutDate'
                                                    name='checkOutDate'
                                                    value={booking.checkOutDate}
                                                    placeholder='Check-out Date'
                                                    onChange={handleInputChange}
                                                    isInvalid={isSubmitted && !booking.checkOutDate}
                                                />
                                                <FormControl.Feedback type='invalid'>
                                                    Please select check-out date
                                                </FormControl.Feedback>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    {errorMessage && <p className='error-message text-danger mt-1'>{errorMessage}</p>}
                                </fieldset>

                                <fieldset className='mt-3'>
                                    <h5>Number of Guests</h5>
                                    <div className='row mt-3'>
                                        <div className='col-6'>
                                            <Form.Group>
                                                <Form.Label htmlFor='numOfAdults' className='hotel-color'>Adults</Form.Label>                                
                                                <FormControl
                                                    required
                                                    type='number'
                                                    id='numOfAdults'
                                                    name='numOfAdults'
                                                    value={booking.numOfAdults}
                                                    placeholder='0'
                                                    min={1}
                                                    onChange={handleInputChange}
                                                    isInvalid={isSubmitted && booking.numOfAdults <= 0}
                                                />
                                                <FormControl.Feedback type='invalid'>
                                                    Please select at least 1 adult
                                                </FormControl.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Group>
                                                <Form.Label htmlFor='numOfChildren' className='hotel-color'>Children</Form.Label>                                
                                                <FormControl
                                                    type='number'
                                                    id='numOfChildren'
                                                    name='numOfChildren'
                                                    value={booking.numOfChildren}
                                                    placeholder='0'
                                                    min={0}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className='form-group mt-3 mb-2'>
                                    <button className='btn btn-hotel' type='submit'>Continue</button>
                                </div>                                
                            </Form>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        {isValidated && (
                            <BookingSummary 
                                booking={booking}
                                payment={calculatePayment()}
                                isFormValid={isValidated}
                                onConfirm={handleBooking}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingForm