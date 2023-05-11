import { FC } from 'react';
import Avatar from 'react-avatar';
import { IChatListItem } from '../../../../interfaces/chatListItem';
import classNames from 'classnames';
import { motion } from 'framer-motion';
interface ChatsListItemProps {
    chat: IChatListItem;
}

const chatListItemVariant = {
    hidden:{
        scale: 0
    },
    show:{
        scale: 1,
        transition: {
            duration: .2
        }
    }
}

const ChatsListItem: FC<ChatsListItemProps> = ({ chat }) => {
    return (
        <motion.div
        variants={chatListItemVariant}
        className={classNames(
                'rounded-normal cursor-pointer transition-all duration-300 p-2 hover:bg-primary',
                {
                    'bg-primary': chat.isActive,
                },
            )}
        >
            <div className="flex flex-row items-center gap-2">
                {
                    chat.photoURL ? 
                    <img src={chat.photoURL} className='w-[50px] h-[50px] rounded-full' alt='avatar'/> :
                    <Avatar name={chat.displayName} className="rounded-normal" size="50" />
                }
                <div className="flex-grow">
                    <p className="text-slate-200">{chat.displayName}</p>
                    <p className="text-slate-500 text-sm">{chat.lastMessage}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatsListItem;
