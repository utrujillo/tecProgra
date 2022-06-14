import React, {useState, useEffect} from "react";
import axios from "axios";
import Search from "../../../../components/Search";

export default function App() {
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [result, setResult] = useState("");

  const numbers = [{id: 5, ApellidoP: 'HERNANDEZ', ApellidoM: 'MEJIA', nombre: 'DOGGY', semestre: 2},
    {id: 4, ApellidoP: 'PERALTA', ApellidoM: 'ARRECHIGA', nombre: 'SAMUEL', semestre: 2},
    {id: 3, ApellidoP: 'MURILLO', ApellidoM: 'VARGAS', nombre: 'JUAN', semestre: 2}];

  useEffect(() => {
    const fetchData = async ()=> {
      try{
        const resp= await axios.get('http://127.0.0.1:8000/drey/v1/Alumno/');

        setData(resp.data);
        setSearchFilter(resp.data);
        let sortedData = resp.data.sort(() => Math.random() - 0.5);
          console.log(sortedData[0].nombre);
       }
  catch(err){
   throw new Error(err);
        }
     };
     fetchData();
   },[]);

  

  const onChange = (evt) => {
  setResult(evt.target.value);
  }

  return (
    <div>
    <Search value={result}  onChange={onChange}/> 
    <input type="button" value="Ok"
      onClick={ () => { console.log( result ) } } />
    <table>
      <thead>
        <tr>
          <th>ID</th>
         
        </tr>
      </thead>
      <tbody>
      {
          data
          .filter(item => item.nombre.toLowerCase().indexOf(result.toLowerCase()) > -1)
            .map( item => (
              <tr key={item.id}>
                <td>{ item.nombre}</td>
               
              </tr>
            ) )
        }     
      </tbody>
    </table>
  </div>
  );
}
