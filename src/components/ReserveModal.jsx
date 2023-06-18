import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
const ReserveModal = ({room}) => {
    const {user} = useContext(AuthContext)
    const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target;
        const roomType = form.roomType.value;
        const obj = {bookedBy : user.displayName , region:room.region , roomId : room._id , RoomName : room.roomName , image : room.roomImage , price: room.price , roomType , Owner: room.OwnerName }
        console.log(obj)

        axios.post('http://localhost:5000/reserve' , obj)
        .then(data=>{
            if(data.data.insertedId){
                toast.success('reserved room')
            }
        })
    }
    return (
        <div>
            <input type="checkbox" id={room._id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className="font-bold text-lg">{room.roomName}</h3>
                    <p className="pt-2 font-semibold">Select Your Room</p>

                    <form onSubmit={handleSubmit} className='mt-3 flex flex-col'>
                        <select required name="roomType">
                            <option defaultValue disabled>Select Your Room</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="2bed">2 Bed</option>
                            <option value="penthouse">Penthouse</option>
                        </select>
                        <input type="submit" value="Reserve Now!" className='bg-blue-600 px-3 py-2 text-white text-xl  mt-6'/>
                    </form>
                    <div className="modal-action absolute right-1 -top-5">
                        <label htmlFor={room._id} className="bg-black text-white rounded-full h-5 flex justify-center items-center w-5">X</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReserveModal;