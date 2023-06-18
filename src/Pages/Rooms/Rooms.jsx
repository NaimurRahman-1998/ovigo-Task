import React from 'react';
import Navbar from '../Shared/Navbar';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Rooms = () => {
    const params = useParams();
    const location  = useLocation()
    console.log(location.state)
    const [searchText, setSearchText] = useState(location.state.region)
    const [rooms, setRooms] = useState([])
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const region = form.region.value
        console.log(region)
        console.log(searchText)
        fetch(`http://localhost:5000/allRoomsByName/${searchText}`)
            .then(res => res.json())
            .then(data => setRooms(data))
    }


    useEffect(()=>{
        axios.get('http://localhost:5000/rooms')
        .then(data=>{
            console.log(data.data)
            setRooms(data.data)
        })
    },[])
    return (
        <div >
            <Navbar></Navbar>
            <div className='grid grid-cols-4 gap-5 mx-24 mt-10'>
                <div className='bg-yellow-500 h-[30rem] col-span-1 px-5 py-8 rounded-lg'>
                    <h1 className='text-xl font-bold'>Search</h1>
                    <form onSubmit={handleSubmit} className='mt-5 flex flex-col'>
                        <div className='flex flex-col'>
                            <label>Destination</label>
                            <input onChange={(e) => setSearchText(e.target.value)} name='region' type="text" defaultValue={searchText} />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label>Check-In-Date</label>
                            <input date type="date" placeholder='Search Your Destination' />
                        </div>
                        <div className='flex flex-col gap-2 mt-2'>
                            <label>Options</label>
                            <div className='flex items-center mx-2  justify-between'>
                                <label>Min-price</label>
                                <input className='w-12 h-6' type="number" />
                            </div>
                            <div className='flex items-center mx-2 justify-between'>
                                <label>max-price</label>
                                <input className='w-12 h-6' type="number" />
                            </div>
                            <div className='flex items-center mx-2 justify-between'>
                                <label>Adult</label>
                                <input className='w-12 h-6' type="number" />
                            </div>
                        </div>
                        <input type="submit" value="Search" className='mt-3 px-3 py-2 bg-blue-700 text-white' />
                    </form>
                </div>
                <div className=' col-span-3'>
                    <div className='space-y-4'>
                        {
                            rooms?.map(room =>
                                <div className='border-2 p-3 flex gap-5' key={room?._id}>
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
                                    <div className='flex flex-col items-end justify-between'>
                                        <p className='flex items-center gap-2'>Excellent <span className='p-2 text-white bg-blue-700'>8.9</span></p>
                                        <div className=''>
                                            <p className='text-3xl'>${room.price}</p>
                                            <p className='text-gray-600'>includes taxes and fees</p>
                                            <Link to={`/reserve/${room._id}`}><button className='px-3 py-2  bg-blue-700 text-white font-semibold text-xl'>See Availability</button></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rooms;