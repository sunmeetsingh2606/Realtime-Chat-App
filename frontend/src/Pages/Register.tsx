import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import PrimaryButton from "../components/buttons/PrimaryButton";
import TextField from "../components/forms/textField/TextField";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/signInAndSignUp';
interface formDataType {
    displayName: string,
    email: string,
    password: string,
    confirmPassword: string,
}


function Register() {

    const user = useSelector((state:RootState) => state.user.user);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<formDataType>({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {

        if(user){
            navigate('/')
        }

    },[user])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword) {
            alert("Passwords dont match");
            return
        }

        const res = await register(formData);

        alert(res.msg);

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-2xl font-bold text-white mb-4">Sign Up</h1>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="input-group">
                        <span><FaUserAlt /></span>
                        <TextField
                            onChange={handleChange}
                            type="text"
                            name='displayName' 
                            placeholder="John Doe" />
                    </label>
                </div>
                <div className="form-control">
                        <label className="input-group">
                            <span><HiOutlineMail /></span>
                            <TextField 
                            onChange={handleChange}
                            type="email" 
                            name='email'
                            placeholder="JohnDoe@email.com" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input-group">
                            <span><RiLockPasswordLine /> </span>
                            <TextField 
                            onChange={handleChange}
                            type="password" 
                            name='password'
                            placeholder="Password" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input-group">
                            <span><RiLockPasswordLine /> </span>
                            <TextField 
                            onChange={handleChange}
                            type="password" 
                            name='confirmPassword'
                            placeholder="Confirm Password" />
                        </label>
                    </div>
                    <div className="text-sm">Already Have an Account?
                        <span className="underline cursor-pointer hover:font-bold">
                            <Link to='/login'>Login</Link>
                        </span>
                    </div>
                    
                    <div className="flex flex-col gap-3 justify-between items-center mb-4">
                        <PrimaryButton
                            type="submit"
                        >
                            Create Account
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register