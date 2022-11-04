import React, { FunctionComponent } from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import PokemonList from './pages/pokemon-list';
import PokemonDetails from './pages/pokemon-details';
import PageNotFound from './pages/page-not-found';
import PokemonEdit from './pages/pokemon-edit';
import PokemonAdd from './pages/pokemon-add';
import Login from './pages/login';
import PrivateRoute from './PrivateRoute';

//router : met en place le système de navigation
//route : permet de décrire chaque route de l'app
//switch : permet d'afficher le contenu d'une seule route à la fois

//constante contenant une fonction (fonction fléchée => )
const App: FunctionComponent = () => {
  return (
    <Router>
      <div>
        {/** barre de navigation commune à toutes les routes
         * car elle se trouve en dehors de la balise Switch
         */}
        <nav>
          <div className='nav-wrapper teal'>
            <Link to='/' className='brand-logo center'>
              Pokédex
            </Link>
          </div>
        </nav>
        {/** système de gestions des routes de l'application
         * les routes prennent obligatoirement 2 props :
         * 1 chemin path + 1 composant associé component
         */}
        <Switch>
          <PrivateRoute exact path='/' component={PokemonList} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/pokemons' component={PokemonList} />
          <PrivateRoute exact path='/pokemon/add' component={PokemonAdd} />
          <PrivateRoute path='/pokemons/edit/:id' component={PokemonEdit} />
          <PrivateRoute path='/pokemons/:id' component={PokemonDetails} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
