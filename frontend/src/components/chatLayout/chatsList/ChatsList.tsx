import { FC } from 'react';
import ChatsListItem from './chatsListItem/ChatsListItem';
import { IChatListItem } from '../../../interfaces/chatListItem';

interface ChatsListProps {
    chats: IChatListItem[];
}

const ChatsList: FC<ChatsListProps> = ({ chats }) => {
    return (
        <>
            <div className="flex flex-col gap-2">
                {chats.map((chat) => {
                    return <ChatsListItem key={chat.uid} chat={chat} />;
                })}
            </div>
        </>
    );
};

export default ChatsList;
