import React from 'react';
import MainHeader from '../layout/MainHeader';
import HotelService from '../common/HotelService';
import Parallax from '../common/Parallax';
import RoomCarousel from '../common/RoomCarousel';
import RoomSearch from '../common/RoomSearch';
import { useLocation } from 'react-router-dom';

const Home = () => {

  const location = useLocation()
  const message = location.state && location.state.message
  const currentUser = localStorage.getItem("userId")
  return (
    <section>
        {message && <p className='text-warning text-center'>{message}</p>}
        {currentUser && <h6 className='text-success text-center'>Welcome {currentUser}</h6>}
        <MainHeader />
        <section className='container'>
          <RoomSearch />
          <RoomCarousel />
          <Parallax />       
          <HotelService />
          <RoomCarousel />
          <Parallax />
        </section>
    </section>
  )
}

export default Home