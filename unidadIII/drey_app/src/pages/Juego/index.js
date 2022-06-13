import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



const url="http://127.0.0.1:8000/drey/v1/Jugada/";
const urlClase="http://127.0.0.1:8000/drey/v1/Clase/";
const urlGrupoAlumnos="http://127.0.0.1:8000/drey/v1/Grupo_has_Alumnos/";
const urlGrupo="http://127.0.0.1:8000/drey/v1/Grupo/";

class Juego extends Component {
state={
  cant:'',
  data:[],
  dataClase:[],
  dataGrupo:[],
  dataGrupoAlumnos:[],
  modalInsertar: false,
  modalEliminar: false,
  modalJugar: false,
  form:{
    id: '',
    cantParticipantes: '',
    fecha: '',
    detalle:'',
    idClase:'',
   
  },
  formGrupos:{
    idGrupo: '',
    idAlumno: '',
   
  },
  formClase:{
    nombre: ''
  }
}

peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}
peticionGetClase=()=>{
  axios.get(urlClase).then(response=>{
    this.setState({dataClase: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
  }
  peticionGetGrupoAlumnos=()=>{
    axios.get(urlGrupoAlumnos).then(response=>{
      this.setState({dataGrupoAlumnos: response.data});
      console.log(response.data)
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
modalJugar=()=>{
  this.setState({modalJugar: !this.state.modalJugar});
}

seleccionarJugada=(jugada)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: jugada.id,
      cantParticipantes: jugada.cantParticipantes,
      fecha: jugada.fecha,
      detalle: jugada.detalle,
      idClase: jugada.idClase,
     
    }
  })
}

VerAlumnos=()=>{
  this.setState({
    tipoModal: 'Ver',
    formClase: {
      nombre: this.state.form.idClase
    }
    
  })
  console.log(this.state.form.idClase);
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
    this.peticionGetClase();
    this.peticionGetGrupo();
    this.peticionGetGrupoAlumnos();
  }
  

  render(){
    const {form}=this.state;
    const {formClase}=this.state;
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
          <td>{jugada.idClase}</td>
         
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
                     name="idClase" id="idClase" onChange={this.handleChange}>
                      {this.state.dataClase.map(clase=>(
                      <option key={clase.id} value={clase.idGrupo}>{clase.nombre}</option>     
                      ))
                      }
                      </select>

                      <br />                   
                    <label htmlFor="nombre">Cantidad de Participantes</label>
                    <input className="form-control" type="number" name="cantParticipantes" id="cantParticipantes"
                     onChange={this.handleChange} value={this.state.dataGrupoAlumnos.filter( alumno=> formClase.nombre === (alumno.idGrupo)).length} disabled/>
                    <br />
                    <label htmlFor="nombre">Fecha</label>
                    <input className="form-control" type="date" name="fecha" id="fecha"
                     onChange={this.handleChange} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="nombre">Detalles</label>
                    <input className="form-control" type="text" name="detalle" id="detalle"
                     onChange={this.handleChange} value={form?form.detalle: ''}/>
                    <br />  <br />  
                    <button className="btn btn-danger" onClick={()=>{this.VerAlumnos(); this.setState({modalJugar: true})}}>Jugar</button>

                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal==='insertar'?
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


          <Modal fullscreen="sm"
    size="lg"  isOpen={this.state.modalJugar}>
          <ModalHeader style={{display: 'block'}}>
          <h5 class="modal-title" id="exampleModalLongTitle">Alumnos</h5>
                  <span style={{float: 'right'}} onClick={()=>this.modalJugar()}>x</span>
                </ModalHeader>
            <ModalBody>
            <table className="table " class="table table-striped table-hover">
              <thead>
                <tr>
                <th>VS</th>  
                            
                </tr>
              </thead>
              <tbody>
                {
                this.state.dataGrupoAlumnos
                .sort(() => Math.random() - 0.5)
                .filter( alumno=> formClase.nombre === (alumno.idGrupo))
                .map((grupo, index )=>{
                  return(
                    <>
                  <tr>
                  <td>{grupo.idAlumno}</td>
                  </tr>
                  <tr>
                    {
                      (index+1) %2 === 0
                      ? <tr>.</tr>
                      : <td>vs</td>
                    }
                  </tr>
                  </>
                  )
                })}
              </tbody>
            </table>
            </ModalBody>
            <ModalFooter>
            <button className="btn btn-danger" onClick={()=>this.modalJugar()}>OK</button>
            </ModalFooter>
          </Modal>
  </div>


  </>
  );
}
}
export default Juego;