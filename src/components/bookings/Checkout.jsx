import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import RoomCarousel from '../common/RoomCarousel'
import { useParams } from 'react-router-dom'
import { getRoomById } from '../utils/ApiFunctions'
import { FaCar, FaParking, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from 'react-icons/fa'

const Checkout = () => {

  const [ errorMessage, setErrorMessage ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ roomInfo, setRoomInfo ] = useState({
    photo: "",
    roomType: "",
    roomPrice: ""
  })

  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoomInfo = async (roomId) => {
      try {
        const response = await getRoomById(roomId)
        setRoomInfo(response)
        setIsLoading(false)
      } catch (error) {
        setErrorMessage(error.message)
        setIsLoading(false)
      }
    }
    fetchRoomInfo(roomId)
  }, [roomId])

  return (
    <div>
        <section className='container'>
          <div className='row flex-column flex-md-row align-items-start'>
            <div className='col-md-4 mt-5 mb-5'>
              {isLoading ? (
                <p>Loading room information</p>
              ) : errorMessage? (
                <p>{errorMessage}</p>
              ) : (
                <div className='room-info'>
                  <img 
                    src={`data:image/png;base64, ${roomInfo.photo}`} 
                    alt="Room photo" 
                    style={{ height: "auto", width: "100%" }}
                    className='mb-2'/>
                  <table className='table table-bordered'>
                    <tbody>
                      <tr>
                        <th>Room Type</th>
                        <td>{roomInfo.roomType}</td>
                      </tr>
                      <tr>
                        <th>Room Price</th>
                        <td>${roomInfo.roomPrice}/night</td>
                      </tr>
                      <tr>
                        <th>Room Service</th>
                        <td>
                          <ul>
                            <li>
                              <FaWifi /> Wifi
                            </li>
                            <li>
                              <FaTv /> Netflix Premium
                            </li>
                            <li>
                              <FaUtensils /> Breakfast
                            </li>
                            <li>
                              <FaWineGlassAlt /> Mini bar refreshment
                            </li>
                            <li>
                              <FaCar /> Car Service
                            </li>
                            <li>
                              <FaParking /> Parking Space
                            </li>
                          </ul>
                        </td>
                      </tr>                      
                    </tbody>
                  </table>
                </div>
              )}              
            </div>
            <div className='col-md-8'>
                <BookingForm />
            </div>
          </div>
        </section>
        <div className='container'>
          <RoomCarousel />
        </div>
    </div>
  )
}

export default Checkout