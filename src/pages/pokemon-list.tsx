import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';
import PokemonCard from '../components/pokemon-card';

const PokemonList: FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]); //initialise l'état du composant avec un tableau vide par défaut

    //hook d'effet avec 2 arguements : 1) fonction appellant l'état setPokemons auquel on passe la liste de pokemon à afficher
    //2) tableau vide : évite de déclencher le hook d'effet à chaque modification du composant
    useEffect(() => {
        //on récupère les pokémons via l'api rest
        fetch(`http://localhost:3001/pokemons`) //requête GET vers l'url
            .then(response => response.json()) //récupèrer objet de type response,appliquer méthode json pr extraire ses données
            .then((pokemons) => {
                setPokemons(pokemons)
            });  //on place les pokemons dans le state de notre composant
    }, []);

    return (
        <div>
            <h1 className="center">Pokédex</h1>
            <div className="container">
                <div className="row">
                    {pokemons.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonList;