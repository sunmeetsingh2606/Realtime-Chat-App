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
                    'input input-bordered w-full flex items-center justify-start gap-3',
                    className,
                )}
                {...props}
            />
        </>
    );
};

export default TextField;
