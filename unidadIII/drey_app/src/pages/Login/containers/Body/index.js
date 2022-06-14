import React, { useContext, useState } from 'react'
import Text from '../../../../components/Text'
import classes from './Body.module.css'
// import { Button } from 'react-bootstrap  '
import { AuthContext } from '../../AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {
    const { loginThunk }  = useContext(AuthContext)
    const [formState, setFormState]=useState({
        username:'',
        password:''
    })  
    
    const history = useNavigate()
    
    const {username, password} = formState

    const handleInputChange = ({target}) => {
      setFormState({
        ...formState,
        [target.name]: target.value
      })
    }
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
            <br/><input name='username' 
            type="text" 
            placeholder="UserName" 
            value={username}
            onChange={handleInputChange}/> <br/>

            <input name='password' 
            type="text" 
            placeholder="PassWord" 
            value={password}
            onChange={handleInputChange}/> <br/>
            </div>
            <div >
            <br/><Text title='Remenber me' css_styles='fs-10 grey-5' /> <br/>
            </div>
            <div className={classes.wrapper__button}>
                <button 
                variant = 'primary' 
                type='submit' 
                onClick={ (e) => {
                  e.preventDefault()
                  loginThunk(formState.username, formState.password)
                      .then(() =>{
                          history.push('/')
                      })
                }}> 
                Login</button>
            </div>
        </div>
      </div>
    )
  }
  
  export default LoginComponent