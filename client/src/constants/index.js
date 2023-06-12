import { createInfaq, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'infaq',
    imgUrl: createInfaq,
    link: '/create-infaq',
  },
  /*
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  */
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];


//0x7e105F2f829106932847278061Cff762b094C7Fa
