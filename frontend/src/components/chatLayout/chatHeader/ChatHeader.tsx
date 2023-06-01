import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoCall } from 'react-icons/io5';
import { signout } from '../../../firebase/firebaseUtils';
import { User } from '../../../interfaces/User';
import { IChatroom } from '../../../interfaces/chatRoom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import Avatar from 'react-avatar';

interface ChatHeaderProps {
    chat: IChatroom;
}

const ChatHeader: FC<ChatHeaderProps> = ({ chat }) => {
    const user = useSelector((state:RootState) => state.user.user);

    let activeChatUser: User | undefined;
    if(chat)
    chat.users.map(u => {
        if(user?._id !== u._id) activeChatUser = u;
    } )

    return (
        <div className="flex flex-row items-center">
           {
            chat.isGroup ? <Avatar className="rounded-full mr-3" size="50" name={chat.groupName || ""}/> :
            activeChatUser?.photoURL ?
            <img src={ activeChatUser?.photoURL } className='w-[50px] mr-3 h-[50px] rounded-full' alt='avatar'/> :
            <Avatar name={activeChatUser?.displayName || ""} className="rounded-full mr-3" size="50" />
           }
            <div className="flex-grow">
                <p className="text-xl text-slate-200">{chat.isGroup ? chat.groupName : activeChatUser?.displayName}</p>
                <p className="text-sm text-slate-500">{activeChatUser?.isOnline ? 'Online' : 'Offline  '}</p>
            </div>
            <div>
                <p className="text-xl flex flex-row gap-10">
                    <BiSearch fill="rgb(100 116 139)" />
                    <IoCall onClick ={() => signout()} fill="rgb(100 116 139)" />
                </p>
            </div>
        </div>
    );
};

export default ChatHeader;
