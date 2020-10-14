/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  INDEX: '/',
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  HOME: '/inicio',
  ABOUT: '/acerca-de',
    PROFILE: '/Profile',

};

const adminRoutes = [
    {
    url: '/facultades',
    label: 'FACULTADES'   
    },
    {
      url: '/Carreras',
      label: 'CARRERAS'
    },
    {
        url: '/Temas',
        label: 'TEMAS'
    },
    {
        url: '/Materias',
        label: 'MATERIAS'
    },
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
