import { FC } from 'react';
import ChatsListItem from './chatsListItem/ChatsListItem';
import { IChatListItem } from '../../../interfaces/chatListItem';
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
}

const ChatsList: FC<ChatsListProps> = ({ chats }) => {
    return (
        <>
            <motion.div 
            variants={chatListContainerVariant}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-2">
                {chats.map((chat) => {
                    return <ChatsListItem key={chat._id} chat={chat} />;
                })}
            </motion.div>
        </>
    );
};

export default ChatsList;
