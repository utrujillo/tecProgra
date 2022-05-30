import React from 'react'
import Encabezado from './components/Encabezado'

const App = () => {
  return(
    <>
      <Encabezado text='MSC Gen. 2021' css_styles={ {"background": "blue"} } />
      <h1>Hola mundo</h1>
      <h5>Saludos</h5>
      <Encabezado text='Generacion 2018' css_styles={ {"background": "red"} } />
    </>
  )
}

export default App