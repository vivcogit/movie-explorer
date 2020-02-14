import React from 'react';
import classNames from 'classnames';

import './Input.scss';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string,
}

function Input(props: InputProps) {
    const { className, ...otherProps } = props;

    return (
        <input
            className={classNames('Input', className)}
            {...otherProps}
        />
    );
}

export { Input };