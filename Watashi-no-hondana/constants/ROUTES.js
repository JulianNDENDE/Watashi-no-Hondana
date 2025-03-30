import Home from '../app/(tabs)/home';
import Search from '../app/(tabs)/search';
import Login from '../app/auth/login';
import Register from '../app/auth/register';

const ROUTES = {
  PATHS: {
    HOME: 'home',
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    SEARCH: 'search',
  },
  NAMES: {
    HOME: 'Home',
    LOGIN: 'Login',
    REGISTER: 'Register',
    SEARCH: 'Search',
  },
  COMPONENTS: {
    HOME: Home,
    LOGIN: Login,
    REGISTER: Register,
    SEARCH: Search,
  },
};

export default ROUTES;
