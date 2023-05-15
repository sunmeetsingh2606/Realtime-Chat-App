import ChatLayout from './layouts/chatLayout/ChatLayout';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { auth } from './firebase/firebaseUtils';
import { Routes, Route } from 'react-router-dom';
import { addUser } from './Redux/User/userSlice';
import { useDispatch } from 'react-redux';



function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        // listener which listens to user state -> fires every time user  signin/signout
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user){
                //console.log({url: import.meta});
                const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}/auth/loginWithGoogle`, {
                    method: 'POST',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify({
                        photoURL: user.photoURL,
                        displayName: user.displayName,
                        email: user.email,
                        password: '123456',

                    })
                });
                const data = await res.json();
                console.log({res, data})
            }
            dispatch(addUser({ user }));
        })
        //have to unsubscribe, otherwise trouble
        return () => unsubscribe()
    }, [])


    return (
        <>
            <Routes>
                <Route path='/' element={<ChatLayout/>}/>
                <Route path='/login' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
            </Routes>
        </>
    );
}

export default App;
