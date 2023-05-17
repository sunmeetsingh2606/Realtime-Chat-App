import { ImAttachment, ImMic } from 'react-icons/im';
import PrimaryButton from '../../buttons/PrimaryButton';
import TextField from '../../forms/textField/TextField';
import { useState } from 'react';
import { sendMessage } from '../../../api/sockets';

const ChatFooter = () => {
    const [message, setMessage] = useState('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const send = () => {
        sendMessage(message);
        setMessage('');
    }


    return (
        <div className="flex flex-row items-center gap-1">
            <PrimaryButton>
                <ImAttachment color="white" />
            </PrimaryButton>
            <TextField
             onChange={onChange}
             value={message}
             className="flex-grow" 
             placeholder="Your message" />
            <PrimaryButton onClick={() => send()}>
                <ImMic color="white" />
            </PrimaryButton>
        </div>
    );
};

export default ChatFooter;
