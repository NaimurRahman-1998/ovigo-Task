import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const EditRoomModal = ({room ,refetch}) => {
    const {user} =useContext(AuthContext)
    const handleSubmit = (e) =>{
        e.preventDefault();
        const price = parseFloat(e.target.price.value)
        
        const obj = {price :price}
        console.log(obj)

        axios.put(`http://localhost:5000/rooms/${room._id}` , obj)
        .then(data=>{
            if(data.data.modifiedCount >0 ){
                toast.success('updated')
                refetch();
            }
        })
    }
    return (
        <div>
            <input type="checkbox" id={room._id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{room.roomName}</h3>
                    <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='class' className='block mb-2 text-sm'>
                                Room Name
                            </label>
                            <input
                                type='text'
                                name='roomName'
                                id='class'
                                required
                                defaultValue={room.roomName}
                                disabled
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-text-lime-400 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Region Name
                            </label>
                            <select name="region" className='px-3 py-2 border rounded-md border-gray-300 focus:outline-text-lime-400 bg-gray-200 text-gray-900'>
                                <option value="madrid">madrid</option>
                                <option value="london">london</option>
                                <option value="austin">austin</option>
                            </select>
                            <label htmlFor='seats' className='block mb-2 text-sm'>
                                Owner Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                required
                                disabled
                                value={user?.displayName || "null"}
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-text-lime-400 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            <label htmlFor='seats' className='block mb-2 text-sm'>
                                Owner Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                disabled
                                value={user?.email || "null"}
                                placeholder='Enter Your image Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-text-lime-400 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            
                            <label htmlFor='price' className='block mb-2 text-sm'>
                                Price
                            </label>
                            <input
                                type='number'
                                name='price'
                                id='price'
                                required
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-text-lime-400 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-lime-500 hover:bg-lime-600 w-full rounded-md py-3 text-white'
                        >
                            Submit
                        </button>
                    </div>
                </form>
                    <div className="modal-action">
                        <label htmlFor={room._id} className="btn">Close!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRoomModal;