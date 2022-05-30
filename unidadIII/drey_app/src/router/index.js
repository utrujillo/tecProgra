import Home from '../pages/Home'
import About from '../pages/About'
import Versus from '../pages/Versus'
import Users from '../pages/Users'
const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'About', path: '/about', component: About },
  { name: 'Users', path: '/users', component: Users },
  { name: 'Versus', path: '/versus', component: Versus }
]

export default routes