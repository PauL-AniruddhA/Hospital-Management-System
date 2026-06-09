import React from 'react'
import PublicNavbar from '../pages/public/common/PublicNavbar'
import TopBar from '../pages/public/common/TopBar'
import Footer from '../pages/public/common/Footer';

function PublicLayout({children}) {
  return (
    <>
      <header>
        <TopBar/>
        <PublicNavbar/>
      </header>
      <main style={{paddingTop: "calc(var(--topbar-height) + var(--navbar-height))"}}>{children}</main>
      <footer>{/* <Footer /> */}</footer>
    </>
  );
}

export default PublicLayout