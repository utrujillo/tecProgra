import Home from '../pages/Home'
import About from '../pages/About'
<<<<<<< HEAD
import Versus from '../pages/Versus'
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
    name: 'Versus',
    path: '/versus',
    component:Versus
  }
=======
import Users from '../pages/Users'
const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'About', path: '/about', component: About },
  { name: 'Users', path: '/users', component: Users }
>>>>>>> fa4099bf908c2c3237e8458aeeee430654c631b3
]

export default routes