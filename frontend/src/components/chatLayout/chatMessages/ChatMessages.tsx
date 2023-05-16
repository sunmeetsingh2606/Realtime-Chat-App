import classNames from 'classnames';
import { FC } from 'react';
import ChatMessageBubble from './chatMessageBubble/ChatMessageBubble';
import { BiDotsHorizontal }from 'react-icons/bi';
import { RootState } from '../../../Redux/store';
import { useSelector } from 'react-redux';

interface ChatMessagesProps {
    className?: string;
}

const ChatMessages: FC<ChatMessagesProps> = ({ className }) => {
    const reactions = ['😂','😂','😂','😂','😂',]
    //const user = useSelector((state: RootState) => state.user.user);
    const chatMessages = [
        {
            uid: 'user2',
            message: 'This is test message',
            reactions: ['😊','😊'],
            createdAt: new Date(),
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
        },
        {
            uid: 'user2',
            message: 'This is another test message',
            createdAt: new Date(),
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
        },
        {
            uid: 'user2',
            message: 'This is third test message',
            reactions: ['🥲','😊'],
            createdAt: new Date(),
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
        },
        {
            uid: 'user1',
            message: 'Hello, there',
            createdAt: new Date(),
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
        },
        {
            uid: 'user2',
            message: 'This is third test message',
            createdAt: new Date(),
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
        },
        {
            uid: 'user2',
            message: 'This is ',
            createdAt: new Date(),
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
        },
        {
            uid: 'user2',
            message: 'Last Message from the user',
            createdAt: new Date(),
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
        },
        {
            uid: 'user1',
            message: 'Hello, there',
            createdAt: new Date(),
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
        },
        {
            uid: 'user1',
            message: 'Hello, there',
            createdAt: new Date(),
            photoURL: "https://avatars.dicebear.com/api/initials/John Doe.svg",
        },
        
    ];

    const renderPhoto = (index: number) => {
        if(index < chatMessages.length - 1){
            if(chatMessages[index].uid !== chatMessages[index + 1].uid){
                return <img src={chatMessages[index].photoURL || ''} className='w-[50px] h-[50px] rounded-full' alt='avatar'/> 
            }
        } else {
            if(chatMessages[index].uid !== 'user1'){
                return <img src={chatMessages[index].photoURL || ''} className='w-[50px] h-[50px] rounded-full' alt='avatar'/> 
            }
        }
    }

    /** TODO
     * make this code better
     */

    return (
        <div className={classNames(className)}>
            {chatMessages.map((chatMessage, index) => {
                return (
                    <ChatMessageBubble
                        key={chatMessage.message}
                        isSender={chatMessage.uid === 'user1'}
                    >
                        {/** showing message content */}
                        <div className='flex flex-col items-start justify-start'>
                            {/** to show profile url only at the last message the sender sends */}
                            <div className='flex gap-5 items-center justify-center'>
                            { renderPhoto(index) }
                            <p>{chatMessage.message}</p>
                            {/** changing time format so it doesnt show seconds */}
                            <p className='text-[12px] self-end text-slate-200 text-opacity-60'>
                                {`${new Date(chatMessage.createdAt).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}`}
                            </p>
                            </div>
                            <ul className='flex gap-[-4px]'>
                            { chatMessage?.reactions && chatMessage?.reactions.map(r => <li>{r}</li>)}
                            </ul>
                        </div>


                        
                        {/** reaction dots */}
                        <button className={`bg-secondary-emphasis relative group hidden ${chatMessage.uid === 'user1' ? '' :'group-hover:block'} text-primary`}>
                            <BiDotsHorizontal />
                            {/** container to show all reactions */}
                            <ul className='hidden group-focus-within:grid rounded-md min-w-[150px] absolute top-full -left-12 z-10 gap-1 grid-cols-5 p-2 bg-secondary'>
                                {
                                    reactions.map(r => <li className='hover:scale-125 transition-all duration-100'>{r}</li>)
                                }
                            </ul>
                        </button>

                    </ChatMessageBubble>
                );
            })}
        </div>
    );
};

export default ChatMessages;
