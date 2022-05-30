import React, { useState, useEffect } from 'react'
import useAPI from '../../hooks/API'

const Users = () => {

  const { getRequest } = useAPI()
  const [ pokemons, setPokemons ] = useState([])

  const loadPokemons = async () => {
    let response = await getRequest('https://pokeapi.co/api/v2/pokemon')
    setPokemons( response.results )
  }

  useEffect( () => {
    loadPokemons()
  }, [] )

  console.log( pokemons )
  // result.then( resp => console.log( resp ) )

  return(
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>nombre</th>
          </tr>
        </thead>
        <tbody>
          {
            pokemons.map( (pokemon, index) => {
              return(
                <tr>
                  <td>[ editar, eliminar ]</td>
                  <td>{ index + 1 }</td>
                  <td>{ pokemon.name }</td>
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