import { ChangeEvent, useState } from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import PrimaryButton from "../components/buttons/PrimaryButton";
import TextField from "../components/forms/textField/TextField";
import { Link } from 'react-router-dom';

interface formDataType {
    displayName: string,
    email: string,
    password: string,
    confirmPassword: string,
}


function SignUp() {

    const [formData, setFormData] = useState<formDataType>({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async () => {

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
                    <div className="">
                        <label htmlFor="email" className="sr-only">
                            Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUserAlt className="h-4 w-4 text-gray-500" />
                            </div>
                            <TextField
                                id='name'
                                name='displayName'
                                onChange={handleChange}
                                placeholder='Your Full Name'
                                value={formData.displayName}
                                type='text'
                                required
                                className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="password" className="sr-only">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiOutlineMail className="h-5 w-5 text-gray-500" />
                            </div>
                            <TextField
                                id='email'
                                name='email'
                                placeholder='john@gmail.com'
                                onChange={handleChange}
                                value={formData.email}
                                type='email'
                                required
                                className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                id='password'
                                name='password'
                                placeholder='password'
                                onChange={handleChange}
                                value={formData.password}
                                type='password'
                                required
                                className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                id='password'
                                name='confirmPassword'
                                placeholder='confirm password'
                                onChange={handleChange}
                                value={formData.confirmPassword}
                                type='password'
                                required
                                className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="text-sm">Already Have an Account?
                        <span className="underline cursor-pointer hover:font-bold">
                            <Link to='/login'>Login</Link>
                        </span>
                    </div>
                    <div className="flex flex-col gap-3 justify-between items-center mb-4">
                        <PrimaryButton
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Account
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp