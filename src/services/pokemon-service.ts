import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';

export default class PokemonService {
  static pokemons: Pokemon[] = POKEMONS;

  static isDev =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  //méthode qui retourne le résultat de la méthode fetch qui est une promesse contenant le tableau de pokémon
  static getPokemons(): Promise<Pokemon[]> {
    if (this.isDev) {
      return fetch('http://localhost:3001/pokemons')
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }
    return new Promise((resolve) => {
      resolve(this.pokemons);
    });
  }

  //méthode pour récupérer 1 seul pokémon grace à son id : renvoie soit un pokémon, soit null
  static getPokemon(id: number): Promise<Pokemon | null> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${id}`)
        .then((response) => response.json())
        .then((data) => (this.isEmpty(data) ? null : data))
        .catch((error) => this.handleError(error));
    }

    return new Promise((resolve) => {
      // on retourne le même pokémon qu'on va chercher dans la constante de pokémon
      resolve(this.pokemons.find((pokemon) => id === pokemon.id));
    });
  }

  //requête update pokemon pour persister les modifications
  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: 'PUT',
        body: JSON.stringify(pokemon),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }

    return new Promise((resolve) => {
      const { id } = pokemon;
      const index = this.pokemons.findIndex((pokemon) => pokemon.id === id);
      this.pokemons[index] = pokemon;
      resolve(pokemon);
    });
  }

  //supprimer un pokémon
  static deletePokemon(pokemon: Pokemon): Promise<{}> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }

    return new Promise((resolve) => {
      const { id } = pokemon;
      this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
      resolve({});
    });
  }

  //ajouter un pokemon
  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    pokemon.created = new Date(pokemon.created);
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons`, {
        method: 'POST',
        body: JSON.stringify(pokemon),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }

    return new Promise((resolve) => {
      this.pokemons.push(pokemon);
      resolve(pokemon);
    });
  }

  //recherche
  static searchPokemon(term: string): Promise<Pokemon[]> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons?q=${term}`)
        .then((response) => response.json())
        .catch((error) => this.handleError(error));
    }

    return new Promise((resolve) => {
      const results = this.pokemons.filter((pokemon) =>
        pokemon.name.includes(term)
      );
      resolve(results);
    });
  }

  //vérifie si la réponse de l'api rest est un pokémon ou un objet null -> utilisé ci-dessus
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  //intercepter les erreurs qui pourraient survenir dans l'application
  static handleError(error: Error): void {
    console.error(error);
  }
}
