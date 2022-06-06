import Home from '../pages/Home'
import About from '../pages/About'
import Versus from '../pages/Versus'
import Users from '../pages/Users'
import Alumnos from '../pages/Alumnos'
import Master from '../pages/Master'
import Materias from '../pages/Materias'
// import UserEdit from '../pages/Users/edit'

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'About', path: '/about', component: About },
  { name: 'Users', path: '/users', component: Users },
  { name: 'Versus', path: '/versus', component: Versus },
  { name: 'Master', path: '/master', component: Master },
  { name: 'Materias', path: '/materias', component: Materias },
  { name: 'Alumnos', path: '/alumnos', component: Alumnos },
  // { name: 'UserEdit', path: '/users/:id', component: UserEdit },
]

export default routes