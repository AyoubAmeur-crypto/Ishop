import axios from "axios";

export async function placeOrder(formData,productId,quantity){

try {

    const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+`/api/order/createOrder/${productId}`,{formData:formData,quantity:quantity},{withCredentials:true})

    if (res.data.success){

        return res.data
    }
    
} catch (error) {

    console.log("can't process the order please try again",error)
    
    
}


}

export async function getUserOrders(){

    try {

        const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+'/api/order/getUserOrders',{withCredentials:true})

        if(res.data.success){

            return res.data
        }

        
        
    } catch (error) {

        console.log("can't get order data for this user due to this",error);
        
        
    }
}

export async function createOrderFromCart(formData) {

    try {

    const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+`/api/order/createOrderFromCart`,{formData:formData},{withCredentials:true})

    if (res.data.success){

        return res.data
    }
    
} catch (error) {

    console.log("can't process the order please try again",error)
    
    
}
    
}