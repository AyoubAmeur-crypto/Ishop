'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export  const userFetchedData = createContext(null)

function AuthContext({children}) {
    const [loading,setLoading]=useState(false)
    const [userData,setUserData]=useState(null)

    const getUserData = async ()=>{

        setLoading(true)
        try {

            const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+'/api/user/userData',{withCredentials:true})
            if(res){

                console.log("user fetched data",res.data);
                setUserData(res.data.user)


                
            }

            
        } catch (error) {

            console.log("can't get userData due to this",error);
            setUserData(null)
            
            
        }finally{

            setLoading(false)
        }
    }

    useEffect(()=>{
        getUserData()

    },[])
    const isLogged = !!userData
  return (
    <userFetchedData.Provider value={{isLogged,userData,loading,setUserData}}
    
    >{children}</userFetchedData.Provider>
  )
}

export default AuthContext