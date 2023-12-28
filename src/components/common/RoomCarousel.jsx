import React, { useEffect, useState } from 'react';
import { getAllRooms } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';
import { Container, Carousel, Row, Col, Card } from 'react-bootstrap';

const RoomCarousel = () => {

    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "", photo: ""}]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then((data) => {
            setRooms(data);
            setIsLoading(false);
        }).catch((error) => {
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div className='mt-5'>Loading rooms ...</div>
    }

    if (errorMessage) {
        return <div className='mt-5 text-danger mb-5'>Error: {errorMessage}</div>
    }

    return (
        <section className='bg-light mt-5 mb-5 shadow'>
            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                            {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                <Col key={room.id} className='mb-4 mt-4' xs={12} md={6} lg={3}>
                                    <Card>
                                        <Card.Img
                                            variant='top'
                                            src={`data:image/png;base64, ${room.photo}`}
                                            alt='Room photo'
                                            className='w-100'
                                            style={{ height: "200px"}}
                                        />
                                        <Card.Body>
                                            <Card.Title className='hotel-color'>{room.roomType}</Card.Title>
                                            <Card.Title className='room-price'>${room.roomPrice}/night</Card.Title>
                                            <div className='flex-shirnk-0'>
                                                <Link to={`/book-room/${room.id}`} className='btn btn-sm btn-hotel'>Book Now</Link>
                                            </div>
                                        </Card.Body>                          
                                    </Card>                                
                                </Col>
                            ))} 
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    )
}

export default RoomCarousel