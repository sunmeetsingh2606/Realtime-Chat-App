import { FC, useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { IChatroom } from '../../../../interfaces/chatRoom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store';
import { User } from '../../../../interfaces/User';
interface ChatsListItemProps {
    chat: IChatroom;
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

    const user= useSelector((state:RootState) => state.user.user)
    const [activeChatUser, setActiveChatUser] = useState<User | null>(null);
    

    useEffect(() => {

        //const activeUser = 
        setActiveChatUser(chat.users.find((u) => u._id !== user?._id) || null);

      return () => {
        
      }
    }, [])
    

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
                    activeChatUser?.photoURL ?
                    <img src={ activeChatUser?.photoURL } className='w-[50px] h-[50px] rounded-full' alt='avatar'/> :
                    <Avatar name={activeChatUser?.displayName || ""} className="rounded-full " size="50" />
                }
                <div className="flex-grow">
                    <p className="text-slate-200">{
                        chat.isGroup ? chat.groupName : activeChatUser?.displayName
                    }</p>
                    {/* <p className="text-slate-500 text-sm">{chat.lastMessage}</p> */}
                </div>
            </div>
        </motion.div>
    );
};

export default ChatsListItem;
