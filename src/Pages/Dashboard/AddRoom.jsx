import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { addRoom } from '../../api/classes';
import { toast } from 'react-hot-toast';

const AddRoom = () => {

    const { user } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault();
        const roomName = e.target.roomName.value
        const roomImage = e.target.roomImage.value
        const region = e.target.region.value
        const price = parseFloat(e.target.price.value)
        const added = { ownerName: user?.displayName, ownerEmail: user?.email, roomName, roomImage, region, price: price, }
        console.log(added)

        addRoom(added)
            .then(data => {
                console.log(data)
                toast.success("added a room Successfully")
            })

    }
    return (
        <div className='min-w-full'>
            <div className='flex flex-col w-full p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Add A Room</h1>
                    <p className='text-sm text-gray-400'>
                        Add Rooms to page
                    </p>
                </div>
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
                                placeholder='Enter Your class Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-text-lime-400 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Room Photo
                            </label>
                            <input
                                type='text'
                                name='roomImage'
                                id='image'
                                required
                                placeholder='Enter Your image Here'
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
            </div>
        </div>
    );
};

export default AddRoom;