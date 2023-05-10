import classNames from 'classnames';
import { FC } from 'react';

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
    className?: string;
}

const TextField: FC<TextFieldProps> = ({ className, ...props }) => {
    return (
        <>
            <input
                type="text"
                className={classNames(
                    'bg-secondary-emphasis rounded-normal border-none outline-none p-2',
                    className,
                )}
                {...props}
            />
        </>
    );
};

export default TextField;
