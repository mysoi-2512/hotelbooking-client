import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Parallax = () => {
  return (
    <div className='d-flex align-items-center parallax mb-5'>
        <Container className='text-center px-5 py-5 justify-content-center'>
            <div className='animated-texts bounceIn'>
                <h1>Experience the best hospitality in town</h1>
            </div>
            <h3>We offer the best services for all your needs</h3>
            <Link to={"/browse-all-rooms"}>
              <button className='btn btn-hotel btn-md mt-3'>Browse All Rooms</button>
            </Link>
        </Container>
    </div>
  )
}

export default Parallax