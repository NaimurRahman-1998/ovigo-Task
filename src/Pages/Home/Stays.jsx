import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Stays = () => {
    const { loading } = useContext(AuthContext)
    const { refetch, data: regions = [] } = useQuery({
        queryKey: ['regions',],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/regions`)
            return res.data;
        },
    })
    console.log(regions)
    return (
        <div className='mt-20 mx-20 h-[100vh]'>
            <div className='grid grid-cols-3'>
                {
                    regions.map(region =>
                        <div className='relative' key={region._id}>
                            <img src={region.regionImage} className='w-[95%] h-[20rem] rounded-xl' alt="" />
                            <div className='text-white bg-black bg-opacity-20 absolute bottom-14 ml-10'>
                                <h2 className='text-6xl font-bold'>{region.regionName}</h2>
                                <p className='text-3xl font-bold'>Available Properties : {region.properties}</p>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Stays;