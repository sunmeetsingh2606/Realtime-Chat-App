import { FC } from 'react';
import ChatsListItem from './chatsListItem/ChatsListItem';
import { motion, } from 'framer-motion';
import { IChatroom } from '../../../interfaces/chatRoom';
const chatListContainerVariant = {
    show: {
        transition: {
            staggerChildren: 0.1,
        }
    }
}

interface ChatsListProps {
    chats: IChatroom[];
    onClick:(chat:IChatroom) => void
}

const ChatsList: FC<ChatsListProps> = ({ chats, onClick }) => {
    return (
        <>
            <motion.div 
            variants={chatListContainerVariant}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-2">
                {chats.map((chat) => {
                    return <div key={chat._id} onClick={() => onClick(chat)}>
                        <ChatsListItem  chat={chat} />
                    </div>;
                })}
            </motion.div>
        </>
    );
};

export default ChatsList;
