import React from 'react'
import { Link, useResolvedPath } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../contants/router'

const navigationConfig = {
  guest: [
    {
      label: 'Vắc xin',
      link: ROUTES.listVaccines
    },
  ],
  user: [
    {
      label: 'Vắc xin',
      link: ROUTES.listVaccines
    },
    {
      label: 'Đăng ký tiêm',
      link: ROUTES.injectionRegister
    },
    {
      label: 'Quản lý lịch tiêm',
      link: ROUTES.injectionSchedule
    },
  ],
  admin: [
    {
      label: 'Vắc xin',
      link: ROUTES.listVaccines
    },
    {
      label: 'Quản lý lịch tiêm',
      link: ROUTES.injectionScheduleForAdmin,
    },
    {
      label: 'Quản lý người dùng',
      link: ROUTES.userListing
    },
  ],
}

export default function Navigition() {
  const defaultNavigation = ROUTES.listVaccines
  
  const [session] = useAuth()
  const {profile} = session || {};

  const navigation = navigationConfig[profile?.role] || navigationConfig['guest']

  let pathname = useResolvedPath().pathname
  if (pathname == '/') {
    pathname = defaultNavigation
  }
  

  return (
    <>
      <nav className='container mx-auto'>
        <ul className='flex gap-6'>
          {navigation.map((navItem, index) => (
            <li key={index} className={`main-nav-item uppercase py-6 px-2 ${(pathname).includes(navItem.link) ? 'active': ''}`}>
              <Link to={navItem.link}>{navItem.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
