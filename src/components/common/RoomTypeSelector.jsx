import React, { useState, useEffect } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {

    const [ roomTypes, setroomTypes ] = useState([""]);
    const [ showNewRoomTypeInput, setshowNewRoomTypeInput ] = useState(false);
    const [ newRoomType, setnewRoomType ] = useState("");

    useEffect(() => {
        getRoomTypes().then((data) => {
            setroomTypes(data);
        })
    }, []);

    const handleNewRoomTypeInputChange = (e) => {
        setnewRoomType(e.target.value);
    }
    
    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setroomTypes([...roomTypes, newRoomType]);
            setnewRoomType("");
            setshowNewRoomTypeInput(false);
        }
    }

  return (
    <>
        {roomTypes.length > 0 && (
            <div>
                <select 
                    name="roomType" 
                    className='form-select'
                    id="roomType"
                    value={newRoom.roomType}
                    onChange={(e) => {
                        if (e.target.value == "Add new") {
                            setshowNewRoomTypeInput(true)
                        } else {
                            setshowNewRoomTypeInput(false)
                            handleRoomInputChange(e)
                        }
                    }}
                >
                    <option value="" defaultValue> Select a room type </option>
                    <option value={"Add new"}> Add new </option>
                    {roomTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}    
                </select>
                {showNewRoomTypeInput && (
                    <div className='mt-2'>
                        <div className='input-group'>
                            <input 
                                className='form-control'
                                type='text'
                                placeholder='Enter a new room type'
                                onChange={handleNewRoomTypeInputChange}
                            />
                            <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>
                                Add
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}
    </>
  )
}

export default RoomTypeSelector