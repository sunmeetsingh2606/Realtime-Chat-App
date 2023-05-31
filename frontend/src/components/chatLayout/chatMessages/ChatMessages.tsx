import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
// import ChatMessageBubble from './chatMessageBubble/ChatMessageBubble';
// import { BiDotsHorizontal }from 'react-icons/bi';
import { RootState } from '../../../Redux/store';
import { useSelector } from 'react-redux';
import { listenToMessages } from '../../../api/sockets';
import { IChatMessage } from '../../../interfaces/chatMessage';
import { findAllChatRoomMessages } from '../../../api/chat';
import { ClipLoader } from 'react-spinners';
import ChatMessageBubble from './chatMessageBubble/ChatMessageBubble';

interface ChatMessagesProps {
    className?: string;
    chatroomId: string
}

const ChatMessages: FC<ChatMessagesProps> = ({ className, chatroomId }) => {
    //const reactions = ['😂','😂','😂','😂','😂',];
    const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: RootState) => state.user.user )

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
        <div className={classNames(className, 'flex items-center justify-center')}>
           <ClipLoader color='#6b8afd' className='text-accent'/>
        </div>
    )

    return (
        <div className={classNames(className)}>
            {
                chatMessages && chatMessages.map((message) => (
                    <ChatMessageBubble 
                    isSender={ user?._id === message.senderUser }>
                        <p>{ message.message }</p>
                    </ChatMessageBubble>
                ))
            }
        </div>
    );
};

export default ChatMessages;
