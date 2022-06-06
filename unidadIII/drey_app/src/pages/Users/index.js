import React, { useState, useEffect } from 'react'
import usersLoaded from './users'
import useAPI from '../../hooks/API'
import { useNavigate } from "react-router-dom"

const Users = () => {

  // const { getRequest } = useAPI()
  // const [ pokemons, setPokemons ] = useState([])

  // const loadPokemons = async () => {
  //   let response = await getRequest('https://pokeapi.co/api/v2/pokemon')
  //   setPokemons( response.results )
  // }

  // useEffect( () => {
  //   loadPokemons()
  // }, [] )

  const navigate = useNavigate()
  const [ users, setUsers ] = useState([])

  const loadUsers = () => {
    setUsers( usersLoaded )
  }

  const [shown, setShown] = React.useState(false);
  const [password, setPassword] = React.useState('');
  
  const switchShown = () => setShown(!shown);
  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);

  useEffect( () => {
    loadUsers()
  }, [] )

  const handleRedirect = (id) => {
    console.log(`/users/${id}`)
    // navigate(`/users/${id}`)
  }

  console.log( 'Usuarios', users );


  // result.then( resp => console.log( resp ) )

  return(
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map( (user, index) => {
              return(
                <tr key={ user.id }>
                  <td>[ 
                    <span onClick={ () => handleRedirect(user.id)}>editar</span> 
                    <span>eliminar</span> ]
                  </td>
                  <td>{ user.id }</td>
                  <td>{ user.username }</td>
                  <td><input
        className="password__input"
        id="password__input"
        onChange={onChange}
        placeholder=" "
        type={shown ? 'text' : 'password'}
        value={ user.password } 
      /><button className="password__button" onClick={switchShown}>
                    {shown ? 'Ocultar' : 'Mostrar'}
                  </button></td>
                  <td>{ user.role_id }</td>
                </tr>
              )
            } )
          }
        </tbody>
      </table>
    </>
  )
}

export default Users