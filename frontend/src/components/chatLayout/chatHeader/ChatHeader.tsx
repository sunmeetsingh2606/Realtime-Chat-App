import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoCall } from 'react-icons/io5';
import { IChatListItem } from '../../../interfaces/chatListItem';

interface ChatHeaderProps {
    chat: IChatListItem;
}

const ChatHeader: FC<ChatHeaderProps> = ({ chat }) => {
    return (
        <div className="flex flex-row items-center">
            <div className="flex-grow">
                <p className="text-xl text-slate-200">{chat.name}</p>
                <p className="text-sm text-slate-500">Online</p>
            </div>
            <div>
                <p className="text-xl flex flex-row gap-10">
                    <BiSearch fill="rgb(100 116 139)" />
                    <IoCall fill="rgb(100 116 139)" />
                </p>
            </div>
        </div>
    );
};

export default ChatHeader;
