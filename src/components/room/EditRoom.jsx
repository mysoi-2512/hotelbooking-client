import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { updateRoom, getRoomById } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';

const EditRoom = () => {

  const [ room, setRoom ] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  });
  const [ imagePreview, setimagePreview ] = useState("");
  const [ successMessage, setsuccessMessage ] = useState("");
  const [ errorMessage, seterrorMessage ] = useState("");

  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId)
        setRoom(roomData)
        setimagePreview(roomData.photo)        
      } catch (error) {
        console.log(error);
      }
    }
    fetchRoom();
  }, [roomId])

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setimagePreview(URL.createObjectURL(selectedImage));
  }

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if ( name === "roomPrice" ) {
      if( !isNaN(value) ) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setRoom({ ...room, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        const updatedRoomData = await getRoomById(roomId)
        setRoom(updatedRoomData)
        setimagePreview(updatedRoomData.photo)
        setsuccessMessage("Update room successfully");
        seterrorMessage("")
      } else {
        seterrorMessage("Error updating room")
      }
    } catch (error) {
      console.log(error);
      seterrorMessage(error.message)
    }
    setTimeout(() => {
      setsuccessMessage("");
      seterrorMessage("")
    }, 3000)
  }

  return (
    <>
      <section className='container mt-5 mb-5'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6'>
            <h2 className='mt-5 mb-2'>Edit room</h2>
            {successMessage && (
              <div className='alert alert-success fade show'>{successMessage}</div>
            )}
            {errorMessage && (
              <div className='alert alert-danger fade show'>{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='roomType' className='form-label'> Room Type </label>
                <div>
                  <RoomTypeSelector 
                    handleRoomInputChange={handleRoomInputChange} newRoom={room}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor='roomPrice' className='form-label'> Room Price </label>
                <input 
                  className='form-control'
                  required
                  id='roomPrice'
                  type='number'
                  name='roomPrice'
                  value={room.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              
              <div className='mb-3'>
                <label htmlFor='photo' className='form-label'> Room Photo </label>
                <input 
                  id='photo'
                  name='photo'
                  type='file'
                  className='form-control'
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img 
                    src={`data:image/jpeg;base64,${imagePreview}`}
                    alt='Preview room photo'
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className='mt-3'
                  />
                )}
              </div>

              <div className='d-grid gap-2 d-md-flex mt-2'>
                <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                  Back
                </Link>
                <button type="submit" className="btn btn-outline-warning">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>   
  )
}

export default EditRoom