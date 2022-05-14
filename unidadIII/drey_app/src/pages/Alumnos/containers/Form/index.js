import React, { useState } from 'react'
import Text from '../../../../components/Text'
import data from './fakeTableData.js'

import classes from './Greetings.module.css'

const Form = () => {

  const [ search, setSearch ] = useState('')
  const inputChange = ( e ) => {
    setSearch( e.target.value )
  }

  return(
  <div className={classes.wrapper__greetings}>
    
    <Text title='Bienvenido al sistema' css_styles='fs-36 grey-4' />

    
    <table>
      <thead>
        <tr>
          <th>Habilidad</th>
          <th>Puntuacion</th>
          <th>Herramientas</th>
        </tr>
      </thead>

      <tbody>
        {
          data.map( item => (
              <tr key={item.id}>
                <td>{ item.Nombre }</td>
                <td>{ item.Apellidos }</td>
                <td><img src={require('../../../../assets/img/basura.png')} className={classes.logo} /></td>
              </tr>
            ) )
        }
        
      </tbody>
    </table>



    
  </div>
  )
}

export default Form