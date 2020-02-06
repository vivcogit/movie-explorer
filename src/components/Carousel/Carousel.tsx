import React from 'react';

import './Carousel.scss';

function Carousel(props: { children: React.ReactNode}) {
    const { children } = props;

    return (
        <div className="Carousel-Wrapper">
            <div className="Carousel">
                {children}
            </div>
        </div>
    );
}

export { Carousel };
