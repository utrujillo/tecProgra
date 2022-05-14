import Home from '../pages/Home'
import About from '../pages/About'
import Alumnos from '../pages/Alumnos'
const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'About',
    path: '/about',
    component: About
  },
  {
    name: 'Alumnos',
    path: '/alumnos',
    component: Alumnos
  }
]

export default routes