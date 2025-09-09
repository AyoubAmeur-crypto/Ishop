'use client'
import React, { useContext } from 'react'
import { userFetchedData } from './AuthContext'
import LoginPage from '../login/page'

function ProtectedRoutes({children}) {
    const {isLogged,userData,loading} = useContext(userFetchedData)
    if(loading){

        return <div className='text-yellow-600'>Loading...</div>
    }
    if(!isLogged){

        return <LoginPage/>
    }

    return children
}

export default ProtectedRoutes