// ================ colors ================
export const MAIN_BACKGROUND_COLOR = '#f8f0e5'
export const MAIN_LIGHTCREAM_COLOR = '#eadbc8'
export const MAIN_DARKCREAM_COLOR = '#dac0a3'
export const MAIN_DARKCREAM_HOVER_COLOR = '#d9ba98'
export const MAIN_BLUE_COLOR = '#102c57'
export const MAIN_GRAY_COLOR = '#5b5a5a'

// ================ render objects ================

interface IRenderAuthLoginData {
  title: string
  inputs: {
    id: string
    name: string
    type: string
    label: string
  }[]
  buttons: {
    id: string
    name: string
    path?: string
    label: string
    className?: string
  }[]
}

export const RENDER_AUTH_LOGIN_DATA: IRenderAuthLoginData = {
  title: 'LOGIN',
  inputs: [
    {
      id: '1',
      name: 'login',
      type: 'text',
      label: 'Enter your login',
    },
    {
      id: '2',
      name: 'password',
      type: 'password',
      label: 'Enter your password',
    },
  ],
  buttons: [
    {
      id: '1',
      name: 'login',
      path: '/', //go to main component
      label: 'login',
    },
    {
      id: '2',
      name: 'sign up',
      path: '/sign-up',
      label: 'to sign up',
      className: 'auth_registration_btn',
    },
  ],
}

export const RENDER_AUTH_SIGNUP_DATA = {
  title: 'SIGN UP',
  inputs: [
    {
      id: '1',
      name: 'login',
      type: 'text',
      label: 'Enter your login',
    },
    {
      id: '2',
      name: 'password',
      type: 'password',
      label: 'Enter your password',
    },
    {
      id: '3',
      name: 'rePassword',
      type: 'password',
      label: 'Enter password again',
    },
  ],

  buttons: [
    {
      id: '1',
      name: 'sign up',
      path: '/', //need create new user on server
      label: 'sign up',
      className: 'auth_registration_btn',
    },
    {
      id: '2',
      name: 'login',
      label: 'to login',
      path: '/login',
    },
  ],
}
