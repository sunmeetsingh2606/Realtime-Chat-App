import ChatFooter from '../../components/chatLayout/chatFooter/ChatFooter';
import ChatHeader from '../../components/chatLayout/chatHeader/ChatHeader';
import ChatMessages from '../../components/chatLayout/chatMessages/ChatMessages';
import ChatsList from '../../components/chatLayout/chatsList/ChatsList';
import TextField from '../../components/forms/textField/TextField';
import { IChatListItem } from '../../interfaces/chatListItem';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RootState } from '../../Redux/store';
import { useSelector } from 'react-redux/es/exports';

const ChatLayout: FC = () => {

    const user = useSelector((state: RootState) => state.user.user)


    const navigate = useNavigate();
    const chats: IChatListItem[] = [
        {
            _id: '1',
            name: 'Sunmeet Singh',
            lastMessage: 'This is last message',
            isActive: true,
        },
        {
            _id: '2',
            name: 'Harmeet Singh',
            lastMessage: 'This is last message',
        },
    ];

    const activeChat = chats[0];

    useEffect(() => {

        if(!user){
            navigate('/login');
        }
      
    
      return () => {
        
      }
    }, [])
    

    return (
        <div className="grid grid-cols-12 h-full">
            <div className="col-span-3 flex flex-col gap-2 p-4">
                <TextField className="w-full" placeholder="Search" />
                <ChatsList chats={chats} />
            </div>
            <div className="col-span-9 bg-primary rounded-normal flex flex-col p-4">
                <ChatHeader chat={activeChat} />
                <ChatMessages className="flex-grow flex flex-col justify-end gap-2 py-4" />
                <ChatFooter />
            </div>
        </div>
    );
};

export default ChatLayout;
