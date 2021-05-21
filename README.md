
# React.js
Nesta aula vamos introduzir o básico a respeito do React.js.

## O que é React?	
Tempo estimado: 30 min.

React é uma biblioteca JavaScript declarativa, eficiente e flexível para a criação de interfaces de usuário (UI). O modo como o React trabalha para criar interfaces de usuário (ou User Interfaces, as UIs) é por meio da quebra de toda a estrutura da aplicação em componentes. O que o React propõe é o contrário: separar todo o código em pequenas partes (em arquivos diferentes), que se comportam como componentes reutilizáveis.

É  uma lib open-source com mais de 1k de colaboradores ativos no GitHub. Ele está presente no nosso dia-a-dia mais do que você imagina, em empresas grandes como Facebook, Instagram, AirBnB, NFL, Yahoo e muito mais.

### DOM & DOM Virtual

O Modelo de Documento por Objetos (do inglês Document Object Model), como o próprio nome já diz, é uma representação do documento. Assim que a página é carregada, o navegador cria o HTML DOM.

Atua como uma cópia do DOM, que pode ser atualizada com frequência sem nos acarretar problemas, e sem utilizar a API do DOM original. Depois que todas as alterações — que devem ser persistidas no DOM — são finalizadas, ela será feita no DOM original da melhor maneira possível, nos evitando custos desnecessário, de maneira otimizada.
![enter image description here](https://i.pinimg.com/originals/ec/84/3d/ec843d80f5ccd17d5653f5e601403850.jpg)

### Declarativo
React faz com que a criação de UIs interativas seja uma tarefa fácil.  Crie views simples para cada estado na sua aplicação, e o React irá atualizar e renderizar de forma eficiente apenas os componentes necessários na medida em que os dados mudam. Views declarativas fazem com que seu código seja mais previsível e simples de depurar.

### Baseado em componentes
Com React criamos componentes encapsulados que gerenciam seu próprio estado e então, combine-os para criar UIs complexas. Como a lógica do componente é escrita em JavaScript e não em templates, você pode facilmente passar diversos tipos de dados ao longo da sua aplicação e ainda manter o estado fora do DOM.

### Aprenda uma vez, use em qualquer lugar
Não fazemos suposições sobre as outras tecnologias da sua stack, assim você pode desenvolver novos recursos com React sem reescrever o código existente. O React também pode ser renderizado no servidor, usando Node, e ser usado para criar aplicações mobile, através do React Native.

## Criando um projeto
Tempo estimado: 30 min.

Primeiro crie um projeto React com o nome de react-hooks-crud-bootstrap e depois teste.
> npm install --global yarn
> 
> npx create-react-app react-hooks-crud-bootstrap
> 
> cd react-hooks-crud-bootstrap
> 
> yarn start

## Conhecendo o projeto
Vamos examinar a estrutura de um projeto React.js conhecendo as funções dos principais arquivos.

- **package.json**: lista as dependências do projeto e possui alguns aliases para os scripts envolvidos no build:
 -- **start**: Inicia o build no modo de desenvolvimento.
-- **build**: Executa o build do projeto otimizado para produção.
-- **test**: Executa os testes do projeto.
-- **eject**: Traz para dentro do nosso projeto, toda a configuração que o react-scripts abstrai.

- **index.html**: O arquivo index.html vem com a marcação mínima necessária para iniciar nossa aplicação. A tag div com o id root será utilizada pelo React para renderizar nossa aplicação
- **index.js**: ele que ocorre a inicialização da nossa aplicação. Importando o ReactDOM, o módulo do React responsável pela manipulação do DOM.

- **src/App.js**: contém o componente raiz da aplicação. O componente acima é definido com a class e extende a classe Component do React. 

Existem duas formas de definir componentes, através de functions ou através de class.  Um componente deve sempre implementar um método render, que retorna um JSX do que deve ser mostrado na tela, ou null quando não deve mostrar nada.

## React “Puro”
Tempo estimado: 30 min.

A seguir vamos mostrar como é utilizar o React de forma "pura", sem o uso do JSX e de outros artifícios que facilitam o desenvolvimento. Cria e retorna um novo [elemento React](https://pt-br.reactjs.org/docs/rendering-elements.html) do tipo determinado. O argumento `type` pode ser uma _string_ contendo a _tag name_ (como, por exemplo, `'div'` ou `'span'`), um [componente React](https://pt-br.reactjs.org/docs/components-and-props.html) (uma classe ou uma função).
~~~ javascript
import './App.css';
import React from 'react'

const TitleWithClass = React.createElement(
  'h1',
  {class: 'my-title'},
  'Olá!'
)  
 const OurList = React.createElement(
   'ul',
   null,
   [
    React.createElement('li', null, 'item 01'),
    React.createElement('li', null, 'item 02'),
    React.createElement('li', null, 'item 02'),
   ]
 )
 class App extends React.Component{
   render(){
     return React.createElement(
       'div',
       {class: 'my-wrapper'},
        [TitleWithClass, OurList]
     )
   }
 }
export default App;

~~~

## JSX
Tempo estimado: 30 min.

JSX é uma extensão de sintaxe para JavaScript.  Pode lembrar uma linguagem de template, mas que vem com todo o poder do JavaScript. O JSX possui uma sintaxe muito semelhante ao HTML.

~~~ javascript
import './App.css';
import React from 'react'

const TitleWithClass = () => (
 <h1 class="my-title">Olá!</h1>
)  
const OurList = () => (
  <ul>
    <li>item 01</li>
    <li>item 02</li>
    <li>item 03</li>
  </ul>
)
class App extends React.Component{
  render(){
    return (
	<div class="my-wrapper">
		<TitleWithClass />
		<OurList />
	</div>	
	)
  }
}
export default App;
~~~

## State e Props
Tempo estimado: 60 min.

**State** são dados privados e completamente controlado pelo componente.  O estado de uma aplicação nada mais é que as informações armazenadas no nosso programa em um determinado tempo. Um **state** é declarado no construtor do componente. O método **this.state()** é responsável por atualizar o valor de um state e automaticamente o componente é renderizado com o novo valor do state.

**Props** é uma abreviação de properties, ou propriedades, são informações que podem ser passadas para um componente. Pode ser uma string, um número, até mesmo uma função.

No exemplo abaixo vamos mostrar como utilizar **state** e **props**.   Crie um arquivo com o nome de **TodoList.js** e adicione o código abaixo.
~~~ javascript
import './App.css';
import React from 'react'

class TodoList extends React.Component {
    render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      );
    }
  }
export default TodoList
~~~
O componente **TodoList.js** recebe via **props** uma lista `this.props.items` e uma função **map** monta para cada item da lista uma tag `<li>`.

Altere o arquivo `App.js` com o código abaixo. A classe `App` possui um `constructor` onde é possível criar **states** com `this.state`.  No código a seguir `this.state = { items: [], text: '' };` criamos dois **states**: uma lista chamada `items` e outro chamado `text`.  Em `this.handleChange = this.handleChange.bind(this);`são criada métodos de eventos passado o `this`como contexto desse método, assim o método pode utilizar o `this,state` e o `this,props`.

> O que é o bind?
> Imagine a situação em que você esteja passando funções/eventos com a chamada `.bind` visando definir uma ação para os botões de cada item de uma lista que você esteja criando lá dentro do metodo `render`. Acontece que em JavaScript, quando o método `bind` recebe o seu primeiro argumento `this` em sua chamada, isso é justamente para definir explicitamente quem chamou aquela função, ou seja, o contexto no qual você quer que essa função seja executada. Assim o método `bind` retorna uma função novinha em folha que retorna uma chamada a sua função original forçando esse `this`, ou seja, fazendo com que a função original reconheça quem for que seja o argumento `this` como quem a chamou, consequentemente quem é o seu contexto de chamada.
> 
~~~ javascript
import './App.css';
import React from 'react'
import TodoList from './TodoList'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <div>
        <h3>Tarefas</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            O que precisa ser feito?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Adicionar #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}
export default App;
~~~
O método `render()` é obrigatório para um class **React.Component**. Na linha `<TodoList items={this.state.items} />` é invocado o componente **TodoList** criado anteriormente passando o state `items`.  O forma criado invoca o método `handleSubmit` na linha `<form onSubmit={this.handleSubmit}>`. O método `handleSubmit` cria um objeto com o texto informado na página e a data do instante e adiciona no state `this.state.items`. O método `handleChange` altera o state em `this.setState({ text: e.target.value })` cada vez que for digitado algo no input  `new-todo`.  


## Referência
https://pt-br.reactjs.org/docs/getting-started.html

https://medium.com/tableless/https-medium-com-tableless-react-this-bind-so-sei-que-e-assim-73e75f2adbd3

