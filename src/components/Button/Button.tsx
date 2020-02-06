import React from 'react';
import classNames from 'classnames';

import './Button.scss';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode,
    backgroundTransparent?: boolean,
    black?: boolean,
}

function Button(props: ButtonProps) {
    const {
        children, backgroundTransparent, black,
        className = '',
        ...htmlProps
    } = props;

    return (
        <button
            className={classNames('Button', className, {
                Button_backgroundTransparent: backgroundTransparent,
                Button_black: black,
            })}
            {...htmlProps}
        >
            {children}
        </button>
    );
}

export { Button };
