import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const isAdmin = true
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content px-40 py-20 ">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-blue-700 text-white">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="">

                        {
                            isAdmin &&
                            <ul className="menu pt-10 w-80 h-full text-2xl space-y-10 text-white">
                                <li>
                                    <NavLink to='/dashboard/bookings'>
                                        Cancel Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addroom'>
                                        Add Rooms
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/editRoom'>
                                        Edit Rooms
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/users'>
                                        Manage Users
                                    </NavLink>
                                </li>
                            </ul>
                        }

                        <NavLink to={'/'}>Go to Home </NavLink>



                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;