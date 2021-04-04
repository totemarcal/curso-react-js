import React from 'react';
import './App.css';
import Contador from './components/Contador'
import LabelCronometro from './components/LabelCronometro'

function App() {
  return (
    <div>
      <LabelCronometro name="Cronometro"/>
      <Contador />
    </div>
    
  );
}

export default App;
