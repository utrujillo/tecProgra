import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from '../../components/Search';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Alumnos from '../Alumnos';
const url="http://127.0.0.1:8000/drey/v1/Grupo/";
const urlAlumnos="http://127.0.0.1:8000/drey/v1/Alumno/";
const urlGrupoAlumnos="http://127.0.0.1:8000/drey/v1/Grupo_has_Alumnos/";

class Grupo extends Component {
state={
  result:'',
  data:[],
  dataAlumnos:[],
  dataGrupoAlumnos:[],
  modalInsertar: false,
  modalEliminar: false,
  modalAlumnos: false,
  modalEliminarAlumno: false,
  modalGrupoAlumnos: false,
  form:{
    id: '',
    nombre: '',  
  },
  formGrupoAlumnos:{
    id:'',
    idGrupo: '',
    idAlumno: '', 
  },
  formAlumnos:{
    nombre: ''
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
peticionGetAlumnos=()=>{
  axios.get(urlAlumnos).then(response=>{
    this.setState({dataAlumnos: response.data});
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
peticionGetGrupoAlumnos=()=>{
  axios.get(urlGrupoAlumnos).then(response=>{
    this.setState({dataGrupoAlumnos: response.data});
    console.log(response.data)
  }).catch(error=>{
    console.log(error.message);   
  })
  }
peticionPostGrupoAlumnos=async()=>{
  delete this.state.form.id;
 await axios.post(urlGrupoAlumnos,this.state.formGrupoAlumnos).then(response=>{
   console.log(this.state.formGrupoAlumnos)
    this.modalGrupoAlumnos();
    this.peticionGetGrupoAlumnos();
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
peticionDeleteAlumnos=()=>{
  axios.delete(urlGrupoAlumnos+this.state.formAlumnos.id).then(response=>{
    this.setState({modalEliminarAlumno: false});
    this.peticionGetGrupoAlumnos();
  })
}
modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}
modalAlumnos=()=>{
  this.setState({modalAlumnos: !this.state.modalAlumnos});
}
modalGrupoAlumnos=()=>{
  this.setState({modalGrupoAlumnos: !this.state.modalGrupoAlumnos});
}
seleccionarGrupo=(grupo)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: grupo.id,
      nombre: grupo.nombre,   
    }
  })
}
seleccionarAlumno=(alumno)=>{
  this.setState({
    tipoModal: 'actualizar',
    formAlumnos: {
      id: alumno.id,    
    }
  })
}
VerAlumnos=(grupo)=>{
  this.setState({
    tipoModal: 'Ver',
    formAlumnos: {
      nombre: grupo.nombre,    
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
handleChange2=async e=>{
  e.persist();
  await this.setState({
    formGrupoAlumnos:{
      ...this.state.formGrupoAlumnos,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.formGrupoAlumnos);
}
handleChange3=async e=>{
  e.persist();
  await this.setState({
    formAlumnos:{
      ...this.state.formAlumnos,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.formAlumnos);
}
  componentDidMount() {
    this.peticionGet();
    this.peticionGetAlumnos();
    this.peticionGetGrupoAlumnos();
  }
  render(){
    const {form}=this.state;
    const {formAlumnos}=this.state;
  return (
    <> <div className='search'>
    <Search   placeholder='Buscar Grupo' value= {this.state.result} onChange={this.onChange}/>
    </div> 
    <div className="App">
      <h2>Grupos</h2>
    <br /><br /><br />
    <button className="btn btn-danger" onClick={()=>{ this.setState({modalGrupoAlumnos: true})}}>Asignar</button>
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Grupo</button>
  <br /><br />
    <table className="table" class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.filter(grupo => grupo.nombre.toLowerCase()
        .indexOf(this.state.result.toLowerCase()) > -1)
        .map(grupo=>{
          return(
            <tr>
          <td>{grupo.id}</td>
          <td>{grupo.nombre}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarGrupo(grupo); this.modalInsertar()}}>Actualizar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarGrupo(grupo); this.setState({modalEliminar: true})}}>Eliminar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.VerAlumnos(grupo); this.setState({modalAlumnos: true})}}>Alumnos</button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                <h5 class="modal-title" id="exampleModalLongTitle">Grupo</h5>
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
               Estás seguro que deseas eliminar este grupo?{form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.modalEliminarAlumno}>
            <ModalBody>
               Estás seguro que deseas eliminar este alumno del grupo?{formAlumnos && formAlumnos.id}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>{this.peticionDeleteAlumnos()}}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>{this.setState({modalEliminarAlumno: false})}}>No</button>
            </ModalFooter>
          </Modal>
          <Modal   isOpen={this.state.modalGrupoAlumnos} >
          <ModalHeader style={{display: 'block'}}>
                <h5 class="modal-title" id="exampleModalLongTitle">Asignar alumno a grupo</h5>
                <span style={{float: 'right'}} onClick={()=>this.modalGrupoAlumnos()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
                   
                    <label htmlFor="idGrupo">Grupo</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                     name="idGrupo" id="idGrupo" onChange={this.handleChange2}defaultValue={this.state.value}>
                      {this.state.data.map(Grupos=>(
                      <option key={Grupos.id} value={Grupos.id} >{Grupos.nombre}</option>))
                      }
                      </select>
                    <br />
                    <label htmlFor="idAlumno">Alumno</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" 
                     name="idAlumno" id="idAlumno" onChange={this.handleChange2}value={this.state.value}>
                      {this.state.dataAlumnos.map(Alumnos=>(
                      <option key={Alumnos.id} value={Alumnos.id} >{Alumnos.nombre}</option>))
                      }
                      </select>
                    <br />
                  </div>
          </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={()=>this.peticionPostGrupoAlumnos()}> Asignar </button>
          <button className="btn btn-danger" onClick={()=>this.modalGrupoAlumnos()}>Cancelar</button>
          </ModalFooter>
    </Modal>
    <Modal fullscreen="sm"
          size="lg"  isOpen={this.state.modalAlumnos}>
          <ModalHeader style={{display: 'block'}}>
          <h5 class="modal-title" id="exampleModalLongTitle">Alumnos en este grupo</h5>
                  <span style={{float: 'right'}} onClick={()=>this.modalAlumnos()}>x</span>
          </ModalHeader>
          <ModalBody>
            <table className="table " class="table table-striped table-hover">
              <thead>
                <tr>
                <th>Grupo</th>
                <th>Nombre</th> 
                <th>Action</th>                 
                </tr>
              </thead>
              <tbody>
                {this.state.dataGrupoAlumnos.filter( p=> formAlumnos.nombre === (p.idGrupo))
                .map(alumno=>{
                  return(
                    <tr onChange={this.handleChange3}>
                  <td>{formAlumnos.nombre}</td>
                  <td>{alumno.idAlumno}</td>
                  <td> <button className="btn btn-danger" onClick={()=>{this.seleccionarAlumno(alumno); this.setState({modalEliminarAlumno: true});this.modalAlumnos()}}>Eliminar</button>
                  </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </ModalBody>
        <ModalFooter>
            <button className="btn btn-danger" onClick={()=>this.modalAlumnos()}>OK</button>
        </ModalFooter>
    </Modal>
  </div>
  </>
  );
}
}
export default Grupo;