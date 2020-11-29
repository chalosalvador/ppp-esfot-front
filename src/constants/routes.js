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

const teacherRoutes = [
    {
        url: '/inicio',
        label:'PRACTICAS'
    },
    {
        url: '/Estudiantes',
        label: 'ESTUDIANTES'
    },

]

const studentRoutes = [
    {
        url: '/inicio',
        label:'PRACTICAS'
    },
]


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
        url: '/Materias',
        label: 'MATERIAS'
    },
    {
        url: '/Temas',
        label: 'TEMAS'
    },
    {
        url: '/Estudiantes',
        label: 'ESTUDIANTES'
    },
    {
        url: '/Profesores',
        label: 'PROFESORES'
    },
    {
        url: '/Administrativos',
        label: 'ADMINISTRATIVOS'
    },
    {
        url: '/Representatives',
        label: 'REPRESENTATIVOS'
    },
    {
        url: '/Interships',
        label: 'PASANTIAS'
    },
    {
      url: '/inicio',
        label:'PRACTICAS'
    },

]

const privateRoutes = {
  LOGOUT: '/logout',
  USERS: '/usuarios',
  INTERNSHIP_ID: '/practica/:id',
  adminRoutes,
    teacherRoutes,
    studentRoutes
};



const Routes = {
  ...publicRoutes,
  ...privateRoutes,
  ...adminRoutes,
    ...teacherRoutes,
    ...studentRoutes
};
export default Routes;
