import React from "react";
import { useNavigate } from "react-router-dom";
import 'reactstrap';

const Menu = () => {
    const navigate = useNavigate();
     const handleClickAlumnos = () => {
    navigate('/Alumnos');
    }
    const handleClickMaestros = () => {
      navigate('/Master');
    }
    const handleClickGrupos = () => {
      navigate('/Grupo');
    }
    const handleClickMaterias = () => {
      navigate('/Materias');
    }
    const handleClickClase = () => {
      navigate('/Clase');
    }
    const handleClickHome = () => {
      navigate('/');
    }
    return(
    <>
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="" onClick={ () => handleClickHome()}>Juego</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#" onClick={ () => handleClickAlumnos()}>Alumnos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"  onClick={ () => handleClickGrupos()}>Grupos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"  onClick={ () => handleClickMaterias()}>Materias</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#"  onClick={ () => handleClickMaestros()}>Maestros</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#"  onClick={ () => handleClickClase()}>Clase</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
    )
  }
  
  export default Menu