import React from 'react'
import Navigition from './Navigation'
import {Image, Menu, MenuButton, MenuList, MenuItem, Button, Heading} from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/contants/router';

function Header() {
  const [session, setSession] = useAuth()

  const isloggedIn = !!session;
  const {profile} = session || {};
  const navigate = useNavigate();

  function doLogout() {
    setSession(null)
    navigate('/')
  }

  return (
    <header className='page-header'>
      <div className='page-top-bar flex justify-between items-center container mx-auto'>
        <a href='/'>
          <Image
            borderRadius='full'
            boxSize='100px'
            src='/images/logo.jpg'
            alt='Vaccines'
          />
        </a>

        {isloggedIn && (
          <Menu>
            <MenuButton as={Button} variant='outline' rightIcon={<ChevronDownIcon />}>
              {profile.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={doLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}

        {!isloggedIn && (
          <Link to={ROUTES.login}>
              <Button colorScheme='blue' variant='outline'>Đăng nhập</Button>
          </Link>
        )}
      </div>
      
      <div className='page-nav'>
        <Navigition />
      </div>
    </header>
  )
}

export default Header
