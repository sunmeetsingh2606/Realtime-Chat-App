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
                    <div className="form-control">
                        <label className="input-group">
                            <span><HiOutlineMail /></span>
                            <TextField 
                            onChange={handleEmailChange}
                            type="email" 
                            autoComplete="email"
                            placeholder="JohnDoe@email.com" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input-group">
                            <span><RiLockPasswordLine /></span>
                            <TextField 
                            onChange={handlePasswordChange}
                            type="password"
                            autoComplete="current-password"
                            placeholder="Password" />
                        </label>
                    </div>
                    <div className="text-sm">Don't have an Account?
                        <span className="underline cursor-pointer hover:font-bold">
                            <Link to='/signUp'>Sign Up</Link>
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 justify-between items-center mb-4">
                        <PrimaryButton
                            type="submit"
                        >
                            Sign In
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={() => handleSignInWithGoogle()}
                            type="button"
                            className="btn-secondary flex gap-3 items-center justify-center"
                        >
                            <FaGoogle /> Sign in With Google
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;