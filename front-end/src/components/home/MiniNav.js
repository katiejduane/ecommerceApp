import React from 'react';

function MiniNav(props) {

    const categories = [
        'Horses',
        'Riders',
        'Stables',
        'Accessories'
    ]

    return (
        <nav>
            <div className="nav-wrapper red accent-2">
                <ul className="left hide-on-med-and-down">
                    <li><a href="sass.html">Horses</a></li>
                    <li><a href="badges.html">Riders</a></li>
                    <li><a href="badges.html">Stables</a></li>
                    <li className="active"><a href="collapsible.html">Accessories</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default MiniNav;