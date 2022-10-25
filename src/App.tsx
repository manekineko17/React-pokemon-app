import React, { FunctionComponent } from 'react';
import PokemonList from './pages/pokemon-list';

//constante contenant une fonction (fonction fléchée => )
const App: FunctionComponent = () => {

    return (
        <PokemonList /> //composant qui appelle le composant pokemon list
    )
}

export default App;