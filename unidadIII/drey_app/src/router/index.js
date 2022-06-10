import Home from '../pages/Home'
import About from '../pages/About'
import Versus from '../pages/Versus'
import Users from '../pages/Users'
import Alumnos from '../pages/Alumnos'
import Login from '../pages/Login'
// import UserEdit from '../pages/Users/edit'

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'About', path: '/about', component: About },
  { name: 'Users', path: '/users', component: Users },
  { name: 'Versus', path: '/versus', component: Versus },
  { name: 'Alumnos', path: '/alumnos', component: Alumnos },
  { name: 'Login', path: '/login', component: Login },
  // { name: 'UserEdit', path: '/users/:id', component: UserEdit },
]

export default routes