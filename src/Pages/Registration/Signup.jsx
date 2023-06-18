import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { saveUser } from "../../api/auth";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cpError, setCpError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [photo, setPhoto] = useState("");
    const navigate = useNavigate();
    const { createUser, updateUserProfile, signInWithGoogle, logOut } =
        useContext(AuthContext);

        console.log(password,confirmPassword)
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        if (emailError) {
            e.target.email.focus();
            return;
        } else if (passwordError) {
            e.target.password.focus();
            return;
        } else if (password !==confirmPassword) {
            e.target.cPassword.focus();
            toast.error("password Doesn't match")
            return
        }
        console.log(email, photo ,password,confirmPassword )

        createUser(email, password)
            .then((userCredential) => {
                // Signed in 
                setErrorMessage("");
                const user = userCredential.user;
                updateUserProfile(name, photo)
                    .then(() => {
                        // Profile updated!
                        // ...
                        setErrorMessage("");
                        toast.success('user Created')
                        saveUser(userCredential.user)
                        logOut()
                    }).catch((error) => {
                        // An error occurred
                        // ...
                        setErrorMessage(error.message);
                    });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
                // ..
            });

        errorMessage || navigate("/login");
    };


    const handleEmail = (e) => {
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const input = e.target.value;
        setEmail(input);
        if (!emailRegex.test(input)) {
            setEmailError("Please provide a valid email");
        } else {
            setEmailError("");
        }
    };

    const handlePassword = (e) => {
        const input = e.target.value;
        setPassword(input);
        if (input.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
        } else if (!/[@$!%*?&]/.test(input)) {
            setPasswordError("Password must contain at least one Special Character");
        } else if (!/[A-Z]/.test(input)) {
            setPasswordError("Password must contain at least one uppercase letter");
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPassword =(e)=>{
        const input = e.target.value;
        setConfirmPassword(input)
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                saveUser(result.user)
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setLoading(false)
                console.log(err.message);
                toast.success(err.message);
            });
    };
    return (
        <div className="flex gap-5 justify-center items-center h-[100vh]">
            <form onSubmit={handleSubmit} className="bg-neutral-200 w-[40%] px-28 py-16">
                <h1 className="text-center text-5xl font-bold mb-5">Please Register!</h1>
                <div className="flex flex-col">
                    <label className="input-txt">Name</label>
                    <input
                        className="input"
                        type="text"
                        name="name"
                        required
                        placeholder="Type Your Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="input-txt">Email</label>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        required
                        placeholder="Your Email"
                        onChange={handleEmail}
                    />
                    {emailError && (
                        <span className="text-red-500 py-2 text-sm ">
                            {emailError}
                        </span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="input-txt">Password</label>
                    <input
                        className="input"
                        type="text"
                        name="password"
                        required
                        placeholder="Your Password"
                        onChange={handlePassword}
                    />
                    {passwordError && (
                        <span className="text-red-500 py-2 text-sm">
                            {passwordError}
                        </span>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="input-txt">Confirm Password</label>
                    <input
                        className="input"
                        type="text"
                        name="cPassword"
                        required
                        placeholder="Your Password"
                        onChange={handleConfirmPassword}
                    />
                    {cpError && (
                        <span className="text-red-500 py-2 text-sm">
                            {cpError}
                        </span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="input-txt">Photo URL</label>
                    <input
                        className="input"
                        type="text"
                        name="photo"
                        required
                        onChange={(e) => setPhoto(e.target.value)}
                    />
                    {errorMessage && (
                        <span className="text-red-500 py-2 text-sm">
                            {errorMessage}
                        </span>
                    )}
                </div>

                <input
                    className="button mt-6"
                    type="submit"
                    value="Register"
                />
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 "></div>
                    <p className="px-3 text-sm ">
                        Login with social accounts
                    </p>
                    <div className="flex-1 h-px sm:w-16 "></div>
                </div>
                <div
                    onClick={handleGoogleSignIn}
                    className=" text-lg group flex justify-center items-center space-x-2 border m-3 p-2 cursor-pointer"
                >
                    <FcGoogle className=" group-hover:scale-125 transition duration-300" size={32} />

                    <p className="group-hover:text-blue-500">Continue with Google</p>
                </div>
                <p className="px-6 text-sm text-center text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="hover:underline hover:text-rose-500 text-gray-600"
                    >
                        Login
                    </Link>
                </p>
            </form>


        </div>
    );
};

export default SignUp;