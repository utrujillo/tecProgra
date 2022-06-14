import React, {useReducer} from 'react'
import Encabezado from './components/Encabezado'
import { AuthContext } from '../pages/Login/AuthContext'
import axios from 'axios'
import { authReducer,  LOGIN } from '../reducers/authReducer'


const App = () => {
  const [data, dispatch] = useReducer(authReducer, {token:null})
  const loginThunk = async (username, password) => {
    const res = await axios.post(
      'http://localhost:8000/auth/',
      {username: username, password: password}
    )
    dispatch({ type:LOGIN, token:res.data.token })
  }
  return(
    <AuthContext.Provider value={{
      data,
      loginThunk  
    }}>

    </AuthContext.Provider>
  )
}

export default App