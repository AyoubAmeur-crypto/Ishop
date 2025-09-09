import ProtectedRoutes from '@/app/context/ProtectedRoutes'
import React from 'react'

function about() {
  return (
    <ProtectedRoutes><div>about</div></ProtectedRoutes>
  )
}

export default about