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
                ' rounded-normal p-2 w-fit max-w-sm',
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
