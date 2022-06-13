import Home from '../pages/Home'
import About from '../pages/About'
import Versus from '../pages/Versus'
import Users from '../pages/Users'
import Alumnos from '../pages/Alumnos'
import Grupo from '../pages/Grupo'
import Master from '../pages/Master'
import Materias from '../pages/Materias'
import Juego from '../pages/Juego'
import Clase from '../pages/Clases'
// import UserEdit from '../pages/Users/edit'

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'About', path: '/about', component: About },
  { name: 'Users', path: '/users', component: Users },
  { name: 'Versus', path: '/versus', component: Versus },
  { name: 'Alumnos', path: '/alumnos', component: Alumnos },
  { name: 'Grupo', path: '/grupo', component: Grupo },
  { name: 'Master', path: '/master', component: Master },
  { name: 'Materias', path: '/materias', component: Materias },
  { name: 'Juego', path: '/juego', component: Juego },
  { name: 'Clase', path: '/Clase', component: Clase},
  // { name: 'UserEdit', path: '/users/:id', component: UserEdit },
]

export default routes