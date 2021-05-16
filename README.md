# Class Component x Fucntion Component

## Apresentação de práticas
Tempo estimado: 60 min

Espaço reservado para apresentação dos projeto solicitado no exercício anterior.
> "Com base nesse exercício crie um projeto em React.js que leia uma lista de objetos e exiba os dado em um tabela."

## Transformando um class component em functional component
Tempo estimado: 60 min

A seguir vamos mostrar como fazer um **refactor** para transformar um código escrito em class component em function component. 

### Refactor

#### Transformar de Classe para Função

Bom, a primeira etapa, é transformar o componente que usava classe, para função. Já que os hooks não funcionam dentro de classes.
~~~ javascript
// antes
export default class Snakke extends Component { ... }

// depois
export default function Snakke(props) { ... }
~~~

- Class Component
~~~ javascript
import React, { Component } from 'react';

class App extends Component {
  alertName = () => {
    alert('John Doe');
  };
  render() {
    return (
      <div>
        <h3>This is a Class Component</h3>
        <button onClick={this.alertName}>
          Alert
        </button>
      </div>
    );
  }
};
export default App;
~~~
- Fucntional Component
~~~ js
import React from 'react'; 

function App() {
  const alertName = () => {
    alert('John Doe');
  };
  return (
    <div>
      <h3>This is a Functional Component</h3>
      <button onClick={alertName}>
        Alert
      </button>
    </div>
  );
};
export default App;
~~~

#### Substituir state pelo useState

Depois dessas duas mudanças, nós começamos a procurar locais onde tenham definições e mudanças de  `state`.

E no caso do código inicial, nós tínhamos a variável  `progress`  que possuía um valor inicial e também recebia uma atualização através do  `this.setState`

~~~ javascript
state = {
  progress: 0
}

this.setState({
  progress: total
})
~~~

Dentro do React Hooks, para trabalhar com estados, nós temos o método  [useState](https://willianjusten.com.br/habemus-react-hooks/#usando-o-hook-de-estados-usestate). E ele funciona da seguinte forma:

~~~ javascript

import React, { useState } from 'react'
const [progress, setProgress] = useState(0)
~~~

- Class Component
~~~ js
import React, { Component } from 'react';
class App extends Component {
  state = {
    name: ''
  }
  alertName = () => {
    alert(this.state.name);
  };
  handleNameInput = e => {
    this.setState({ name: e.target.value });
  };
  render() {
    return (
      <div>
        <h3>This is a Class Component</h3>
        <input
          type="text"
          onChange={this.handleNameInput}
          value={this.state.name}
          placeholder="Your Name"
        />
        <button onClick={this.alertName}>
          Alert
        </button>
      </div>
    );
  }
}
export default App;
~~~
- Functional Component
~~~ js
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('John Doe');
  const alertName = () => {
    alert(name);
  };
  const handleNameInput = e => {
    setName(e.target.value);
  };
  return (
    <div>
      <h3>This is a Functional Component</h3>
      <input
        type="text"
        onChange={handleNameInput}
        value={name}
        placeholder="Your Name"
      />
      <button onClick={alertName}>
        Alert
      </button>
    </div>
  );
};
export default App;
~~~

#### Remover o this e usar as variáveis diretamente

Feito isso, a outra coisa é que todos os lugares que tiverem referências ao  `this`, ou seja, o objeto da classe, não existem mais e você precisa usar ou direto do  `props`  ou a variável direta se for o caso. E variáveis dentro das funções precisam ser assinaladas como tal, usando  `let`  ou  `const`.

~~~ javascript
// antes
styles = {
  ...
  height: this.props.height,
  opacity: this.props.opacity,
  zIndex: this.props.zIndex,
  ...
}

// depois
const styles = {
  ...
  height: props.height,
  opacity: props.opacity,
  zIndex: props.zIndex,
  ...
}
~~~

- Class Component
~~~ js
import React, { Component } from 'react';

class App extends Component {
  state = {
    userName: '',
    firstName: '',
    lastName: ''
  };
  logName = () => {
    console.log(this.state.userName);
    console.log(this.state.firstName);
    console.log(this.state.lastName);
  };
  handleUserNameInput = e => {
    this.setState({ userName: e.target.value });
  };
  handleFirstNameInput = e => {
    this.setState({ firstName: e.target.value });
  };
  handleLastNameInput = e => {
    this.setState({ lastName: e.target.value });
  };
  render() {
    return (
      <div>
        <h3>This is a Class Component</h3>
        <input
          type="text"
          onChange={this.handleUserNameInput}
          value={this.state.userName}
          placeholder="Your Username"
        />
        <input
          type="text"
          onChange={this.handleFirstNameInput}
          value={this.state.firstName}
          placeholder="Your First Name"
        />
        <input
          type="text"
          onChange={this.handleLastNameInput}
          value={this.state.lastName}
          placeholder="Your Last Name"
        />
        <button
          className="btn btn-large right"
          onClick={this.logName}
        >
          Log Names
        </button>
      </div>
    );
  }
}
export default App;
~~~
- Functional Component
~~~ js
import React, { useState } from 'react';

function App() {
  const [userName, setUsername] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const logName = () => {
    console.log(userName);
    console.log(firstName);
    console.log(lastName);
  };
  const handleUserNameInput = e => {
    setUsername(e.target.value);
  };
  const handleFirstNameInput = e => {
    setFirstname(e.target.value);
  };
  const handleLastNameInput = e => {
    setLastname(e.target.value);
  };
  return (
    <div>
      <h3>This is a Functional Component</h3>
      <input
        type="text"
        onChange={handleUserNameInput}
        value={userName}
        placeholder="Your Username"
      />
      <input
        type="text"
        onChange={handleFirstNameInput}
        value={firstName}
        placeholder="Your First Name"
      />
      <input
        type="text"
        onChange={handleLastNameInput}
        value={lastName}
        placeholder="Your Last Name"
      />
      <button
        className="btn btn-large right"
        onClick={logName}
      >
        Log Names
      </button>
    </div>
  );
};
export default App;
~~~
#### Substituir métodos lifecycle por useEffect

Dentro desse componente inicial, nós usávamos o  `componentDidMount`  e  `componentWillUnmount`, que serviam para adicionar/remover o listener de scroll no momento que o componente era montado/desmontado.

Nos hooks, nós podemos substituir essa parte pelo  `useEffect`, ficando dessa forma:

~~~ javascript
// antes
componentDidMount() {
  window.addEventListener('scroll', this.setProgress)
}

componentWillUnmount() {
  window.removeEventListener('scroll', this.setProgress)
}

// depois
useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])
~~~

- Class Component
~~~ js
import React, { Component } from 'react';

class App extends Component {
  state = {
    // initial state
    userName: 'johndoe',
    firstName: 'John',
    lastName: 'Doe'
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        // update state
        userName: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe'
      });
    }, 5000);
  }
  logName = () => {
    console.log(this.state.userName);
    console.log(this.state.firstName);
    console.log(this.state.lastName);
  };
  handleUserNameInput = e => {
    this.setState({ userName: e.target.value });
  };
  handleFirstNameInput = e => {
    this.setState({ firstName: e.target.value });
  };
  handleLastNameInput = e => {
    this.setState({ lastName: e.target.value });
  };
  render() {
    return (
      <div>
        <h3>This is a Class Component</h3>
        <input
          type="text"
          onChange={this.handleUserNameInput}
          value={this.state.userName}
          placeholder="Your Username"
        />
        <input
          type="text"
          onChange={this.handleFirstNameInput}
          value={this.state.firstName}
          placeholder="Your First Name"
        />
        <input
          type="text"
          onChange={this.handleLastNameInput}
          value={this.state.lastName}
          placeholder="Your Last Name"
        />
        <button
          className="btn btn-large right"
          onClick={this.logName}
        >
          Log Names
        </button>
      </div>
    );
  }
}
export default App;
~~~
- Functional Component
~~~ js
import React, { useState, useEffect } from 'react';

function App() {
  const [userName, setUsername] = useState('johndoe');
  const [firstName, setFirstname] = useState('John');
  const [lastName, setLastname] = useState('Doe');

  useEffect(() => {
    setInterval(() => {
      setUsername('janedoe');
      setFirstname('Jane');
      setLastname('Doe');
    }, 5000);
  });
  const logName = () => {
    console.log(userName);
    console.log(firstName);
    console.log(lastName);
  };
  const handleUserNameInput = e => {
    setUsername({ userName: e.target.value });
  };
  const handleFirstNameInput = e => {
    setFirstname({ firstName: e.target.value });
  };
  const handleLastNameInput = e => {
    setLastname({ lastName: e.target.value });
  };
  return (
    <div>
      <h3>This is a Functional Component</h3>
      <input
        type="text"
        onChange={handleUserNameInput}
        value={userName}
        placeholder="Your Username"
      />
      <input
        type="text"
        onChange={handleFirstNameInput}
        value={firstName}
        placeholder="Your First Name"
      />
      <input
        type="text"
        onChange={handleLastNameInput}
        value={lastName}
        placeholder="Your Last Name"
      />
      <button
        className="btn btn-large right"
        onClick={logName}
      >
        Log Names
      </button>
    </div>
  );
};
export default App;
~~~

#### Substituir setState para o método criado no useState

Vimos acima que nós criamos o método  `setProgress`  certo? Ele vai servir para atualizar o  `progress`  quando desejarmos, assim como o  `setState`  fazia. Então, para que tenha essa mudança de estado, falta chamar esse método no seu devido lugar, passando o novo valor.

~~~ javascript
// antes
...
this.setState({
  progress: total,
})

// depois
...
setProgress((window.scrollY / bodyHeight) * 100)
~~~

- Class Component
~~~ js
import React, { Component } from 'react';

class App extends Component {
  state = {
    header: 'Welcome to React Hooks'
  }
  componentDidMount() {
    const header = document.querySelectorAll('#header')[0];
    setTimeout(() => {
      header.innerHTML = this.state.header;
    }, 3000);
  }
  componentDidUpdate() {
    const node = document.querySelectorAll('#header')[0];
    node.innerHTML = this.state.header;
  }
  handleHeaderInput = e => {
    this.setState({ header: e.target.value });
  };
  render() {
    return (
      <div>
        <h3 id="header">This is a Class Component</h3>
        <input
          type="text"
          onChange={this.handleHeaderInput}
          value={this.state.header}
        />
      </div>
    );
  }
}
export default App;
~~~
- Functional Component
~~~ js
import React, { useState, useEffect } from 'react';

function App() {
  const [header, setHeader] = useState('Welcome to React Hooks');
  useEffect(() => {
    const newheader = document.querySelectorAll('#header')[0];
    setTimeout(() => {
      newheader.innerHTML = header;
    }, 3000);
  });
  const handleHeaderInput = e => {
    setHeader(e.target.value);
  };
  return (
    <div>
      <h3 id="header">This is a Functional Component</h3>
      <input
        type="text"
        onChange={handleHeaderInput}
        value={header}
      />
    </div>
  );
};
export default App;
~~~

## Exercício
Tempo estimado: 60 min

Faça a transformação do código do dia aula anterior de class component para fucntional component. 

## Referências
https://willianjusten.com.br/convertendo-um-class-based-component-para-react-hooks/

https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks

