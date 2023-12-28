import axios from'axios';

export const api = axios.create({
    baseURL : "http://localhost:9192"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization : `Bearer ${token}`
    }
}

/* Add a new room to DB*/
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/add/new-room", formData, {
        headers: getHeader()
    });
    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
}

/* Get all room types from DB */
export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/room/types")
		return response.data
	} catch (error) {
		// throw new Error("Error fetching room types")
        console.log(error);
	}
}

/* Get all rooms from DB */
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

/* Delete room by roomId */
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/room/${roomId}/delete`, {
            headers: getHeader()
        });
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

/* Update room info */
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);
    const response = await api.put(`/rooms/room/${roomId}/update`, formData, {
        headers: getHeader()
    })
    return response;
}

/* Get room by id */
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}

/* Post new booking */
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room: ${error.message}`)
        }
    }
}

/* Get all bookings from DB */
export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings: ${error.message}`)
    }
}

/* Get booking by confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error finding booking: ${error.message}`)
        }
    }
}

/* Delete booking */
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking: ${error.message}`)
    }
}

/* Get all available rooms */
export async function getAllAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return result
}

/* User Registration */
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response)
        } else {
            throw new Error(`User registration error: ${error.message}`)
        }
    }
}

/* User Login */
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

/* Get user info */
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers : getHeader()
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

/* Delete User */
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

/* Get bookings by userId */
export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/booking`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.log("Error fetching bookings: ", error.message)
        throw new Error("Failed to fetch bookings")
    }
}