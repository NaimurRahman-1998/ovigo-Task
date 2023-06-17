import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBed} from 'react-icons/fa';
import { FaPlaneDeparture} from 'react-icons/fa';
import { FaTaxi} from 'react-icons/fa';
import { AiFillCar} from 'react-icons/ai';
import { GiParkBench} from 'react-icons/gi';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
const Navbar = () => {
    const {user , logOut} = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => console.log(error));
    };
    return (
        <div className='bg-blue-700 h-[20rem] text-white '>
            <div className='mx-20 py-4'>
                <div className='flex items-center justify-between'>
                    <ul className='flex gap-5'>
                        <li>
                            <NavLink
                                to="/stays"
                                className={({ isActive }) => (isActive ? "flex items-center gap-2 px-3 py-2 border-2 rounded-full" : "flex items-center gap-2 px-3 py-2")}
                            >
                            <FaBed/> Stays
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/asd"
                                className={({ isActive }) => (isActive ? "flex items-center gap-2 border-2 px-3 py-2 rounded-full" : "flex items-center gap-2 px-3 py-2")}
                            >
                                <FaPlaneDeparture/> Flights
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/wqw"
                                className={({ isActive }) => (isActive ? "flex items-center gap-2 border-2 px-3 py-2 rounded-full" : "flex items-center gap-2 px-3 py-2")}
                            >
                                <AiFillCar/> Car Rentals
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/feef"
                                className={({ isActive }) => (isActive ? "flex items-center gap-2 border-2 px-3 py-2 rounded-full" : "flex items-center gap-2 px-3 py-2")}
                            >
                                <GiParkBench/> Attraction
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/feefasd"
                                className={({ isActive }) => (isActive ? "flex items-center gap-2 border-2 px-3 py-2 rounded-full" : "flex items-center gap-2 px-3 py-2")}
                            >
                                <FaTaxi/> Airport Taxis
                            </NavLink>
                        </li>
                    </ul>
                    {
                        user? 
                        <div className='flex items-center gap-2'><button onClick={handleLogOut} className='px-3 py-2 border-2 rounded-full'>Logout</button> <p>{user?.displayName}</p></div>
                        :
                        <Link to='/login'><button className='px-3 py-2 border-2 rounded-full'>Login</button></Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;