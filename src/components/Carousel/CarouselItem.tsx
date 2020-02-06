import React from 'react';

import './CarouselItem.scss';

function CarouselItem(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <div className="CarouselItem">
            {children}
        </div>
    );
}

export { CarouselItem };
