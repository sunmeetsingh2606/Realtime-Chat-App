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
                ' rounded-normal p-2 transition-all duration-300 origin-left flex gap-3 overflow-visible items-center w-fit max-w-sm max-h-[100px] group',
                {
                    'bg-accent ml-auto': isSender,
                },
                { 'bg-secondary-emphasis': !isSender },
            )}
        >
            {children}
        </div>
    );
};

export default ChatMessageBubble;
