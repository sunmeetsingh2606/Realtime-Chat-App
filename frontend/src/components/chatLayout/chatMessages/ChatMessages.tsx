import classNames from 'classnames';
import { FC } from 'react';
import ChatMessageBubble from './chatMessageBubble/ChatMessageBubble';

interface ChatMessagesProps {
    className?: string;
}

const ChatMessages: FC<ChatMessagesProps> = ({ className }) => {
    const chatMessages = [
        {
            _id: '1',
            name: 'Sunmeet Singh',
            message: 'This is test message',
            isSender: false,
        },
        { _id: '2', name: 'Sunmeet Singh', message: 'Hello', isSender: true },
    ];

    return (
        <div className={classNames(className)}>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessageBubble
                        key={chatMessage._id}
                        isSender={chatMessage.isSender}
                    >
                        <p>{chatMessage.message}</p>
                    </ChatMessageBubble>
                );
            })}
        </div>
    );
};

export default ChatMessages;
