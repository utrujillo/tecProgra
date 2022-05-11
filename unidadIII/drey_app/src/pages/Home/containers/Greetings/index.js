import React from 'react'
import Text from '../../../../components/Text'
import classes from './Greetings.module.css'

const Greetings = () => {
  return(
    <div className={classes.wrapper__greetings}>
      <Text title='Bienvenido al sistema Xiadi' css_styles='fs-36 grey-4' />
    </div>
  )
}

export default Greetings