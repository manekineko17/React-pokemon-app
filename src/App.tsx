import React, { FunctionComponent, useState } from 'react';

//constante contenant une fonction (fonction fléchée => )
const App: FunctionComponent = () => {
    const [name, setName] = useState<String>('React');

    return (
        <h1>Bonjour, {name} !</h1>
    )
}

export default App;