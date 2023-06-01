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
import Modal from '../../Modal/Modal';
import DragAndDrop from '../../DragAndDrop/DragAndDrop';

interface ChatFooterProps {
    chat: IChatroom
}


const ChatFooter:FC<ChatFooterProps> = ({ chat }) => {
    const user = useSelector((state: RootState) => state.user.user )
    const [message, setMessage] = useState('')
    const [attachements, setAttachements] = useState<FileList>()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const send = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!user) return 

        sendMessage({
            chatroom: chat._id,
            senderUser: user?._id,
            message: message,
            messageType: 'message'
        });
        setMessage('');
    }


    const uploadAttachements = (f: FileList) => {
        setAttachements(f);
        sendAttachments();
    }

    const sendAttachments = async () => {
        console.log({attachements});
    }

    return (
        <div className="flex flex-row items-center gap-1">
            <Modal id='file-upload-modal'>
                <DragAndDrop upload={uploadAttachements}/>
            </Modal>
            <div className='aspect-square'>
            <label htmlFor='file-upload-modal'  className='btn btn-primary w-full h-full'>
                <ImAttachment />
            </label>
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
