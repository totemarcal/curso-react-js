
# Crie um projeto React.js com Github

Acesse ao site [github.com](https://github.com/), caso não tenha uma conta faça uma.

## Criando um projeto
Tempo estimado: 20 min.

Primeiro crie um projeto React com o nome de react-hooks-crud-bootstrap e depois teste.
> npx create-react-app react-hooks-crud-bootstrap
> 
> cd react-hooks-crud-bootstrap
> 
> yarn start

## "Codando" nosso projeto
Vamos codar nosso projeto usando class Component.

### Criando uma tabela de produtos
Tempo estimado: 50 min.

1. Crie uma pasta `components` dentro da pasta `src`.
2. Crie o arquivo `ProductRow.js` dentro da pasta `src/components` e adicione o seguinte código. O componente `ProductRow.js` cria uma linha na tabela que é exibida, caso a lista de produtos `this.props.product` recebida via **props** o nome do produto é exibido na cor `red` em `const name = product.stocked ? product.name : ... `.
~~~ javascript
import React from 'react'
import ProductRow from './ProductRow'

class ProductTable extends React.Component {
    render() {
      const rows = [];
      this.props.products.forEach((product) => {
        rows.push(
          <ProductRow
            product={product}
            key={product.name}
          />
        );
      });
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  export default ProductTable
  ~~~
3. Crie o arquivo `ProductTable.js` dentro da pasta `src/components` e adicione o seguinte código. A tabela de produto recebe o **props** `this.props.products`. Em `this.props.products.forEach((product) => {` para item da lista de produtos será criado `<ProductRow />`. O método `return` cria uma tabela com as colunas `Name`e `Price` e o `tbody` adicionas as linhas da tabela com o componente `<ProductRow />`.
	 
~~~ javascript
import React from 'react'
import ProductRow from './ProductRow'

class ProductTable extends React.Component {
    render() {
      const rows = [];
      this.props.products.forEach((product) => {
        rows.push(
          <ProductRow
            product={product}
            key={product.name}
          />  
        );
      });
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  export default ProductTable

~~~
4. Crie o arquivo `FilterableProductTable.js` dentro da pasta `src/components` e adicione o seguinte código. O componente `<ProductTable`é invocado para exibir a tabela de produtos.
~~~ javascript
import React, {Component} from 'react'
import ProductTable from './ProductTable'

class FilterableProductTable extends React.Component {
    render() {
      return (
        <div> 
          <ProductTable
            products={this.props.products}
          />
        </div>
      );
    }
  }
export default FilterableProductTable
~~~
5. Altere o arquivo `App.js` para o código abaixo.  O componente `<FilterableProductTable`é invocado para exibir a tabela de produtos e uma lista de procutos `PRODUCTS` é criado.
~~~ javascript
import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import FilterableProductTable from './components/FilterableProductTable'

function App() {
  return (
    <FilterableProductTable products={PRODUCTS} />
  );
}
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
export default App;
~~~
6. Salve todos os arquivos e execute.
> `yarn start`

### Adicionando filtros na tabela 
Tempo estimado: 50 min.

7. Crie o arquivo `SearchBar.js` dentro da pasta `src/components` e adicione o seguinte código. Para o `input` cada valor digitado é atribuído ao **props** `this.props.filterText` e o `checkbox` é atribuído ao **props** `this.props.inStockOnly`. O método `handleFilterTextChange` invoca outro método via **props** chamado `this.props.onFilterTextChange` o mesmo ocorre com o método `handleInStockChange` via o **props** `this.props.onInStockChange`.

~~~ javascript
import React from 'react'

class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
    }
    handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
    }
    handleInStockChange(e) {
      this.props.onInStockChange(e.target.checked);
    }
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
          <p>
            <input
              type="checkbox"
              checked={this.props.inStockOnly}
              onChange={this.handleInStockChange}
            />
            {' '}
            Only show products in stock
          </p>
        </form>
      );
    }
  }
  export default SearchBar
~~~
8. Altere o import do arquivo `FilterableProductTable.js`
~~~ javascript
import  SearchBar  from  './SearchBar'
...
~~~
9. Adicione o construtor no arquivo `FilterableProductTable.js` criando os **states**  `filterText` e `inStockOnly` criando também os **binds** `this.handleFilterTextChange` e `this.handleInStockChange` que são responsáveis por alterar o valor dos **states** criados.

~~~ javascript
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',
        inStockOnly: false
      };
      
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleInStockChange = this.handleInStockChange.bind(this);
    }
  
    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }
    
    handleInStockChange(inStockOnly) {
      this.setState({
        inStockOnly: inStockOnly
      })
    }
~~~

10. Altere o método `render` do arquivo `FilterableProductTable.js` para adicionar o componente `SearchBar.js`
~~~ javascript
...
return (
        <div> 
        <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onInStockChange={this.handleInStockChange}
          />
          ...
       )
~~~
11. Altere o arquivo `ProductTable` para tratar adicione o import abaixo:
 ~~~ javascript
 import ProductCategoryRow from './ProductCategoryRow';
~~~ 

12. Em seguida, crie as **const** `filterText` e `inStockOnly` no método `render` que recebem o valor via **props**. No `foreach` é adicionado duas condições que filtra a geração de linhas na tabela de produtos. A terceira condição adicionada cria uma linha na tabela de produtos adicionando o componente `<ProductCategoryRow` .

~~~ javascript
   ...
   render() {
	  const filterText = this.props.filterText;
      const inStockOnly = this.props.inStockOnly;
      let lastCategory = null;
      const rows = [];
      this.props.products.forEach((product) => {
        if (product.name.indexOf(filterText) === -1) {
          return;
        }
        if (inStockOnly && !product.stocked) {
          return;
        }
        if (product.category !== lastCategory) {
          rows.push(
            <ProductCategoryRow
              category={product.category}
              key={product.category} />
          );
        }
        rows.push(
          <ProductRow
            product={product}
            key={product.name}
          />
        );
        lastCategory = product.category;
      });	
      return (
      ...
	      
~~~

13. Crie o arquivo `ProductCategoryRow.js` dentro da pasta `src/components` e adicione o seguinte código. O componente `ProductCategoryRow` cria uma linha na tabela fazendo a junção de duas colunas.
~~~ javascript
import React from 'react'

class ProductCategoryRow extends React.Component {
    render() {
      const category = this.props.category;
      return (
        <tr>
          <th colSpan="2">
            {category}
          </th>
        </tr>
      );
    }
}
export default ProductCategoryRow
~~~

14. Salve todos os arquivos e execute.
> `yarn start`

## Exercício
Com base nesse exercício crie um projeto em React.js que leia uma lista de objetos e exiba os dado em um tabela.
