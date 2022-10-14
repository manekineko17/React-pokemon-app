import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from './models/pokemon';
import POKEMONS from './models/mock-pokemon';

//constante contenant une fonction (fonction fléchée => )
const App: FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]); //initialise l'état du composant avec un tableau vide par défaut

    //hook d'effet avec 2 arguements : 1) fonction appellant l'état setPokemons auquel on passe la liste de pokemon à afficher
    //2) tableau vide : évite de déclencher le hook d'effet à chaque modification du composant
    useEffect(() => {
        setPokemons(POKEMONS);
    }, []);

    return (
        <div>
            <h1>Pokédex</h1>
            <p>Il y a {pokemons.length} pokémons dans le Pokédex</p>
        </div>
    )
}

export default App;