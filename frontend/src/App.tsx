import { initializeApp } from 'firebase/app';
import ChatLayout from './layouts/chatLayout/ChatLayout';

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

function App() {
    return (
        <>
            <ChatLayout />
        </>
    );
}

export default App;
