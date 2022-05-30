import React, { useState } from 'react'
import data from './fakeTableData.js'

const Form = () => {

  const [search, setSearch] = useState('') //parametros de busqueda
  const inputChange = (e) => {
    setSearch(e.target.value)
  }

  //const busqueda =  data.filter(item => item.ability.toLowerCase().indexOf(search.toLowerCase()) > -1)



  return (
    <div>
      <input type="text" placeholder="Search" value={search} onChange={inputChange} />
      <input type="button" value="Ok"
        onClick={() => { console.log(search) }} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Habilidad</th>
            <th>Puntuacion</th>
          </tr>
        </thead>

        <tbody>
          {
            data.filter(item => item.ability.toLowerCase().indexOf(search.toLowerCase()) > -1).map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.ability}</td>
                <td>{item.score}</td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  )
}

export default Form