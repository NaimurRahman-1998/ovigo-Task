import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
const CancelBookings = () => {
    const { refetch, data: bookings = [] } = useQuery({
        queryKey: ['reserve'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/reserve`)
            return res.json();
        },
    })
    console.log(bookings)


    const handleCancel = (id) =>{
        console.log(id)
        confirm('Sure Want to Cancel Booking?')
        if(confirm){
            axios.delete(`http://localhost:5000/reserve/${id}`)
            .then(data=>{
                if(data.data.deletedCount > 0) {
                    toast.success('deleted')
                    refetch()
                }
            })
        }
    }
    return (
        <div>
            <h1 className='text-center font-semibold text-2xl'>All The Bookings</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Booked By</th>
                            <th>Room Name</th>
                            <th>Room Type</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) =>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{booking.bookedBy}</td>
                                    <td>{booking.RoomName}</td>
                                    <td>{booking.roomType}</td>
                                    <td>$ {booking.price}</td>
                                    <td><button onClick={()=>handleCancel(booking._id)} className='btn btn-xs btn-error' >Cancel</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CancelBookings;