import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/js/bootstrap.js";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Grupo from '../Grupo';
import Materias from '../Materias';
import Search from '../../components/Search';

const url="http://127.0.0.1:8000/drey/v1/Clase/";
const urlCarrera="http://127.0.0.1:8000/drey/v1/Carrera/";
const urlMaestro="http://127.0.0.1:8000/drey/v1/Maestros/";
const urlPeriodo="http://127.0.0.1:8000/drey/v1/Periodo/";
const urlMateria="http://127.0.0.1:8000/drey/v1/Materia/";
const urlGrupo="http://127.0.0.1:8000/drey/v1/Grupo/";

class Alumnos extends Component {
state={
  result:'',
  data:[],
  dataCarrera:[],
  dataMaestro:[],
  dataPeriodo:[],
  dataMateria:[],
  dataGrupo:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    nombre: '',
    horario: '',
    idCarrera: '',
    idMaestro: '',
    idPeriodo: '',
    idGrupo: '',
    idMateria: ''
  }
}
onChange = async e =>{
  e.persist();
  await this.setState({result: e.target.value});
  console.log(this.state.result);
}
peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}
peticionGetCarrera=()=>{
  axios.get(urlCarrera).then(response=>{
    this.setState({dataCarrera: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
}
peticionGetMaestro=()=>{
    axios.get(urlMaestro).then(response=>{
      this.setState({dataMaestro: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
  }
  peticionGetPeriodo=()=>{
    axios.get(urlPeriodo).then(response=>{
      this.setState({dataPeriodo: response.data});
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
  peticionGetMateria=()=>{
    axios.get(urlMateria).then(response=>{
      this.setState({dataMateria: response.data});
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
seleccionarAlumno=(clase)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: clase.id,
      nombre: clase.nombre,
      horario: clase.horario,
      idCarrera: clase.idCarrera,
      idMaestro: clase.idMaestro,
      idPeriodo: clase.idPeriodo,
      idGrupo: clase.idGrupo,
      idMateria: clase.idMateria,
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
    this.peticionGetCarrera();
    this.peticionGetMaestro();
    this.peticionGetPeriodo();
    this.peticionGetGrupo();
    this.peticionGetMateria();
  }
  render(){
  const {form}=this.state;
  return (
    <> <div className='search'>
    <Search   placeholder='Buscar Clase' value= {this.state.result} onChange={this.onChange}/>
    </div> 
    <div className="App">
    <br /><br /><br />
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Nueva Clase</button>
    <br /><br />
    <table className="table " class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Horario</th>
          <th>Carrera</th>
          <th>Maestro</th>
          <th>Periodo</th>
          <th>Grupo</th>
          <th>Materia</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.filter(clase => clase.nombre.toLowerCase()
        .indexOf(this.state.result.toLowerCase()) > -1)
        .map(clase=>{
          return(
            <tr>
          <td>{clase.id}</td>
          <td>{clase.nombre}</td>
          <td>{clase.horario}</td>
          <td>{clase.idCarrera}</td>
          <td>{clase.idMaestro}</td>
          <td>{clase.idPeriodo}</td>
          <td>{clase.idGrupo}</td>
          <td>{clase.idMateria}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarAlumno(clase); this.modalInsertar()}}>Actualizar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarAlumno(clase); this.setState({modalEliminar: true})}}>Eliminar</button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <Modal  isOpen={this.state.modalInsertar}>
            <ModalHeader style={{display: 'block'}}>
              <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
            </ModalHeader>
            <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly 
                    onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre"
                     onChange={this.handleChange} value={form?form.nombre: ''}/>
                    <br />
                    <label htmlFor="nombre">Horario</label>
                    <input className="form-control" type="text" name="horario" id="horario"
                     onChange={this.handleChange} value={form?form.horario: ''}/>
                    <br />
                    <label htmlFor="nombre">carrera</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                     name="idCarrera" id="idCarrera" onChange={this.handleChange}>
                      {this.state.dataCarrera.map(carrera=>(
                      <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>))
                      }
                      </select>
                    <br />
                    <label htmlFor="nombre">Maestro</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                     name="idMaestro" id="idMaestro" onChange={this.handleChange}>
                      {this.state.dataMaestro.map(maestro=>(
                      <option key={maestro.id} value={maestro.id}>{maestro.nombre}</option>))
                      }
                      </select>
                      <br />
                    <label htmlFor="nombre">Periodo</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                     name="idPeriodo" id="idPeriodo" onChange={this.handleChange}>
                      {this.state.dataPeriodo.map(periodo=>(
                      <option key={periodo.id} value={periodo.id}>{periodo.Descripcion}</option>))
                      }
                      </select>
                      <br />
                    <label htmlFor="nombre">Grupo</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                     name="idGrupo" id="idGrupo" onChange={this.handleChange}>
                      {this.state.dataGrupo.map(grupo=>(
                      <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>))
                      }
                      </select>
                      <br />
                    <label htmlFor="nombre">Materia</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                     name="idMateria" id="idMateria" onChange={this.handleChange}>
                      {this.state.dataMateria.map(materia=>(
                      <option key={materia.id} value={materia.id}>{materia.nombre}</option>))
                      }
                      </select>
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
               Estás seguro que deseas eliminar al alumno{form && form.nombre}
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
export default Alumnos;