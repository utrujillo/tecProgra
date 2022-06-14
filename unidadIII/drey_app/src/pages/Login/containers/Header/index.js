import React from 'react'
import Text from '../../../../components/Text'
import classes from './Header.module.css'

const Header = () => {
  return(
    <div className={classes.wrapper__header}>
      <div className={classes.wrapper__logo}>
        <img src={require('../../../../assets/img/logo.png')} className={classes.logo} />
      </div>
      <Text title='Derrocando al rey' css_styles='fs-26 grey-1' />
      <div></div>
    </div>
  )
}

export default Header