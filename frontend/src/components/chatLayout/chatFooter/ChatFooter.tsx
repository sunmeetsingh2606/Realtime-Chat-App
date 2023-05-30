import { ImAttachment } from 'react-icons/im';
import PrimaryButton from '../../buttons/PrimaryButton';
import TextField from '../../forms/textField/TextField';
import { FormEvent, useState } from 'react';
import { sendMessage } from '../../../api/sockets';
import { IoSend } from 'react-icons/io5';
import { FC } from 'react';
import { IChatroom } from '../../../interfaces/chatRoom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';

interface ChatFooterProps {
    chat: IChatroom
}


const ChatFooter:FC<ChatFooterProps> = ({ chat }) => {
    const user = useSelector((state: RootState) => state.user.user )
    const [message, setMessage] = useState('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const send = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!user) return 

        sendMessage({
            chatroom: chat._id,
            senderUser: user?._id,
            message: message
        });
        setMessage('');
    }


    return (
        <div className="flex flex-row items-center gap-1">
            <PrimaryButton>
                <ImAttachment color="white" />
            </PrimaryButton>
            <form className="flex-grow flex  w-full" onSubmit={send}>
                <TextField
                    onChange={onChange}
                    value={message}
                    className='flex-grow'
                    placeholder="Your message" />
                <PrimaryButton type='submit' >
                    <IoSend color="white" />
                </PrimaryButton>
            </form>
        </div>
    );
};

export default ChatFooter;
