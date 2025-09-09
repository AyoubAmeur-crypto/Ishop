import axios from "axios";

export async function getReviews(productId){


    try {

        const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+`/api/review/getReviews/${productId}`,{withCredentials:true})

        if(res.data.success){

            console.log("reviews loaded",res.data.reviews);
            

            return res.data
        }


        
    } catch (error) {

        console.log("can't get reviews details due to this",error);
        
        
    }
}

export async function addReview(productId,comment,raiting) {

    try {

          const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+`/api/review/addReview/${productId}`,{comment:comment,raiting:raiting},{withCredentials:true})

        if(res.data.success){

            console.log("reviews loaded",res.data.reviews);
            

            return res.data
        }
        
    } catch (error) {

                console.log("can't add this review  due to this",error);

        
    }
    
}