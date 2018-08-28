import React from 'react';
import { Link } from 'react-router-dom';

export default function Header (props) {
    return(
        <header className='header'>
            <div className="container">
                <span className='header__name'>
                    {props.name}
                </span>
                <nav className='header__nav'>
                    <ul className="header__nav-list">
                        {props.categories.map((category) => {
                            if(props.role === category.role || category.role === 'all')
                                return (
                                    <li className="header__nav-list-item">
                                        <Link className='header__nav-link' to={category.link}>
                                            {category.name}
                                        </Link>
                                    </li>
                                );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}