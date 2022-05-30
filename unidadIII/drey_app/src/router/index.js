import Home from '../pages/Home'
import About from '../pages/About'
import Users from '../pages/Users'
// import UserEdit from '../pages/Users/edit'

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'About', path: '/about', component: About },
  { name: 'Users', path: '/users', component: Users },
  // { name: 'UserEdit', path: '/users/:id', component: UserEdit },
]

export default routes