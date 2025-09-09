'use client'
import { userFetchedData } from '@/app/context/AuthContext'
import React, { useContext } from 'react'

// Rename the internal function but keep the export name
function GetUserDataFromContext() {
    const {userData} = useContext(userFetchedData)
    return userData
}

const userData = GetUserDataFromContext
export default userData