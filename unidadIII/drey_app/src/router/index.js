import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
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
    name: 'Login',
    path: '/login',
    component: Login
  }
]

export default routes