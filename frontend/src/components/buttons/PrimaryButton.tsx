import classNames from 'classnames';
import { FC, ReactNode } from 'react';

interface PrimaryButtonProps {
    className?: string;
    children: ReactNode;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ className, children }) => {
    return (
        <button
            className={classNames(
                'p-2 rounded-normal transition-all duration-300 hover:bg-secondary-emphasis',
                className,
            )}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
