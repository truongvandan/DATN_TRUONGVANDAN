import React from 'react'
import {
  createBrowserRouter,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthController from './components/AuthController'
import VaccineNew from './pages/Admin/VaccineNew'
import VaccineEdit from './pages/Admin/VaccineEdit'
import { ROUTES } from './contants/router'
import VaccineDetail from './pages/Admin/VaccineDetail'
import UserListing from './pages/Admin/UserListing'
import InjectionRegister from './pages/InjectionRegister'
import InjectionSchedule from './pages/InjectionSchedule'
import InjectionScheduleForAdmin from './pages/Admin/AdminInjectionSchedule'
import InjectionScheduleEdit from './pages/InjectionScheduleEdit'

const router = createBrowserRouter([
  {
    element: (
      <AuthController />
    ),
    children: [
      {
        path: ROUTES.addVaccine,
        element: (
          <VaccineNew />
        ),
      },
      {
        path: `${ROUTES.updateVaccine}/:id`,
        element: (
          <VaccineEdit />
        ),
      },
      {
        path: `${ROUTES.detailVaccine}/:id`,
        element: (
          <VaccineDetail />
        ),
      },
      {
        path: `${ROUTES.userListing}`,
        element: (
          <UserListing />
        ),
      },
      {
        path: `${ROUTES.injectionScheduleForAdmin}`,
        element: (
          <InjectionScheduleForAdmin />
        ),
      },
    ]
  },
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: ROUTES.login,
    element: (
      <Login />
    ),
  },
  {
    path: ROUTES.register,
    element: (
      <Register />
    ),
  },
  {
    path: ROUTES.listVaccines,
    element: (
      <Home />
    ),
  },
  {
    path: ROUTES.injectionRegister,
    element: (
      <InjectionRegister />
    ),
  },
  {
    path: ROUTES.injectionSchedule,
    element: (
      <InjectionSchedule />
    ),
  },
  {
    path: `${ROUTES.injectionScheduleEdit}/:id`,
    element: (
      <InjectionScheduleEdit />
    ),
  }
]);

export { router }
