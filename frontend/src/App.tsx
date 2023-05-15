import ChatLayout from './layouts/chatLayout/ChatLayout';
import { useEffect } from 'react';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { Routes, Route } from 'react-router-dom';
import { addUser } from './Redux/User/userSlice';
import { useDispatch } from 'react-redux';



function App() {

    const dispatch = useDispatch();

    useEffect(() => {

        authenticateToken();
        return () => { }
    }, [])

    const authenticateToken = async () => {

        const token = localStorage.getItem('token')

        if (token) {
            const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}/auth/authenticate/?token=${token}`);
            const data = await res.json();
            
            console.log({ data });

            if (data.data.user) {
                dispatch(addUser({ user: data.data.user }));
            }
        }


    }

    return (
        <>
            <Routes>
                <Route path='/' element={<ChatLayout />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
            </Routes>
        </>
    );
}

export default App;
