import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-service';

const PokemonSearch: FunctionComponent = () => {
  const [term, setTerm] = useState<string>('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term); //mise à jour de l'état du composant avec le terme saisie par l'utilisateur

    //le terme doit faire min 2 caractères de long, sinon on retourne un résultat vide
    if (term.length <= 1) {
      setPokemons([]);
      return;
    }

    //appel de la méthode searchPokemon en lui passant en paramètre le terme de recherche de l'utilisateur
    //et on remplit le state des résultats avec les pokémons demandés
    PokemonService.searchPokemon(term).then((pokemons) =>
      setPokemons(pokemons)
    );
  };

  return (
    <div className='row'>
      <div className='col s12 m6 offset-m3'>
        <div className='card'>
          <div className='card-content'>
            <div className='input-field'>
              {/* branchement du champ de recherche  */}
              <input
                type='text'
                placeholder='Rechercher un pokémon'
                value={term}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className='collection'>
              {/* liste des pokémons récupérés depuis le state lié au résultat de la recherche */}
              {pokemons.map((pokemon) => (
                <Link
                  key={pokemon.id}
                  to={`/pokemons/${pokemon.id}`}
                  className='collection-item'
                >
                  {pokemon.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
