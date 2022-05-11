import React from 'react'
import Text from '../../../../components/Text'
import classes from './principal.module.css'

const Principal = () => {
  return(
    <div className={classes.wrapper__principal}>
    <ul className={classes.wrapper__list}>
        <li className={classes.wrapper__li}>Lenguajes Web</li>
        <li className={classes.wrapper__li}>Tecnologías de Programación</li>
        <li className={classes.wrapper__li}>Arquitectura de Software</li>
    </ul>
    </div>
  )
}

export default Principal