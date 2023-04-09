import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './layout.css';

function Layout({children}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
