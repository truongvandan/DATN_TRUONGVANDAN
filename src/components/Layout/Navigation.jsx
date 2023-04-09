import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../../hooks/useAuth'

const navigationConfig = {
  guest: [
    {
      label: 'Danh sách Vaccine',
      link: '/vaccines'
    },
  ],
  user: [
    {
      label: 'Danh sách Vaccine',
      link: '/vaccines'
    },
    {
      label: 'Đăng ký tiêm',
      link: '/dang-ky-tiem'
    },
    {
      label: 'Quản lý lịch tiêm',
      link: '/lich-tiem',
    },
  ],
  admin: [
    {
      label: 'Danh sách Vaccine',
      link: '/vaccines'
    },
    {
      label: 'Quản lý lịch tiêm',
      link: '/lich-tiem',
    },
    {
      label: 'Quản lý người dùng',
      link: '/nguoi-dung'
    },
  ],
}

export default function Navigition() {
  const [session] = useAuth()
  const {profile} = session || {};

  const navigation = navigationConfig[profile?.role] || navigationConfig['guest']

  return (
    <>
      <nav className='container mx-auto'>
        <ul className='flex gap-6 py-4'>
          {navigation.map((navItem, index) => (
            <li key={index}>
              <Link to={navItem.link}>{navItem.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
