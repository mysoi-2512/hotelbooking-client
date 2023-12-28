import {useState} from 'react'

const RoomFilter = ({ data, setFilteredData }) => {

    const [ filter, setfilter ] = useState("");

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;
        setfilter(selectedRoomType);
        const filteredRooms = data.filter((room) => room.roomType.toLowerCase()
                                                        .includes(selectedRoomType.toLowerCase()));
        setFilteredData(filteredRooms);
    }

    const clearFilter = () => {
        setfilter("");
        setFilteredData(data);
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  return (
    <div className='input-group mb-3'>
        <span className='input-group-text' id='room-type-filter'>
            Filter rooms by type
        </span>
        <select
            className='form-select'
            value={filter}
            onChange={handleSelectChange}
        >
            <option value={""} defaultValue>Select a room type to filter ...</option>
            {roomTypes.map((type, index) => (
                <option key={index} value={String(type)}>
                    {String(type)}
                </option>
            ))}
        </select>
        <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear filter</button>
    </div>
  )
}

export default RoomFilter