import React from 'react'
import Text from '../Text'
import classes from './Header.module.css'

const Header = () => {
  return(
    <div className={classes.wrapper__header}>
      <div className={classes.wrapper__logo}>
        <img src={require('../../assets/img/logo.png')} className={classes.logo} />
      </div>
      <Text title='Derrocando al Rey' css_styles='fs-26 grey-1 textTitle' />
      <div className={classes.wrapper__logoUser}>
        <img src={require('../../assets/img/user.png')} className={classes.logoUser} />
      </div>
    </div>
  )
}

export default Header