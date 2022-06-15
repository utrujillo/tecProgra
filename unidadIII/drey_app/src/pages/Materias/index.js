import React, { Component } from 'react';
import './index.css';
import axios from "axios";
import Search from '../../components/Search';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://127.0.0.1:8000/drey/v1/Materia/";

class Materias extends Component {
state={
  result:'',
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    Nombre:'',
    descripcion: ''
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
  axios.put(url+this.state.form.id + '/', this.state.form).then(response=>{
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
seleccionarMateria=(materia)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
        id: materia.id,
        nombre:materia.nombre,
        descripcion:materia.descripcion  
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
    <><div className='search'>
    <Search   placeholder='Buscar Materia' value= {this.state.result} onChange={this.onChange}/>
    </div> 
    <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Materia</button>
  <br /><br />
    <table className="table" class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.filter(materia => materia.nombre.toLowerCase()
        .indexOf(this.state.result.toLowerCase()) > -1)
        .map(materia=>{
          return(
            <tr>
          <td>{materia.id}</td>
          <td>{materia.nombre}</td>
          <td>{materia.descripcion}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarMateria(materia); this.modalInsertar()}}>Actualizar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarMateria(materia); this.setState({modalEliminar: true})}}>Eliminar</button>
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
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre"
                    onChange={this.handleChange} value={form?form.nombre: ''}/>
                    <br />
                    <label htmlFor="descripcion">Descripcion</label>
                    <input className="form-control" type="text" name="descripcion" id="descripcion"
                    onChange={this.handleChange} value={form?form.descripcion: ''}/>
                    <br />
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
               Estás seguro que deseas eliminar: {form && form.nombre}
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
export default Materias;
