import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
// import ChatMessageBubble from './chatMessageBubble/ChatMessageBubble';
// import { BiDotsHorizontal }from 'react-icons/bi';
// import { RootState } from '../../../Redux/store';
// import { useSelector } from 'react-redux';
import { listenToMessages } from '../../../api/sockets';

interface ChatMessagesProps {
    className?: string;
}

const ChatMessages: FC<ChatMessagesProps> = ({ className }) => {
    const reactions = ['😂','😂','😂','😂','😂',];
    const [chatMessages, setChatMessages] = useState<any>([])
    //const user = useSelector((state: RootState) => state.user.user);




    useEffect(() => {
        //call back function to update the state
         const updateMessages = (messages: any) => {
            setChatMessages(messages);
            console.log({messages})
         }
         listenToMessages(updateMessages);
    }, [])

    /** TODO
     * make this code better
     */

    return (
        <div className={classNames(className)}>
            {
                chatMessages.map((message: any) => (
                    <p>{message}</p>
                ))
            }
        </div>
    );
};

export default ChatMessages;
