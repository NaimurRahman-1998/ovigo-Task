import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBed } from 'react-icons/fa';
import { FaPlaneDeparture } from 'react-icons/fa';
import { FaTaxi } from 'react-icons/fa';
import { BsFillClipboardFill } from 'react-icons/bs';
import { AiFillCar } from 'react-icons/ai';
import { GiParkBench } from 'react-icons/gi';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Header from '../Header';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => console.log(error));
    };




        return (
            <div className='relative'>
                <div className='bg-blue-700 h-[5rem] text-white '>
                    <div className='mx-20 py-4'>
                        <div className='flex items-center justify-between'>
                            <ul className='flex gap-5'>
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => (isActive ? "flex items-center gap-2 px-3 py-2 border-2 rounded-full" : "flex items-center gap-2 px-3 py-2")}
                                    >
                                        <FaBed /> Stays
                                    </NavLink>
                                </li>
                                <li className='flex items-center gap-2 px-3 py-2'>
                                <FaPlaneDeparture /> Flights
                                </li>
                                <li className='flex items-center gap-2 px-3 py-2'>
                                <AiFillCar /> Car Rentals
                                </li>
                                <li className='flex items-center gap-2 px-3 py-2'>
                                <GiParkBench /> Attraction
                                </li>
                                <li className='flex items-center gap-2 px-3 py-2'>
                                <FaTaxi /> Airport Taxis
                                </li>
                                {
                                    user &&
                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            className={({ isActive }) => (isActive ? "flex items-center gap-2 border-2 px-3 py-2 rounded-full" : "flex items-center gap-2 px-3 py-2")}
                                        >
                                            <BsFillClipboardFill /> Dashboard
                                        </NavLink>
                                    </li>
                                }
                            </ul>
                            {
                                user ?
                                    <div className='flex items-center gap-2'><button onClick={handleLogOut} className='px-3 py-2 border-2 rounded-full'>Logout</button> <p>{user?.displayName}</p></div>
                                    :
                                    <Link to='/login'><button className='px-3 py-2 border-2 rounded-full'>Login</button></Link>
                            }

                        </div>    
                    </div>
                </div>
                
            </div>
        );
    };

    export default Navbar;