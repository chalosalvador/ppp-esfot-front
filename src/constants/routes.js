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

const adminRoutes = [
    {
    url: '/facultades',
    label: 'FACULTADES'   
    },
    {
      url: '/other',
      label: 'OTHER'
    }
]

const privateRoutes = {
  LOGOUT: '/logout',
  USERS: '/usuarios',
  INTERNSHIP_ID: '/practica/:id',
  adminRoutes
};



const Routes = {
  ...publicRoutes,
  ...privateRoutes,
  ...adminRoutes
};
export default Routes;
