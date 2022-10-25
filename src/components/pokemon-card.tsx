import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import './pokemon-card.css';

//déclarer d'un nouveau type pour TS nommé props, qui contient un objet Pokemon
type Props = {
    pokemon: Pokemon
    borderColor?: string //prop facultative
};

//on lie notre type <Props> à notre propriété entrée en ajoutant les accolades { pokemon }
//on utilise ECMA6 pour définir une valeur par défaut à notre prop borderColor = '#009688' (couleur verte)
//si cette prop est transmise depuis un composant parent alors cette valeur par défaut sera écrasée
//sinon borderColor aura la valeur borderColor = '#009688' (couleur verte)
const PokemonCard: FunctionComponent<Props> = ({ pokemon, borderColor = '#009688' }) => {

    const [color, setColor] = useState<string>(); // état pour stocker la couleur actuelle de la bordure

    const showBorder = () => {
        setColor(borderColor); //vert
    }

    const hideBorder = () => {
        setColor('#f5f5f5'); // on remet le gris
    }

    return (
        <div className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder}>
            <div className="card horizontal" style={{ borderColor: color }}>
                <div className="card-image">
                    <img src={pokemon.picture} alt={pokemon.name} />
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p>{pokemon.name}</p>
                        <p><small>{pokemon.created.toString()}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;