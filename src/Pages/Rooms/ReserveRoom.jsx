import React from 'react';
import Navbar from '../Shared/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReserveModal from '../../components/ReserveModal';
const ReserveRoom = () => {
    const params = useParams();
    const id = params.id;
    const [room, setRoom] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5000/rooms/${id}`)
            .then(data => { setRoom(data.data[0]) })
    }, [])
    console.log(room)
    return (
        <div>
            <Navbar></Navbar>
            <div className=' mx-24 mt-10'>
                <div className='flex gap-5'>
                    <img className=' w-[25rem] h-[18rem]' src={room.roomImage} alt="" />
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-3xl font-semibold'>Experience World Class Suits and Penthouse {room.roomName}</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem sequi voluptatibus reiciendis provident quis aspernatur, quaerat ut nihil ab, totam consequuntur amet explicabo assumenda mollitia ullam nostrum dolore blanditiis earum quo? Aliquid praesentium accusamus quaerat, illo maxime animi omnis eos!</p>
                        <label htmlFor={room._id} className="w-36 mt-24 bg-blue-600 px-3 py-2 text-white text-xl font-semibold">Reserve Now</label>
                    </div>
                    <div>
                        <ReserveModal room={room}></ReserveModal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReserveRoom;