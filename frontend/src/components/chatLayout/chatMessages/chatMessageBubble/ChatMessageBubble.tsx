import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface ChatMessageBubbleProps {
    isSender?: boolean;
    reactions?: string,
    children: ReactNode;
}

const ChatMessageBubble: FC<ChatMessageBubbleProps> = ({
    isSender,
    children,
    reactions
}) => {
    return (
        <div
            className={classNames(
                ' rounded-normal p-2 flex gap-3 overflow-visible items-center w-fit max-w-sm relative group',
                {
                    'bg-accent ml-auto': isSender,
                },
                { 'bg-secondary-emphasis': !isSender },
                { 'mb-3': reactions}
            )}
        >
            <p className='absolute top-[65%] text-xl'>{reactions}</p>
            {children}
        </div>
    );
};

export default ChatMessageBubble;
