import React, { useState, useEffect } from 'react'



//import Table from './containers/index'

const Versus = () => {


    const url = 'http://127.0.0.1:8000/drey/v1/Alumno/'
    const [alumnos, setAlumnos] = useState()

    const load = async () => {
        const response = await fetch(url)
        const responseJSON = await response.json()

        setAlumnos(responseJSON)
      
    }

    useEffect(() => {
        load()
    }, [])

    

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>nombre</th>
                        <th>Apellidos</th>
                    </tr>
                </thead>
                <tbody>
                {
            alumnos.map( (alumno, index) => {
              return(
                <tr>
                  <td></td>
                  <td>{ index + 1 }</td>
                  <td>{ alumno.nombre }</td>
                
                </tr>
              )
            } )
          }
                </tbody>
            </table>
        </>
    )
}

export default Versus
