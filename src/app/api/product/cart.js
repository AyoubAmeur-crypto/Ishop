import axios from "axios";

export async function addToCart(productId){



    try {

        const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+`/api/cart/addToCart/${productId}`,{},{withCredentials:true})

        if(res.data.success){

            return res.data
        }
    } catch (error) {

        console.log("can't add to the cart due to this",error);
        if(error.response && error.response.data){

            return error.response.data
        }
        
        
    }
}

export async function getCatUserDetails() {



    try {

        const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+'/api/cart/getCart',{withCredentials:true})

        if(res.data.success){

            console.log("cart server response ",res.data);
            

            return res.data
        }


        
    } catch (error) {

        console.log("can't get the cart due to this",error);


        if(error.response && error.response.data){

            console.log("error cart server response",error.response.data.error);
            return
            
        }
        
        
    }
}

export async function removeProductFromCart(itemId){


    try {

        const res = await axios.delete(process.env.NEXT_PUBLIC_SERVER_URL+`/api/cart/removeItemFromCart/${itemId}`,{withCredentials:true})

        if(res.data.success){

            return res.data.message
        }
        
    } catch (error) {

        console.log("can't remove item from cart due to this",error);

        if(error.response && error.response.data){

            console.log("server response error ",error.response.data.error);

            return error.response.data.error
            
        }
        
        
    }
}


export async function  updateCartServerQuantity(itemId,quantity){

    try {

        const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+`/api/cart/updateCartQuantity/${itemId}`,{quantity:quantity},{withCredentials:true})

        if(res.data.success){

            return res.data.message
        }
        
    } catch (error) {
        console.log("can't update the cart quantity due to this",error);

        if(error.response && error.response.data){

            console.log("can't update quantity due to a server error ",error.response.data.error);
            
        }
        
    }
}