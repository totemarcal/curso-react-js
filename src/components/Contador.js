import React, {useState, useEffect} from 'react'
import Botao from './Botao'
import LabelCronometro from './LabelCronometro'
import LabelParcial from './LabelParcial'
const Contador = (props) => {
    const [segundos, setSegundos] = useState(0)
    const [minutos, setMinutos] = useState(0)
    const [stop, setStop] = useState(false)
    const [nameStop, setNameStop] = useState("Stop")
    const [parcial, setParcial] = useState([])
    const incrementar = () => {   
        if(stop==false){
            setSegundos(segundos+1)
        }
    }
    const zerar = () => {
        setSegundos(0)
    }
    const incrementarMinutos = () => {
        setMinutos(minutos + 1)
    }
    const zerarCronometro = () => {
        setSegundos(0)
        setMinutos(0)
        setParcial([])
    }
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
    const parciais = () => {
        let p = minutos + ":" + segundos
        setParcial([...parcial, p])
    }
    useEffect(() => {
        if (segundos >= 5){
            zerar()
            incrementarMinutos()
        }
    }, [segundos])
    useEffect(() => {
        let id = setInterval(() => {
            incrementar()
        }, 1000)
        return () => clearInterval(id);   
    })
    return(
            <div>
                <LabelCronometro name={minutos+":"+segundos}/>
                <Botao onClick={() => {zerarCronometro()}} label="Zerar" />
                <Botao onClick={() => {pararTempo()}} label={nameStop} />
                <Botao onClick={() => {parciais()}} label="Parcial" />
                <LabelParcial items={parcial}/>
            </div>
        )
}
export default Contador