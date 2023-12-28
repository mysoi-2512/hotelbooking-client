import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider'
import { parseISO } from "date-fns"

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {

    const [ filteredBookings, setFilteredBookings ] = useState(bookingInfo)
    const [ startDate, setStartDate ] = useState(undefined)
    const [ endDate, setEndDate ] = useState(undefined)

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
		if (startDate && endDate) {
            setStartDate(startDate)
            setEndDate(endDate)

			filtered = bookingInfo.filter((booking) => {
				const bookingStartDate = parseISO(booking.checkInDate)
				const bookingEndDate = parseISO(booking.checkOutDate)
				return (
					bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
				)
			})
		}
		setFilteredBookings(filtered)
	}    

    useEffect(() => {
        setFilteredBookings(bookingInfo)
        filterBookings(startDate, endDate)
    }, [bookingInfo, startDate, endDate])

    return (
        <section className='p-4'>
            <DateSlider 
                onDateChange={filterBookings} 
                onFilterChange={filterBookings} 
            />
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Room ID</th>
                        <th>Room Type</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Guest Full Name</th>
                        <th>Guest Email</th>
                        <th>Adult</th>
                        <th>Children</th>
                        <th>Total Guest</th>
                        <th>Confirmation Code</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filteredBookings.map((booking) => (
                        <tr key={booking.bookingId}>
                            <td>{booking.bookingId}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.room.roomType}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalNumOfGuest}</td>
                            <td>{booking.bookingConfirmationCode}</td>
                            <td>
                                <button 
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleBookingCancellation(booking.bookingId)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredBookings.length === 0 && <p>No bookings found.</p>}
        </section>
    )
}

export default BookingsTable