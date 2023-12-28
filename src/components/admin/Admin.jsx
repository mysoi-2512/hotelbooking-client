import React from 'react';
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className='container mt-5'>
        <h2>Welcome to Admin Panel</h2>
        <hr />
        <Link to={"/existing-rooms"}>
          <button className='btn btn-hotel btn-sm col'>Manage Rooms</button>
        </Link>
        <Link to={"/existing-bookings"}>
          <button className='btn btn-success btn-sm'>Manage Bookings</button>
        </Link>
    </section>
  )
}

export default Admin