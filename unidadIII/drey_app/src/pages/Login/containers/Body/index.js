import React from 'react'
import Text from '../../../../components/Text'
import classes from './Body.module.css'
const Body = () => {
    return(
      <div className={classes.wrapper__body}>
        <div className={classes.wrapper__logo}>
          <img src={require('../../../../assets/img/logoinicio.png')} className={classes.logo} />
        </div>
        
        <div className={classes.wrapper__right}>
            <div className={classes.wrapper__logoUser}>
            <img src={require('../../../../assets/img/user.png')} className={classes.logo}/> <br/>
            </div>
            <div>
            <br/><input type="text" placeholder="UserName" /> <br/>
            <input type="text" placeholder="PassWord" /> <br/>
            </div>
            <div >
            <br/><Text title='Remenber me' css_styles='fs-10 grey-5' /> <br/>
            </div>
            <div className={classes.wrapper__button}>
                <button> Login</button>
            </div>
        </div>
      </div>
    )
  }
  export default Body