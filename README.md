# Cronômetro em React.js

Nesta aula iremos criar um cronômetro utilizando React.js acordando os principais conceitos. A seguir, temos um tutorial de como criar um projeto de um cronômetro utilizando React.js.

## Criando um projeto
Tempo estimado: 20 min.

Primeiro crie um projeto React com o nome de react-hooks-crud-bootstrap e depois teste.
> npx create-react-app react-hooks-crud-bootstrap
> 
> cd react-hooks-crud-bootstrap
> 
> yarn start

## Projeto de Cronômetro: contador
Tempo estimado: 30 min

Vamos iniciar nosso projeto de cronômetro criando a parte do contador onde os segundos serão incrementados e a cada 5 segundos os minutos serão adicionados.

### Componente LabelCronometro

Primeiramente vamos criar um componente chamado **LabelCronometro**. Para isso, navegue até a pasta **src** do projeto e crie a pasta **components**. Dentro da pasta **components** crie o arquivo **LabelCronometro.js** e adicione o código abaixo:

~~~ js
import React from 'react';
import '../App.css';

const LabelCronometro = (props) => (
    <h1 class="my-title">{props.name}</h1>
)
export default LabelCronometro
~~~

### Componente Contador
Para isso, navegue até a pasta **src/components**, crie o arquivo **Contador.js** e adicione o código abaixo:

~~~ js
import React, {useState, useEffect} from 'react'
import LabelCronometro from './LabelCronometro'

const Contador = (props) => {
    const [segundos, setSegundos] = useState(0)
    const [minutos, setMinutos] = useState(0)
    
    const incrementar = () => {   
        setSegundos(segundos+1)
    }
    const zerar = () => {
        setSegundos(0)
    }
    const incrementarMinutos = () => {
        setMinutos(minutos + 1)
    }
    
    useEffect(() => {
        let id = setInterval(() => {
            incrementar()
        }, 1000)
        return () => clearInterval(id);   
    })
    useEffect(() => {
        if (segundos >= 5){
            zerar()
            incrementarMinutos()
        }
    }, [segundos])

    return(
            <div>
                <LabelCronometro name={minutos+":"+segundos}/>
            </div>
        )
}
export default Contador
~~~
No início do componente criamos os state `segundos` e `minutos` .  A função `incrementar` altera o valor do state `segundos` adicionando mais um segundo (`setSegundos(segundos+1)`) e função `zerar()` atribui '0' ao state `segundos` (`setSegundos(0)`). A função `incrementarMinutos` altera o valor do state `minutos` adicionando mais um minuto (`setMinutos(minutos + 1)`). A primeira função `useEffect` é executada na criação do componente  e invoca `setInterval` passando como parâmetro  a função `incrementar()` e o valor `1000`. Assim, a função `incrementar()`vai atualizar o state `segundos` a cada `1000` milissegundos (ou 1 segundo). A segunda função `useEffect` cria um efeito colateral que toda vez que o state `segundos` for atualizado irá verificar se o valor de `segundos` é maior ou igual a 5 sendo verdadeiro chama as funções `zerar()` e `incrementarMinutos()`. Por fim, a função `return` invoca o componente `LabelCronometro` passando como **props** os minutos e segundos `<LabelCronometro name={minutos+":"+segundos}/>`.

> O método **`setInterval()`** oferecido das interfaces [`Window`](https://developer.mozilla.org/pt-BR/docs/Web/API/Window) e [`Worker`](https://developer.mozilla.org/pt-BR/docs/Web/API/Worker), repetem chamadas de funções or executam trechos de código, com um tempo de espera fixo entre cada chamada. Isso retorna um ID único para o intervalo, podendo remove-lo mais tarde apenas o chamando [`clearInterval()`  (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval "Currently only available in English (US)").

## Projeto de Cronômetro: stop/play e zerar
Tempo estimado: 30 min

Agora vamos adicionar ao cronometro os botões de **stop/play** para poder parar o cronômetro e retomar o cronômetro e **zerar** para zerar o cronômetro.

### Componente Botao
Para isso, navegue até a pasta **src/components**, crie o arquivo **Botao.js** e adicione o código abaixo:

~~~ js
import React from 'react'

const Botao = (props) => (
    <button onClick={props.onClick}>{props.label}</button>
)
export default Botao
~~~

O componente **Botao.js** possui um `<button />` recebendo como **props** o texto do botão `props.label` e a função que será executada no click do botão `props.onClick`.

### Componente Contador
Para adicionar os botões precisamos alterar o arquivo **Contador.js** para adicionar as funções e colocar os botões.

1. Importe o componente **Botao** no arquivo: 
~~~ js
import  Botao  from  './Botao'
~~~
2. Adicione dois novos states `stop` e `nameStop`:

~~~ js
const [stop, setStop] = useState(false)
const [nameStop, setNameStop] = useState("Stop")
~~~

3. Altere a função `incrementar()` para verificar se o state `stop` é `false`. Caso seja, não deve executar a função `incrementar()`:

~~~ js
const incrementar = () => {   
    if(stop==false){
        setSegundos(segundos+1)
    }
}
~~~

4. Crie a função `zerarCronometro` para atribuir o valor '0' aos states `segundos` e `minutos`:

~~~js
const zerarCronometro = () => {
    setSegundos(0)
    setMinutos(0)
}
~~~

5. Crie a função `pararTempo` onde irá alterar o state `stop` de `true` para `false` ou vice-versa. Caso o state `stop` seja `true` o nome do botão seja **Stop** senão será **Play**.

~~~ js
const pararTempo = () => {
    setStop(!stop)
    if(stop)
    {
        setNameStop("Stop")
    }else
    {
        setNameStop("Play")
    } 
}
~~~
6. Por fim, na função `return` vamos adicionar os botões de **stop/play** e **zerar**. No botão **zerar** vamos invocar a função `zerarCronometro()` no botão **stop/play** vamos invocar `pararTempo()`.

~~~ js
<Botao onClick={() => {zerarCronometro()}} label="Zerar" />
<Botao onClick={() => {pararTempo()}} label={nameStop} />
~~~

## Projeto de Cronômetro: parciais

...

### Componente LabelParcial
Navegue até a pasta **src/components**, crie o arquivo **LabelParcial.js** e adicione o código abaixo:

~~~js
import React from 'react';
import '../App.css';

const LabelParcial = (props) => 
    {
        return(
            <ul>
                {props.items.map((item, index) => (
                <li>{item}</li>
                ))}
            </ul>
        )
    }
export default LabelParcial
~~~
No componente **LabelParcial.js** a função **map** retorna uma lista html `<li>` para cada item do array recebido via `props.items`.

### Componente Contador
Vamos adicionar o botão de parciais e a lista de parciais. Para isso precisamos alterar o arquivo **Contador.js**:

1. Importe o componente **Botao** no arquivo: 
~~~ js
import  LabelParcial  from  './LabelParcial'
~~~

2. Adicione o state `parcial`:

~~~ js
const [parcial, setParcial] =  useState([])
~~~
3. Crie a função `parciais()` para adicionar ao state de lista `parcial` (`setParcial([...parcial, p])`).

~~~js
const parciais = () => {
    let p = minutos + ":" + segundos
    setParcial([...parcial, p])
}
~~~
4. Altere a função `zerarCronometro()` para limpas o state de lista `parcial` (`setParcial([])`).

~~~js
const zerarCronometro = () => {
    setSegundos(0)
    setMinutos(0)
    setParcial([])
}
~~~

5. Por fim, na função `return` vamos adicionar o botão **Parcial** e lista de parciais. No botão **Parcial** vamos invocar a função `parciais()` e a lista de parciais `<LabelParcial />` passando via **props** o state de lista  `parcial`.

~~~ js
<Botao  onClick={() => {parciais()}}  label="Parcial"  />
<LabelParcial  items={parcial}/>
~~~

## Exercício
Tempo estimado: 70 min

Crie um Temporizador com os seguintes requisitos: 
- Um contador decrescente de tempo com hh:mm:ss;
- Botão de play/pause, onde o **pause** pára o temporizador e o **play** retoma o temporizador
- Botão de **stop** zera o temporizador.


## Referência
https://pt-br.reactjs.org/docs/getting-started.html
