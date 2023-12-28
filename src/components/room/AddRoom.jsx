import React, { useState } from 'react';
import { addRoom } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';
import { Link } from 'react-router-dom';

const AddRoom = () => {

  const [ newRoom, setnewRoom ] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  });
  const [ imagePreview, setimagePreview ] = useState("");
  const [ successMessage, setsuccessMessage ] = useState("");
  const [ errorMessage, seterrorMessage ] = useState("");

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
    setnewRoom({ ...newRoom, [name]: value });
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setnewRoom({ ...newRoom, photo: selectedImage });
    setimagePreview(URL.createObjectURL(selectedImage));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      if (success !== undefined) {
        setsuccessMessage("A new room was successfully saved in database!");
        setnewRoom({ photo: null, roomType: "", roomPrice: "" });
        setimagePreview("");
        seterrorMessage("");        
      } else {
        seterrorMessage("Error adding new room");
      }
    } catch (error) {
      seterrorMessage(error.message);
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
            <h2 className='mt-5 mb-2'>Add a new room</h2>
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
                    handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}
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
                  value={newRoom.roomPrice}
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
                    src={imagePreview} 
                    alt='Preview room photo'
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className='mt-3'
                  />
                )}
              </div>

              <div className='d-grid gap-2 d-md-flex mt-2'>
                <button type="submit" className="btn btn-outline-warning">
                  Save Room
                </button>
                <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                  Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>   
  )
}

export default AddRoom