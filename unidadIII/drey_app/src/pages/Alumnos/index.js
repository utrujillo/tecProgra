import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



const url="http://127.0.0.1:8000/drey/v1/Alumno/";

class Alumnos extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    ApellidoP: '',
    ApellidoM: '',
    nombre: '',
    semestre: '',
    id_carrera: ''
  }
}

peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
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

seleccionarAlumno=(alumno)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: alumno.id,
      ApellidoP: alumno.ApellidoP,
      ApellidoM: alumno.ApellidoM,
      nombre: alumno.nombre,
      semestre: alumno.semestre,
      id_carrera: alumno.id_carrera
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
  }
  

  render(){
    const {form}=this.state;
  return (
    <>
    <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Alumno</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Apellido P</th>
          <th>ApellidoM</th>
          <th>Nombre</th>
          <th>semestre</th>
          <th>carrera</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(alumno=>{
          return(
            <tr>
          <td>{alumno.id}</td>
          <td>{alumno.ApellidoP}</td>
          <td>{alumno.ApellidoM}</td>
          <td>{alumno.nombre}</td>
          <td>{alumno.semestre}</td>
          <td>{alumno.id_carrera}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarAlumno(alumno); this.modalInsertar()}}>Actualizar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarAlumno(alumno); this.setState({modalEliminar: true})}}>Eliminar</button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly 
                    onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">ApellidoP</label>
                    <input className="form-control" type="text" name="ApellidoP" id="ApellidoP"
                     onChange={this.handleChange} value={form?form.ApellidoP: ''}/>
                    <br />
                    <label htmlFor="nombre">ApellidoM</label>
                    <input className="form-control" type="text" name="ApellidoM" id="ApellidoM"
                     onChange={this.handleChange} value={form?form.ApellidoM: ''}/>
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre"
                     onChange={this.handleChange} value={form?form.nombre: ''}/>
                    <br />
                    <label htmlFor="nombre">semestre</label>
                    <input className="form-control" type="number" name="semestre" id="semestre" 
                    onChange={this.handleChange} value={form?form.semestre: ''}/>
                    <br />
                    <label htmlFor="nombre">carrera</label>
                    <input className="form-control" type="number" name="id_carrera" id="id_carrera"
                     onChange={this.handleChange} value={form?form.id_carrera: ''}/>
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