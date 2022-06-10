import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



const url="http://127.0.0.1:8000/drey/v1/Jugada/";
const urlGrupo="http://127.0.0.1:8000/drey/v1/Grupo/";
const urlAlumnos="http://127.0.0.1:8000/drey/v1/Alumno/";

class Juego extends Component {
state={
  cant:'',
  data:[],
  dataGrupo:[],
  dataAlumnos:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    cantParticipantes: '',
    fecha: '',
    detalle:'',
    idGrupo:'',
   
  }
}

peticionGetAlumnos=()=>{
  axios.get(urlAlumnos).then(response=>{
   
    this.setState({dataAlumnos: response.data});
    
  }).catch(error=>{
    console.log(error.message);
  })
  }
peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}
peticionGetGrupo=()=>{
  axios.get(urlGrupo).then(response=>{
    this.setState({dataGrupo: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
  }
  

peticionPost=async()=>{
  delete this.state.form.id;
 await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(url+this.state.form.id+'/', this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete(url+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarJugada=(jugada)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: jugada.id,
      cantParticipantes: jugada.cantParticipantes,
      fecha: jugada.fecha,
      detalle: jugada.detalle,
      idGrupo: jugada.idGrupo,
     
    }
  })
}



handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}
  componentDidMount() {
    this.peticionGet();
    this.peticionGetGrupo();
    this.peticionGetAlumnos();
  }
  

  render(){
    const {form}=this.state;
  return (
    <>
    <div className="App">
      <h2>Jugadas</h2>
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Nueva Jugada</button>
  <br /><br />

    <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cantidad de Participantes</th>
          <th>Fecha</th>
          <th>Detalles</th>
          <th>Grupo</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(jugada=>{
          return(
            <tr>
          <td>{jugada.id}</td>
          <td>{jugada.cantParticipantes}</td>
          <td>{jugada.fecha}</td>
          <td>{jugada.detalle}</td>
          <td>{jugada.idGrupo}</td>
         
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarJugada(jugada); this.modalInsertar()}}>Actualizar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarJugada(jugada); this.setState({modalEliminar: true})}}>Eliminar</button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal fullscreen="lg" size="lg" isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                  <label htmlFor="nombre">Seleccionar clase</label>
                  <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                     name="id_carrera" id="id_carrera" onChange={this.handleChange}>
                      {this.state.dataGrupo.map(grupo=>(
                      <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>))
                      }
                      </select>
                    <br />
                    <label htmlFor="nombre">Tabla de posiciones</label>
                  <table className="table" >
                  <thead>
                        <tr>
                          <th>Alumnos</th>
                          <th>Versus</th>
                          <th>Alumnos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataAlumnos.map(alumno=>{
                          return(
                            <tr>
                          <td>{alumno.nombre}</td>
                          <td>{'VS'}</td>
                          <td>{alumno.nombre}</td>

                          </tr>
                          )
                        })}
                      </tbody>
                    </table>
                      <br />
                    
                    <label htmlFor="nombre">Cantidad de Participantes</label>
                    <input className="form-control" type="number" name="cantParticipantes" id="cantParticipantes"
                     onChange={this.handleChange} value={''} disabled/>
                    <br />
                    <label htmlFor="nombre">Fecha</label>
                    <input className="form-control" type="date" name="fecha" id="fecha"
                     onChange={this.handleChange} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="nombre">Detalles</label>
                    <input className="form-control" type="text" name="detalle" id="detalle"
                     onChange={this.handleChange} value={form?form.detalle: ''}/>
                    <br />  
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
                  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar esta jugada?{form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>


  </>
  );
}
}
export default Juego;