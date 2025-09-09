import axios from 'axios'
import { useState } from 'react'

export async function SignUp(formData) 
{
 
    try {

        const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+'/api/auth/signup',{firstName:formData.firstName,lastName:formData.lastName,email:formData.email,password:formData.password},{withCredentials:true})

        if(res.data){

             return {
                success: true,
                message: res.data.message,
                type: 'success'
            }
        }
        
    } catch (error) {

        console.log("can't create the account due to this",error);
       

        if(error.response && error.response.data){

            return {
                success: false,
                message: error.response.data.error,
                type:'error'
            }
        }

         return {
            success: false,
            message: 'Something went wrong. Please try again.',
            type: 'error'
        }
        
        
    }




}


export async function login(formData){


    try {

        const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+'/api/auth/login',{email:formData.email,password:formData.password},{withCredentials:true})

        if(res.data.success){

            return {
                success:true,
                message:res.data.message,
                type:'success'
            }
        }
        
    } catch (error) {

        console.log("can't login due to this",error);

        if(error.response && error.response.data){

            return {

                success:false,
                message:error.response.data.message,
                type:'error'
            }
        }
        
        
    }
}

export async function logoutFromPage() {

    try {

        const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+'/api/user/logout',{},{withCredentials:true})

        if(res.data.success){

            return true
        }
        
    } catch (error) {

        if(error.response && error.response.data){

            console.log("can't logput due to this specific error",error.response.data);
            return false
            
        }
        console.log("can't logout due t this",error);
        return false



        
        
    }
    
}

 