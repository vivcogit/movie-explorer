import React from 'react';

import './Overlay.scss';

interface OverlayProps {
    children: React.ReactNode,
    text: string,
};

const MAX_TEXT_LENGTH = 500;

function handleText(text: string) {
    if (text.length <= MAX_TEXT_LENGTH) {
        return text;
    }

    return `${text.slice(0, MAX_TEXT_LENGTH - 3)}...`;
}

function Overlay(props: OverlayProps) {
    const { children, text } = props;

    return (
        <div className="Overlay">
            {children}

            <div className="Overlay-Content">
                {handleText(text)}
            </div>
        </div>
    );
}

export { Overlay };
