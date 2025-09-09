import React from 'react'
import NavBarEng from './NavBarEng'
import MovingBanner from './movingBanner/page';
import FooterEn from './footer/page';


function EngLayout({children}) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <MovingBanner/>
      <main className="flex-1 w-full">{children}</main>
      <FooterEn/>
    </div>
  );
}

export default EngLayout