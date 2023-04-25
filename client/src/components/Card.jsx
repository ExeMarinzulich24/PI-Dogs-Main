import React from "react";
import '../styles/Card.css'


export default function Card({ image, name, temperaments, weightMin, weightMax }) {
    return (
        <div className="cards">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <h1>{name}</h1>
                        <img src={image} alt={`${name}`} className='imageDog' />
                    </div>
                    <div className="flip-card-back">
                        <h1>{name}</h1>
                        <h2>Temperamento:</h2>
                        <h4>{function (temperaments) {
                            if (typeof (temperaments) === 'string') {
                                return temperaments
                            }
                            if (Array.isArray(temperaments)) {
                                let temps = temperaments.map(e => e.name)
                                return temps.join(', ')
                            }
                        }(temperaments)}</h4>
                        <h2>Peso:</h2>
                        <h4>De {weightMin} Kg. a {weightMax} Kg.</h4>
                    </div>
                </div>

            </div>

        </div>

    )
}