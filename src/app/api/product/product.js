
import axios from 'axios'

export  async function productList() {
  try {

    const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+'/api/product/allProducts',{withCredentials:true})

    if(res.data){

        return res.data.products
    }
    
  } catch (error) {

    console.log("can't fetch products due to this",error);
    return []
    
    
  }
}


export  async function generalProductList() {
  try {

    const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+'/api/product/allGeneralProducts')

    if(res.data){

        return res.data.products
    }
    
  } catch (error) {

    console.log("can't fetch products due to this",error);
    return []
    
    
  }
}

export  async function oneGeneralProduct(id) {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+`/api/product/oneGeneralProduct/${id}`)

  if(res.data){
    console.log("fetched product ",res.data);
    
    return res.data.product
  }
  
    
  } catch (error) {

    console.log("can't fetch the product due to this",error);
    return
    
  
    
  }
}

export  async function oneProduct(id) {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+`/api/product/oneProduct/${id}`,{withCredentials:true})

  if(res.data){
    console.log("fetched product ",res.data);
    
    return res.data.product
  }
  
    
  } catch (error) {

    console.log("can't fetch the product due to this",error);
    return
    
  
    
  }
}


