import React, { Component} from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://127.0.0.1:8000/drey/v1/Jugada/";
const urlClase="http://127.0.0.1:8000/drey/v1/Clase/";
const urlGrupoAlumnos="http://127.0.0.1:8000/drey/v1/Grupo_has_Alumnos/";
const urlGrupo="http://127.0.0.1:8000/drey/v1/Grupo/";
const urlVersus="http://127.0.0.1:8000/drey/v1/Versus/";
const urlJugadaAlumno="http://127.0.0.1:8000/drey/v1/Jugada_has_alumnos/";

class Juego extends Component {
  
state={
  cant:'',
  data:[],
  view:'',
  dataClase:[],
  dataGrupo:[],
  dataGrupoAlumnos:[],
  dataJugadaAlumno:[],
  dataVersus:[],
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
  formVersus:{
    idJugada:'',
    idAlumno1:'',
    idAlumno2:'',
    idGanador:''
  },
  formGrupos:{
    idGrupo: '',
    idAlumno: '',
  },
  formClase:{
    nombre: ''
  },
  formjugadaAlumno:{
    id:'',
    pocision:'',
    idJugada:'',
    idAlumno:''
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
peticionGetJugadaAlumno=()=>{
    axios.get(urlJugadaAlumno).then(response=>{
      this.setState({dataJugadaAlumno : response.data});
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
  console.log(this.state.form);
}
peticionPost2=async(jugada)=>{
  delete this.state.formjugadaAlumno.id;
  this.state.dataGrupoAlumnos.map(async(element,index) => {
    let result = ({
      pocision:0,
      idJugada:jugada.id,
      idAlumno:element.id
    })
    await axios.post(urlJugadaAlumno,result).then(response=>{
      this.modalJugar();
      this.peticionGetJugadaAlumno();
  }).catch(error=>{
     console.log(error.message);
  })
  })
}
peticionPut=()=>{
  axios.put(url+this.state.form.id+'/', this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}
peticionPut2=()=>{
  axios.put(urlJugadaAlumno+this.state.formjugadaAlumno.id+'/', this.state.formjugadaAlumno).then(response=>{
    this.modalposicion2();
    this.peticionGetJugadaAlumno();
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
modalposicion=()=>{
  this.setState({modalposicion: !this.state.modalposicion});
}
modalposicion2=()=>{
  this.setState({modalposicion2: !this.state.modalposicion2});
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
seleccionarJugadaAlumno=(jugada)=>{
  this.setState({
    tipoModal: 'actualizar',
    formjugadaAlumno: {
      id:jugada.id,
      pocision:jugada.pocision,
      idJugada:jugada.Jugada,
      idAlumno:jugada.Alumno
    }
  })
}
VerAlumnos=(grupo)=>{
  this.setState({
    tipoModal: 'Ver',
    formClase: {
      nombre: grupo
    } 
  })
console.log(grupo)
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
    formjugadaAlumno:{
      ...this.state.formjugadaAlumno,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.formjugadaAlumno);
}
  componentDidMount() {
    this.peticionGet();
    this.peticionGetClase();
    this.peticionGetGrupo();
    this.peticionGetGrupoAlumnos();
    this.peticionGetJugadaAlumno();
  }
  render(){
    const {form}=this.state;
    const {formClase}=this.state;
    const {formjugadaAlumno}=this.state;
return (
  <>
    <div className="App">
      <h2>Jugadas</h2>
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Nueva Jugada</button>
  <br /><br/>
    <table className="table" class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
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
          <td>{jugada.fecha}</td>
          <td>{jugada.detalle}</td>
          <td>{jugada.idClase}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarJugada(jugada); this.modalInsertar()}}>Actualizar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarJugada(jugada); this.setState({modalEliminar: true})}}>Eliminar</button>
                {"   "}

                {
                  (this.state.dataJugadaAlumno.filter( alumno=> jugada.id === (alumno.Jugada)).length) === 0
                  ?<button className="btn btn-info" onClick={()=>{this.VerAlumnos(jugada); this.setState({modalJugar: true})}}>Jugar</button>
                  :<button className="btn btn-primary" onClick={()=>{this.VerAlumnos(jugada);this.modalposicion()}}>
                  Cargar posiciones
                 </button>
                }
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
                      <option key={clase.id} value={clase.id}>{clase.nombre}</option>     
                      ))
                      }
                      </select>
                      <br />                   
                    <label htmlFor="nombre">Fecha</label>
                    <input className="form-control" type="date" name="fecha" id="fecha"
                     onChange={this.handleChange} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="nombre">Detalles</label>
                    <input className="form-control" type="text" name="detalle" id="detalle"
                     onChange={this.handleChange} value={form?form.detalle: ''}/>
                    <br />  <br />  
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
      <Modal fullscreen="sm" size="lg"    isOpen={this.state.modalJugar}>
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
                .filter( alumno=>  formClase.nombre.grupo   === (alumno.idGrupo) )
                .map((grupo, index )=>{
                  return(
                  <>
                  <tr>
                  <td>{grupo.idAlumno} </td>
                  </tr>
                  <tr>
                    {
                      (index+1) %2 === 0
                      ? <tr></tr>
                      : <td>vs</td>
                    }
                    <br></br>
                  </tr>
                  </>
                  )
                })}
              </tbody>
            </table>
            </ModalBody>
            <ModalFooter>
              {
                (this.state.dataJugadaAlumno.filter( alumno=> formClase.nombre.id === (alumno.Jugada)).length) === 0

                 ?<button className="btn btn-success" onClick={()=>this.peticionPost2(formClase.nombre)}>
                    Insertar
                  </button>

                  :<button className="btn btn-primary" onClick={()=>this.modalposicion()}>
                   Cargar posiciones
                  </button>
              }
                 
                  <button className="btn btn-danger" onClick={()=>this.modalJugar()}>Cancelar</button>
            </ModalFooter>
          </Modal>   
    <Modal  isOpen={this.state.modalposicion2}>
          <ModalBody>
            <div className="form-group">
                  <label htmlFor="nombre">Alumno</label>
                    <input className="form-control" type="number" name="pocision" id="pocision"
                     onChange={this.handleChange2} value={formjugadaAlumno.pocision} />
                    <br />                 
                  </div>
          </ModalBody>
          <ModalFooter>
                <button className="btn btn-primary" onClick={()=>this.peticionPut2()}>
                   Actualizar posicion
                </button>
                <button className="btn btn-danger" onClick={()=>this.modalposicion2()}>Cancelar</button>
          </ModalFooter>
      </Modal>
      <Modal fullscreen="lg" size="lg" isOpen={this.state.modalposicion}>
            <ModalHeader style={{display: 'block'}}>
                <span style={{float: 'right'}} onClick={()=>this.modalposicion()}>x</span>
            </ModalHeader>
            <ModalBody>
                  <div className="form-group">
                  <table className="table " class="table table-striped table-hover">
              <thead>
                <tr>
                <th>Alumno</th>
                <th>Posicion</th>     
                <th> Action</th>         
                </tr>
              </thead>
              <tbody>
                {
                  this.state.dataJugadaAlumno.filter( alumno=> 
                    (formClase.nombre.id === (alumno.Jugada)) )
                    .map((alumno,idex)=> {
                  return(
                    <>
                  <tr>
                  <td>{alumno.idAlumno} </td>
                  {
                    alumno.pocision===0
                    ?<td>No Asignado</td>
                    :<td>{alumno.pocision} </td> 
                  }  
                  <td><button className="btn btn-primary"    onClick={()=>{this.seleccionarJugadaAlumno(alumno); this.modalposicion2()}}>
                    Actualizar
                  </button> </td>
                  </tr>  
                  </>
                  )
                })}
              </tbody>
            </table>
                </div>
              </ModalBody>
              <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.modalposicion()}>Cancelar</button>
              </ModalFooter>
          </Modal>
  </div>
  </>
  );
}
}
export default Juego;