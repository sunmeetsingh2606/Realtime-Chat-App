import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
// import ChatMessageBubble from './chatMessageBubble/ChatMessageBubble';
// import { BiDotsHorizontal }from 'react-icons/bi';
// import { RootState } from '../../../Redux/store';
// import { useSelector } from 'react-redux';
import { listenToMessages } from '../../../api/sockets';
import { IChatMessage } from '../../../interfaces/chatMessage';
import { findAllChatRoomMessages } from '../../../api/chat';

interface ChatMessagesProps {
    className?: string;
    chatroomId: string
}

const ChatMessages: FC<ChatMessagesProps> = ({ className, chatroomId }) => {
    //const reactions = ['😂','😂','😂','😂','😂',];
    const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
    const [loading, setLoading] = useState(false);


    const fetchRoomMessages = async () => {
        setLoading(true);
        const messages = await findAllChatRoomMessages(chatroomId);
        console.log({messages});
        setChatMessages(messages.data);
        setLoading(false);
    }

    useEffect(() => {
        //call back function to update the state
        fetchRoomMessages();
         const updateMessages = (messages: IChatMessage[]) => {
            setChatMessages(messages);
         }
         listenToMessages(updateMessages);
         console.log({ chatMessages });

         return () => setChatMessages([]);
    }, [chatroomId])

    /** TODO
     * make this code better
     */

    if(loading)
    return (
        <div>Loading...</div>
    )

    return (
        <div className={classNames(className)}>
            {
                chatMessages && chatMessages.map((message) => (
                    <p key={message._id}>{message.message}</p>
                ))
            }
        </div>
    );
};

export default ChatMessages;
