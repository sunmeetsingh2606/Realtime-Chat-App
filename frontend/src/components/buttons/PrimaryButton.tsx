import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface PrimaryButtonProps {
    className?: string;
    children: ReactNode;
    type?: 'button' | 'submit';
    onClick?: () => void;

}

const PrimaryButton: FC<PrimaryButtonProps> = ({ className, children, type, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(
                'btn-primary',
                className,
            )}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
