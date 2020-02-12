import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';
import search from './search.svg';
import './Header.scss';

function Header() {
    return (
        <header className="Header">
            <Link to="/">
                <img className="Header-Logo" src={logo} alt="Movie Explorer" />
            </Link>

            <Link to="/search">
                <img className="Header-Search" src={search} alt="Search movies" />
            </Link>
        </header>
    );
}

export { Header };
