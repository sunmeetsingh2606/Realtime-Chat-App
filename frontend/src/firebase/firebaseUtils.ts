import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider,signOut, createUserWithEmailAndPassword, updateProfile, getAuth, signInWithPopup } from 'firebase/auth';

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
      await signInWithPopup(auth, provider).catch(err => { throw err });
    } catch (err){
        console.error(err);
    }
}

//sign up -> register
export const signUpWithEmailAndPassword = async (email: string, password: string, displayName: string) => {

    //this doesnt create users display name so we have to manually add one
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user.user, {
        displayName: displayName
    })
}

export const signout = async () => { 
    await signOut(auth);
    window.location.reload(); 
}

