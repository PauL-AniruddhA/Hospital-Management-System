import React from 'react'
import PublicNavbar from '../pages/public/Components/PublicNavbar'
import TopBar from '../pages/public/Components/TopBar'
import Footer from '../pages/public/Components/Footer';

function PublicLayout({children}) {
  return (
    <>
      <TopBar/>
      <PublicNavbar/>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default PublicLayout