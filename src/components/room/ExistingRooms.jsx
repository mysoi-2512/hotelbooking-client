import { useEffect, useState } from 'react';

import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import RoomPaginator from '../common/RoomPaginator';
import { Col, Row } from "react-bootstrap";
import RoomFilter from '../common/RoomFilter';
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {

    const [rooms, setrooms] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const[roomsPerPage] = useState(8);
    const [isLoading, setisLoading] = useState(false);
    const [filteredRooms, setfilteredRooms] = useState([]);
    const [selectedRoomType, setselectedRoomType] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [errorMessage, seterrorMessage] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const result = await getAllRooms();
            setrooms(result);
            setisLoading(false);
        } catch (error) {
            seterrorMessage(error.message);            
        }
    }

    useEffect(() => {
        if(selectedRoomType === "") {
            setfilteredRooms(rooms)
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setfilteredRooms(filtered);
        }
        setcurrentPage(1);
    }, [rooms, selectedRoomType]);

    const handlePaginationClick = (pageNumber) => {
        setcurrentPage(pageNumber);
    };

    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if (result === "") {
                setsuccessMessage(`Room No ${roomId} was deleted`)
                fetchRooms();
            } else {
                console.error(`Error deleting room: ${result.message}`);
            }
        } catch (error) {
            seterrorMessage(error.message)
        }
        setTimeout(() => {
            setsuccessMessage("");
            seterrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <>
        {isLoading ? (
            <p>Loading existing rooms</p>
        ) : (
            <section className='mt-5 mb-5 container'>
                <div className='d-flex justify-content-between mb-3 mt-5'>
                    <h2>Existing rooms</h2>
                    <Link to={"/add-room"}>
                        <button className='btn btn-hotel' type='button'>Add new room</button>
                    </Link>
                </div>
                <Row>
                    <Col md={6} className='mb-3 mb-md-0'>
                        <RoomFilter data={rooms} setFilteredData={setfilteredRooms} />
                    </Col> 
                </Row>
                <table className='table table-border table-hover'>
                    <thead>
                        <tr className='text-center'>
                            <th>ID</th>
                            <th>Room Types</th>
                            <th>Room Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.map((room) => (
                            <tr key={room.id} className='text-center'>
                                <td>{room.id}</td>
                                <td>{room.roomType}</td>
                                <td>{room.roomPrice}</td>
                                <td className='d-flex flex-row justify-content-center gap-2'>
                                    <Link to={`/edit-room/${room.id}`}>
                                        <span className='btn btn-warning btn-sm'>
                                            <FaEdit />
                                        </span>
                                    </Link>
                                    <button
                                        className='btn btn-danger btn-sm'
                                        onClick={() => handleDelete(room.id)}                
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <RoomPaginator 
                    currentPage={currentPage} 
                    totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)} 
                    onPageChange={handlePaginationClick}
                />                
            </section>
        )}
    </>
  )
}

export default ExistingRooms