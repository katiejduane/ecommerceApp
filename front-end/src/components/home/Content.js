import React from 'react';
import HorseCard from '../utility/HorseCard';

function Content(props) {
    return (
        <div className="row">
            <div className="col s12">
                <HorseCard />
                <HorseCard />
                <HorseCard />
            </div>
        </div>
    )
}

export default Content;