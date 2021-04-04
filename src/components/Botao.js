import React from 'react'

const Botao = (props) => (
    <button onClick={props.onClick}>{props.label}</button>
)

export default Botao