/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  INDEX: '/',
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  HOME: '/inicio',
  ABOUT: '/acerca-de',
};

const privateRoutes = {
  LOGOUT: '/logout',
  USERS: '/usuarios',
  INTERNSHIP_ID: '/practica/:id'
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes
};
export default Routes;
