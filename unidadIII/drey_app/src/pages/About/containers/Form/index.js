import React, {useState, useEffect} from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [result, setResult] = useState("");


   useEffect(() => {
    const fetchData = async ()=> {
       try{
         const resp= await axios.get('http://127.0.0.1:8000/drey/v1/Alumno/');
         
         setData(resp.data);
         setSearchFilter(resp.data);
         let sortedData = resp.data.sort(() => Math.random() - 0.5);
          console.log(sortedData);
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
    <input type="text" placeholder="Search" value={result}  onChange={ onChange } />
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

