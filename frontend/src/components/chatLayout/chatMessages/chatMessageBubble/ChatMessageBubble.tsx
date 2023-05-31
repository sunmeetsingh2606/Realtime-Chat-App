import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface ChatMessageBubbleProps {
    isSender?: boolean;
    children: ReactNode;
}

const ChatMessageBubble: FC<ChatMessageBubbleProps> = ({
    isSender,
    children,
}) => {
    
    return (
        <div
            className={classNames(
                `chat ${isSender ? 'chat-end' : 'chat-start'}`
            )}
        >
           <div className={ classNames(`chat-bubble ${isSender ? "chat-bubble-secondary" : "bg-primary-accent"}`)}>
           {children}
           </div>
        </div>
    );
};

export default ChatMessageBubble;
