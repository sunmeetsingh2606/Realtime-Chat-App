import { ImAttachment, ImMic } from 'react-icons/im';
import PrimaryButton from '../../buttons/PrimaryButton';
import TextField from '../../forms/textField/TextField';

const ChatFooter = () => {
    return (
        <div className="flex flex-row items-center gap-1">
            <PrimaryButton>
                <ImAttachment color="white" />
            </PrimaryButton>
            <TextField className="flex-grow" placeholder="Your message" />
            <PrimaryButton>
                <ImMic color="white" />
            </PrimaryButton>
        </div>
    );
};

export default ChatFooter;
