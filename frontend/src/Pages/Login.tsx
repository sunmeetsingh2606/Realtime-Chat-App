import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { signInwithGoogle } from "../firebase/firebaseUtils";
import PrimaryButton from "../components/buttons/PrimaryButton";
import TextField from "../components/forms/textField/TextField";
import { Link } from 'react-router-dom';
import { RootState } from "../Redux/store";
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { login } from "../api/signInAndSignUp";
import { useDispatch } from "react-redux/es/exports";
import { addUser } from "../Redux/User/userSlice";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {

        if (user) {
            navigate('/');
        }
        return () => {

        }
    }, [user])
    

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await login(email, password);
        alert(res.msg);

        if(res.data.user){
            dispatch(addUser({ user: res.data.user}))
            localStorage.setItem('token',res.data.token);
        }
    };


    const handleSignInWithGoogle = async () => {
        const data = await signInwithGoogle();
        localStorage.setItem("token", data.data.token);
        dispatch(addUser({user: data.data.user}));
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiOutlineMail className="h-5 w-5 text-gray-500" />
                            </div>
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <RiLockPasswordLine className="h-5 w-5 text-gray-500" />
                            </div>
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    <div className="text-sm">Don't have an Account?
                        <span className="underline cursor-pointer hover:font-bold">
                            <Link to='/signUp'>Sign Up</Link>
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 justify-between items-center mb-4">
                        <PrimaryButton
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={() => handleSignInWithGoogle()}
                            type="button"
                            className="flex gap-3 items-center justify-center w-full bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                            <FaGoogle /> Sign in With Google
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;