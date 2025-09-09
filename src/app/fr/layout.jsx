import React from 'react'
import NavBarFr from './NavBarFr'

function FrenchLayout({children}) {
  return (

      <div className="w-full min-h-screen flex flex-col">
      <NavBarFr/>
      <main className="flex-1 w-full">{children}</main>
    </div>
  )
}

export default FrenchLayout