import ChatFooter from '../../components/chatLayout/chatFooter/ChatFooter';
import ChatHeader from '../../components/chatLayout/chatHeader/ChatHeader';
import ChatMessages from '../../components/chatLayout/chatMessages/ChatMessages';
import ChatsList from '../../components/chatLayout/chatsList/ChatsList';
import TextField from '../../components/forms/textField/TextField';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux/es/exports';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoEllipsisVertical } from 'react-icons/io5';
import { signout } from '../../firebase/firebaseUtils';
import { GoSignOut } from 'react-icons/go';
import { HiUserGroup } from 'react-icons/hi';
import Avatar from 'react-avatar';
import { createNewChatRoom, fetchUsers, findAllChatRooms } from '../../api/chat';
import { IChatroom } from '../../interfaces/chatRoom';
import Modal from '../../components/Modal/Modal';
import { User } from '../../interfaces/User';
import classNames from 'classnames';
import Spinner from '../../components/Spinner/Spinner';


const ChatLayout: FC = () => {

    const user = useSelector((state: RootState) => state.user.user)
    const [chatrooms, setChatRooms] = useState<IChatroom[]>();
    const [activeChat, setActiveChat] = useState<IChatroom>();
    const [allUsers, setAllUsers] = useState<User[]>()
    const [selectedUser, setSelectedUser] = useState<User>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSignOutClick() {
        // Implement your sign out logic here
        localStorage.clear();
        await signout();
        
    }


    useEffect(() => {

        if (!user) {
            navigate('/login');
        }
        fetchAllChatRooms();
        return () => {

        }
    }, [])

    const fetchAllChatRooms = async () => {
        const token = localStorage.getItem('token');
        if(token){
            const res = await findAllChatRooms(token);
            setChatRooms(res.data);
        }
    }

    const changeActiveChat = (chat:IChatroom) => {
        setActiveChat(chat);
    }


    const fetchAllusers = async() => {
        setLoading(true);
        const data = await fetchUsers();
        setAllUsers(data.data);
        setLoading(false);
    }

    const newChatRoom = async () => {
        if(!selectedUser) {
            alert('user not selected')
            return
        }

        const data = await createNewChatRoom(selectedUser._id);
        alert(`${data.msg}`);
    }

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
                    <div className='dropdown dropdown-end'>
                        <IoEllipsisVertical tabIndex={0} className='text-slate-300 text-3xl cursor-pointer' />
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <label 
                                onClick={() => fetchAllusers()}
                                htmlFor='new-chat-modal' 
                                className='flex items-center justify-start'>
                                    <AiOutlinePlus size={25} />
                                    New Chat
                                </label>
                            </li>
                            <li>
                                <label htmlFor='group-chat-modal' className='flex items-center justify-start'>
                                    <HiUserGroup size={25} />
                                    Group Chat
                                </label>
                            </li>
                            <li>
                                <button 
                                onClick={handleSignOutClick}
                                className='flex items-center justify-start'>
                                    <GoSignOut size={25} />
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div>              
                </div>
                <TextField className="w-full" placeholder="Search" />
                { chatrooms && <ChatsList onClick={changeActiveChat} chats={chatrooms}/>}
            </div>

            {/** new chat modal */}
            <Modal id='new-chat-modal'>
                {
                loading ?
                    <Spinner />
                 :
                <>
                    <ul className='grid grid-cols-5 items-start justify-center place-items-center gap-5 text-center'>
                        {
                            allUsers && allUsers.map((user) => (
                                <li
                                    onClick={() => { setSelectedUser(user) }}
                                    className={classNames('flex flex-col items-center cursor-pointer  p-3 rounded-md gap-3 hover:bg-primary justify-center', {
                                        'bg-primary': selectedUser && (selectedUser._id === user._id)
                                    })}>
                                    {user.photoURL ?
                                        <img src={user?.photoURL} className='w-[50px] h-[50px] rounded-full' alt='avatar' /> :
                                        <Avatar name={user?.displayName || ""} className="rounded-full" size="50" />}
                                    <p>{user.displayName}</p>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="modal-action">
                        <label
                            onClick={newChatRoom}
                            htmlFor="new-chat-modal" className="btn btn-primary">Create Chat
                        </label>
                    </div>
                </>
                }
            </Modal>  

            {/** chat section */}
            <div className="col-span-9 max-h-screen overflow-hidden bg-primary rounded-normal flex flex-col p-4">
                {
                    activeChat && (
                        <>
                        <div className='sticky top-0 right-0 z-10'>
                            <ChatHeader chat={activeChat} />
                        </div>
                         <ChatMessages chatroomId = { activeChat._id } className="flex-grow h-full overflow-y-scroll pr-2 flex flex-col justify-end gap-2 py-4" />
                        <div className='sticky bottom-0 z-10'>
                            <ChatFooter  chat={activeChat}/>
                        </div>  
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default ChatLayout;
