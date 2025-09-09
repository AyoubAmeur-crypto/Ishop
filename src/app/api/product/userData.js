'use client'
import { userFetchedData } from '@/app/context/AuthContext'
import React, { useContext } from 'react'

function userData() {
    const {userData}=useContext(userFetchedData)
  return userData
}

export default userData