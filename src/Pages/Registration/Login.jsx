import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-hot-toast';


const Login = () => {
    const [show, setShow] = useState(false)
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(from, { replace: true })
                toast.success('login SuccessFull');

            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                // saveUser(result.user)
                navigate(from, { replace: true });
            })
            .catch((err) => {
                // setLoading(false)
                console.log(err.message);
                toast.error(err.message);
            });
    }


    const handleShow = () => {
        setShow(!show)
    }
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <form className="bg-neutral-300 w-[40%] px-28 py-20" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <h1 className="text-center text-5xl font-bold mb-5">Login Now</h1>
                <div className="flex flex-col">
                    <label>
                        Email
                    </label>
                    <input className="p-2 input" type="email"  {...register("email", { required: true })} />
                </div>

                {/* include validation with required or other standard HTML validation rules */}
                <div className="relative flex flex-col mt-6">
                    <label>
                        Password
                    </label>

                    <input className="p-2 input" type={show ? 'text' : 'password'} {...register("password", { required: true })} />
                    {
                        show ? <AiFillEyeInvisible onClick={handleShow} className="absolute right-5 bottom-3 " size={20} /> : <AiFillEye onClick={handleShow} className="absolute right-5 bottom-3 " size={20} />
                    }
                </div>
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" className="button mx-auto mt-5" />
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16'></div>
                    <p className='px-3 text-sm'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16'></div>
                </div>
                <div
                    onClick={handleGoogleSignIn}
                    className=' group flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                >
                    <FcGoogle className=" group-hover:scale-125 transition duration-300" size={32} />

                    <p className="group-hover:text-blue-500">Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center '>
                    Don't have an account yet?{' '}
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-black text-lime-600'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </form>
        </div>

    );
};

export default Login;