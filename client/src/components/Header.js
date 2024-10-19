import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="logo">Cuvette</div>
            <nav>
                <Link to="/contact">Contact</Link>
                <div className="user-dropdown">Your Name ▼</div>
            </nav>
        </header>
    );
}

export default Header;