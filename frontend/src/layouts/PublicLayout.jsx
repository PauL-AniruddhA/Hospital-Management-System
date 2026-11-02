import React from 'react'
import Public_Navbar from '../pages/public/common/Public_Navbar'
import Public_TopBar from '../pages/public/common/Public_TopBar'
import Public_Footer from '../pages/public/common/Public_Footer';

function PublicLayout({children}) {
  const isHomePage = location.pathname === "/";
  return (
    <>
      <header>
        <Public_TopBar/>
        <Public_Navbar/>
      </header>
        <main style={{paddingTop: isHomePage? 0 : "calc(var(--topbar-height) + var(--navbar-height))",}}>{children}</main>
      <footer><Public_Footer /></footer>
    </>
  );
}

export default PublicLayout