import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import EditRoomModal from '../../components/EditRoomModal';

const EditRoom = () => {
    const { refetch, data: rooms = [] } = useQuery({
        queryKey: ['rooms'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/rooms`)
            return res.json();
        },
    })
    return (
        <div>
            {
                rooms?.map(room =>
                    <div className='border-2 p-3 flex gap-5 mt-10' key={room?._id}>
                        <img src={room.roomImage} className='w-[22rem] h-[22rem]' alt="" />
                        <div className='flex flex-col space-y-4'>
                            <h1 className='text-blue-700 text-2xl font-semibold '>{room.roomName}</h1>
                            <p>700 feet from center</p>
                            <p className='px-3 text-white w-36 py-2 bg-green-600 rounded-xl'>Free Airport Taxi</p>
                            <p className='font-bold'>Experience World Class Experience</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto exercitationem impedit sequi praesentium. Itaque illo aliquid illum, amet cum blanditiis.</p>
                            <p className='text-green-700 font-bold'>Free Cancelation</p>
                            <p className='text-green-700'>You can cancel Later! So lock in this great price Today</p>
                        </div>
                        <div className='flex flex-col items-end  justify-between'>
                            <p className='flex items-center gap-2'>Excellent <span className='p-2 text-white bg-blue-700'>8.9</span></p>
                            <div className='mt-32'>
                                <p className='text-3xl'>${room.price}</p>
                                <p className='text-gray-600'>includes taxes and fees</p>
                                <label htmlFor={room._id} className="btn btn-accent">Edit Rooms</label>
                            </div>
                            <EditRoomModal refetch={refetch} room={room}></EditRoomModal>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default EditRoom;