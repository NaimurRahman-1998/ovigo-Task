import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';

const ManageUsers = () => {
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`)
            return res.json();
        },
    })

    console.log(users)


    const handleAdmin =(id)=>{
        axios.patch(`http://localhost:5000/users/admin/${id}`)
        .then(data=>{
            toast('User is now Admin')
            refetch();
        })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar items-center gap-2">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.image}/>
                                                
                                            </div>
                                            {user.name}
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td><button onClick={()=>handleAdmin(user._id)} className='btn btn-xs btn-info'>Make Admin</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;