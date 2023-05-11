import classNames from 'classnames';
import { FC } from 'react';
import ChatMessageBubble from './chatMessageBubble/ChatMessageBubble';
import { BiDotsHorizontal }from 'react-icons/bi';


interface ChatMessagesProps {
    className?: string;
}

const ChatMessages: FC<ChatMessagesProps> = ({ className }) => {
    const reactions = ['😂','😂','😂','😂','😂',]
    const chatMessages = [
        {
            uid: 'user2',
            message: 'This is test message',
            reactions: '😊'
        },
        {
            uid: 'user2',
            message: 'This is another test message',
        },
        {
            uid: 'user2',
            message: 'This is third test message',
        },
        {
            uid: 'user1',
            message: 'Hello, there',
        },
    ];

    return (
        <div className={classNames(className)}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessageBubble
                        key={chatMessage.uid}
                        isSender={chatMessage.uid === 'user1'}
                        reactions={chatMessage.reactions}
                    >
                        <p>{chatMessage.message}</p>
                        <button className='bg-secondary-emphasis relative group hidden group-hover:block text-primary'>
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
