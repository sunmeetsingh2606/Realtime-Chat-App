import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider,signOut, getAuth, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDvovZEpaTLIPvYhDtBhP8p-m6Ph39lu-A',
    authDomain: 'realtime-chat-applicatio-da86f.firebaseapp.com',
    projectId: 'realtime-chat-applicatio-da86f',
    storageBucket: 'realtime-chat-applicatio-da86f.appspot.com',
    messagingSenderId: '589489737769',
    appId: '1:589489737769:web:c91270eff155f7273a4c38',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const signInwithGoogle = async () => {
    try {
      const userCreds =  await signInWithPopup(auth, provider).catch(err => { throw err });

      if(userCreds.user){
        const user = userCreds.user;
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

        return data;
      }
    } catch (err){
        console.error(err);
    }
}

//sign up -> register

export const signout = async () => { 
    await signOut(auth);
    window.location.reload(); 
}

