import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import { useHistory } from 'react-router-dom';

type Props = {
    pokemon: Pokemon
};

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
}

type Form = {
    name: Field,
    hp: Field,
    cp: Field,
    types: Field
}

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {

    const [form, setForm] = useState<Form>({
        name: { value: pokemon.name, isValid: true },
        hp: { value: pokemon.hp, isValid: true },
        cp: { value: pokemon.cp, isValid: true },
        types: { value: pokemon.types, isValid: true },
    })

    //renvoie un boolean pour savoir si le type passé en paramètre appartient ou non au pokemon
    //includes: méthode native JS pour déterminer si le type appartient au tableau de type d'un pokemon ou non
    //includes renvoie un booléen
    const hasType = (type: string): boolean => {
        return form.types.value.includes(type);
    }

    const history = useHistory();

    //constante qui contient tous les types de Pokemon disponibles
    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];

    //méthode réagissant aux modifications apportées par l'utilisateur dans les champs
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = event.target.name; //nom du champ modifié -> name : Pikachu
        const fieldValue: string = event.target.value; // nouvelle valeur saisie par l'utilisateur -> value: Pikapika
        const newField: Field = { [fieldName]: { value: fieldValue } }; //regroupement des informations

        setForm({ ...form, ...newField }); //modification de l'état du formulaire
    }

    const selectType = (type: string, event: React.ChangeEvent<HTMLInputElement>): void => {
        const checked = event.target.checked; //case cochée ou décochée ?
        let newField: Field;

        if (checked) {
            //si l'utilisateur coche un type, on l'ajoute à la liste des types du pokémon
            //concat : pour fusionner 2 tableaux
            const newTypes: string[] = form.types.value.concat([type]);
            newField = { value: newTypes };
        } else {
            //si l'utilisateur décoche un type, on le retire de la liste des types du pokémon
            const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
            newField = { value: newTypes };
        }

        setForm({ ...form, ...{ types: newField } }); // mise à jour du state du formulaire
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //on bloque le comportement natif du formulaire afin de traiter nous-même la soumission du formulaire
        event.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            history.push(`/pokemons/${pokemon.id}`);
        }
    }

    const validateForm = () => {
        let newForm: Form = form;

        // Validator name
        // expressions régulières,regex: je ne veux que des string entre 3 et 25 caractères de long
        //string qui ne doivent contenir que des lettres minuscules ou majuscules ainsi que àéè
        if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
            const errorMsg: string = 'Le nom du pokémon est requis (1-25).';
            const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ name: newField } };
        } else {
            const newField: Field = { value: form.name.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ name: newField } };
        }

        // Validator hp
        //regex: je ne veux que des chiffres et entre 1 et 3 chiffres de long
        if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
            const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999.';
            const newField: Field = { value: form.hp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ hp: newField } };
        } else {
            const newField: Field = { value: form.hp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ hp: newField } };
        }

        // Validator cp
        if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
            const errorMsg: string = 'Les dégâts du pokémon sont compris entre 0 et 99';
            const newField: Field = { value: form.cp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ cp: newField } };
        } else {
            const newField: Field = { value: form.cp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ cp: newField } };
        }

        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
    }

    // méthode qui vérifie si une case à cocher doit être varouiller ou non
    const isTypesValid = (type: string): boolean => {
        // Cas n°1: Le pokémon a un seul type, qui correspond au type passé en paramètre.
        // Dans ce cas on renvoie false, car l'utilisateur ne doit pas pouvoir décocher ce type (sinon le pokémon aurait 0 type, ce qui est interdit)
        if (form.types.value.length === 1 && hasType(type)) {
            return false;
        }
        // Cas n°1: Le pokémon a au moins 3 types.
        // Dans ce cas il faut empêcher à l'utilisateur de cocher un nouveau type, mais pas de décocher les types existants.
        if (form.types.value.length >= 3 && !hasType(type)) {
            return false;
        }
        // Après avoir passé les deux tests ci-dessus, on renvoie 'true', 
        // c'est-à-dire que l'on autorise l'utilisateur à cocher ou décocher un nouveau type.
        return true;
    }

    //DOM virtuel
    return (
        <form onSubmit={event => handleSubmit(event)}>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        <div className="card-image">
                            <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                {/* Pokemon name */}
                                <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input id="name" name='name' type="text" className="form-control" value={form.name.value} onChange={event => handleInputChange(event)}></input>
                                    {form.name.error &&
                                        <div className='card-panel red accent-1'>
                                            {form.name.error}
                                        </div>
                                    }
                                </div>
                                {/* Pokemon hp */}
                                <div className="form-group">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input id="hp" name='hp' type="number" className="form-control" value={form.hp.value} onChange={event => handleInputChange(event)}></input>
                                    {form.hp.error &&
                                        <div className='card-panel red accent-1'>
                                            {form.hp.error}
                                        </div>
                                    }
                                </div>
                                {/* Pokemon cp */}
                                <div className="form-group">
                                    <label htmlFor="cp">Dégâts</label>
                                    <input id="cp" name='cp' type="number" className="form-control" value={form.cp.value} onChange={event => handleInputChange(event)}></input>
                                    {form.cp.error &&
                                        <div className='card-panel red accent-1'>
                                            {form.cp.error}
                                        </div>
                                    }
                                </div>
                                {/* Pokemon types */}
                                <div className="form-group">
                                    <label>Types</label>
                                    {types.map(type => (
                                        <div key={type} style={{ marginBottom: '10px' }}>
                                            <label>
                                                <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)}
                                                    checked={hasType(type)}
                                                    onChange={event => selectType(type, event)}></input>
                                                <span>
                                                    <p className={formatType(type)}>{type}</p>
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PokemonForm;