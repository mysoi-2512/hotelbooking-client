import React, { useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import RoomCard from '../room/RoomCard'
import RoomPaginator from './RoomPaginator'

const RoomSearchResult = ({ results, onClearSearch }) => {

    const [ currentPage, setcurrentPage ] = useState(1)
    const resultPerPage = 3
    const totalResults = results.length
    const totalPages = Math.ceil(totalResults / resultPerPage)

    const handlePageChange = (pageNumber) => {
        setcurrentPage(pageNumber)
    }

    const startIndex = (currentPage - 1) * resultPerPage
    const endIndex = startIndex + resultPerPage
    const paginatedResult = results.slice(startIndex, endIndex)

    return (
        <>
            {results.length > 0 ? (
                <>
                    <h3 className='text-center mt-5'>Search Result</h3>
                    <Row>
                        {paginatedResult.map((room) => (
                            <RoomCard key={room.id} room={room}/>
                        ))}
                    </Row>
                    <Row>
                        {totalResults > resultPerPage && (
                            <RoomPaginator 
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </Row>
                    <Button
                        variant="secondary"
                        onClick={onClearSearch}
                    >
                        Clear Search
                    </Button>
                </>
            ) : (
               <p></p> 
            )}  
                      
        </>
    )
}

export default RoomSearchResult