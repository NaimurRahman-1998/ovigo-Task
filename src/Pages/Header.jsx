import React from 'react';
import { SlCalender } from 'react-icons/sl';
import { ImMan } from 'react-icons/im';
import { FaBed } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Header = () => {
    const navigate = useNavigate();
    const [region , setRegion] = useState('')
    const [date,setDate] = useState('')
    console.log(region ,date)
    return (
        <div className='bg-blue-700 h-[20rem] text-white pt-16 px-20 relative'>
            <div className=' space-y-5'>
                <h1 className='text-4xl font-bold'>A lifetime of Discounts? Its Genius!</h1>
                <p>get rewards on your travels - unlock instant saving of 10% or more with free lamabooking account</p>
                <button className='bg-blue-500 px-3 py-2 hover:bg-blue-700 rounded-md'>SignUp/Register</button>
            </div>
            <div className='absolute flex items-center justify-around py-4 px-6 left-0 right-0 mx-auto  -bottom-6  w-[70%] bg-white h-16 border-4 border-yellow-500'>
                <form  className='flex gap-16'>
                    <div className='flex gap-3 items-center'>
                        <FaBed className="text-gray-400 text-2xl" />
                        <input
                        onChange={(e)=>setRegion(e.target.value)}
                            name='region'
                            placeholder='Where are you Going?'
                            className='text-gray-800'
                            type="text" />
                    </div>
                    <div className='flex gap-3 items-center'>
                        <input
                            onChange={(e)=> setDate(e.target.value)}
                            name='date'
                            className='text-gray-400'
                            type="date" />
                    </div>
                    <div className='flex gap-3 items-center'>
                        <ImMan className="text-2xl text-gray-400" />
                        <input
                            placeholder='1 adult / 0 children / 1 room'
                            className=' w-56'
                            type="text" />
                    </div>
                    <Link to={`/rooms/asd`} state={{date , region}}><input className='bg-blue-700 text-white px-3 py-2' type="submit" value="Search" /></Link>
                </form>
            </div>
        </div>
    );
};

export default Header;