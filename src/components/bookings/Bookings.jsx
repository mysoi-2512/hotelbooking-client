import React, { useEffect, useState } from 'react'
import { getAllBookings, cancelBooking } from '../utils/ApiFunctions'
import Header from "../common/Header"
import BookingsTable from './BookingsTable'

const Bookings = () => {

  const [ bookingInfo, setBookingInfo ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState("")

  useEffect(() => {
    const fetchAllBookingsInfo = async () => {
      try {
        const allBookingsInfo = await getAllBookings()
        setBookingInfo(allBookingsInfo)
        setIsLoading(false)
      } catch (error) {
        setError(error.message)
        setIsLoading(false)
      }
    }
    fetchAllBookingsInfo()
  }, [])

  const handleBookingCancellation = async(bookingId) => {
    try {
      await cancelBooking(bookingId)
      const data = await getAllBookings()
      setBookingInfo(data)      
    } catch (error) {
      setError(error)
    }
  }

  return (
    <section style={{ backgroundColor: "whitesmoke" }} >
      <Header title={"Existing Bookings"}/>
      {error && <div className='text-danger'>{error}</div>}
      {isLoading ? (
        <div>Loading existing bookings</div>
      ) : (
        <BookingsTable 
          bookingInfo={bookingInfo} 
          handleBookingCancellation={handleBookingCancellation} 
        />
      )}
    </section>
  )
}

export default Bookings