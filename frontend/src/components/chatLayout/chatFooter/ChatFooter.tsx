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
            <div className='aspect-square'>
                <PrimaryButton>
                        <ImAttachment />
                </PrimaryButton>
            </div>
            <form className="flex-grow flex gap-1" onSubmit={send}>
                <TextField 
                onChange={onChange}
                value={message}
                type='text'
                placeholder='Your message'
                />
                <div>
                    <PrimaryButton type='submit'>
                        <IoSend />
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default ChatFooter;
