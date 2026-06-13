import React from 'react'
import PublicNavbar from '../pages/public/common/PublicNavbar'
import TopBar from '../pages/public/common/TopBar'
import Footer from '../pages/public/common/Footer';

function PublicLayout({children}) {
  const isHomePage = location.pathname === "/";
  return (
    <>
      <header>
        <TopBar/>
        <PublicNavbar/>
      </header>
      <main style={{paddingTop: isHomePage? 0 : "calc(var(--topbar-height) + var(--navbar-height))",}}>{children}</main>
      <footer><Footer /></footer>
    </>
  );
}

export default PublicLayout