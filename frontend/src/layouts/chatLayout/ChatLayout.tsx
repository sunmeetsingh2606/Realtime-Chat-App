import ChatFooter from '../../components/chatLayout/chatFooter/ChatFooter';
import ChatHeader from '../../components/chatLayout/chatHeader/ChatHeader';
import ChatMessages from '../../components/chatLayout/chatMessages/ChatMessages';
import ChatsList from '../../components/chatLayout/chatsList/ChatsList';
import TextField from '../../components/forms/textField/TextField';
import { IChatListItem } from '../../interfaces/chatListItem';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux/es/exports';
import { IoEllipsisVertical } from 'react-icons/io5';
import { signout } from '../../firebase/firebaseUtils';
import Avatar from 'react-avatar';

const ChatLayout: FC = () => {

    const user = useSelector((state: RootState) => state.user.user)

    const navigate = useNavigate();
    const chats: IChatListItem[] = [
        {
            uid: "user1",
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
            displayName: "John Doe",
            lastMessage: "Hey, how are you doing?",
            isActive: true,
            isOnline: false
        },
        {
            uid: "user2",
            photoURL: "https://avatars.dicebear.com/api/initials/Jane Smith.svg",
            displayName: "Jane Smith",
            lastMessage: "I'll be there in 10 minutes.",
            isActive: false,
            isOnline: true
        },
        {
            uid: "user3",
            photoURL: "https://avatars.dicebear.com/api/initials/Bob Johnson.svg",
            displayName: "Bob Johnson",
            lastMessage: "What's up?",
            isActive: false,
            isOnline: true
        },
        {
            uid: "user4",
            photoURL: "https://avatars.dicebear.com/api/initials/Samantha Lee.svg",
            displayName: "Samantha Lee",
            lastMessage: "Can we meet tomorrow?",
            isActive: false,
            isOnline: false
        },
        {
            uid: "user5",
            photoURL: "https://avatars.dicebear.com/api/initials/Mike Williams.svg",
            displayName: "Mike Williams",
            lastMessage: "See you soon!",
            isActive: false,
            isOnline: true
        }
    ];


    async function handleSignOutClick() {
        // Implement your sign out logic here
        localStorage.clear();
        await signout();
        
    }


    const activeChat = chats[0];

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }


        return () => {

        }
    }, [])


    return (
        <div className="grid grid-cols-12 h-full">
            <div className="col-span-3 flex flex-col gap-2 p-4">
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        {
                            user?.photoURL ?
                                <img src={user?.photoURL} className='w-[50px] h-[50px] rounded-full' alt='avatar' /> :
                                <Avatar name={user?.displayName || ""} className="rounded-full" size="50" />
                        }
                        <span className='text-xl text-slate-200'>{user?.displayName}</span>
                    </div>
                    {/** chatlist dropdown menu */}
                    {/** elements wont take focus unless they are a,input etc or have a tabindex */}
                    <div tabIndex={1} className='group relative cursor-pointer'>
                        <IoEllipsisVertical className='text-slate-300 text-3xl' />
                        <div className='absolute scale-0 transition-all duration-200 -translate-x-2 origin-top-right invisible  group-focus-within:visible group-focus-within:scale-100 top-full right-0 mt-1 bg-primary py-2 w-48 rounded-lg shadow-lg z-10'>
                            <button
                                className='w-full text-left hover:bg-secondary-emphasis px-4 py-2 '
                                onClick={handleSignOutClick}
                            >
                                Sign out
                            </button>
                        </div>
                    </div>


                </div>
                <TextField className="w-full" placeholder="Search" />
                <ChatsList chats={chats} />
            </div>
            <div className="col-span-9 max-h-screen overflow-hidden bg-primary rounded-normal flex flex-col p-4">
                <div className='sticky top-0 right-0 z-10'>
                    <ChatHeader chat={activeChat} />
                </div>
                <ChatMessages className="flex-grow max-h-full overflow-y-scroll pr-2 flex flex-col justify-end gap-2 py-4" />
                <div className='sticky bottom-0 z-10'>
                <ChatFooter />
                </div>
            </div>
        </div>
    );
};

export default ChatLayout;
