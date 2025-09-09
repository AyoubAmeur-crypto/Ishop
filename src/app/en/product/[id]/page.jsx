'use client'
import { useParams } from 'next/navigation'
import {oneProduct,oneGeneralProduct} from '../../../api/product/product'
import { ArrowLeft } from 'lucide-react'
import NavBarEng from '../../NavBarEng'
import { addToCart } from '@/app/api/product/cart'
import { Toast } from 'primereact/toast'
import '../../../globals.css'

import React, { useContext, useEffect, useState,useRef } from 'react'
import Link from 'next/link'
import { userFetchedData } from '@/app/context/AuthContext'
import Reviews from '@/app/reviews/page'

export default function Page() {
    const params = useParams()
    const [product,setProduct]=useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const toast = useRef(null)

    const {isLogged}=useContext(userFetchedData)

    const { id } = params
  
    const getTheProduct = ()=>{
        if(isLogged){
            const getProduct = async ()=>{
                try {
                    setLoading(true)
                    const dataFetched = await oneProduct(id)
                    console.log("fetched data prduct",dataFetched);
                    setProduct(dataFetched)
                } catch (error) {
                    console.log("can't fetch due to this",error);
                }finally{
                    setLoading(false)
                }
            }
            getProduct()
            return
        }

        const getGenProduct = async ()=>{
            try {
                setLoading(true)
                const dataFetched = await oneGeneralProduct(id)
                console.log("fetched data prduct",dataFetched);
                setProduct(dataFetched)
            } catch (error) {
                console.log("can't fetch due to this",error);
            }finally{
                setLoading(false)
            }
        }
        getGenProduct()
    }

    const increaseQuantity = () => {
        if (quantity < (product?.stock || 1)) {
            setQuantity(prev => prev + 1)
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value)
        if (value >= 1 && value <= (product?.stock || 1)) {
            setQuantity(value)
        }
    }

    const addAuthToCart = async (product) => {
        try {
            if (!isLogged) {
                window.location.href = '/login'
                return
            }
            const addToCartRes = await addToCart(product._id)
            if (addToCartRes.success) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Added to Cart',
                    detail: `${product.title} has been added to your cart!`,
                    life: 3000
                })
                await getTheProductUpdate()
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to add product to cart. Please try again.',
                life: 3000
            })
        }
    }

    const getTheProductUpdate = async () => {
        try {
            const dataFetched = await oneProduct(id)
            console.log("updated product data", dataFetched);
            setProduct(dataFetched)
        } catch (error) {
            console.log("can't update product due to this", error);
        }
    }

    useEffect(()=>{
        if(id){
            getTheProduct()
        }
    },[id,isLogged])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-yellow-400 text-xl font-bold animate-pulse">Loading...</span>
            </div>
        )
    }
    
    if (!product) {
        return (
            <div className="flex flex-col">
                <NavBarEng/>
                <div className="flex items-center justify-center h-screen text-2xl text-yellow-400">
                    Product not found.
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <Toast ref={toast} position="top-center"/>
            <NavBarEng onCartUpdate={getTheProductUpdate}/>

            <div className="mx-auto w-full px-4 sm:px-8 lg:px-12 py-4 sm:py-8 lg:py-12">
                
                <Link
                    href="/en"
                    className="inline-flex items-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-yellow-400 font-semibold shadow hover:bg-yellow-400 hover:text-black transition mb-4"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Back</span>
                </Link>

                {/* Mobile Layout */}
                <div className="flex flex-col lg:hidden gap-6">
                    {/* Mobile Image Section */}
                    <div className="w-full">
                        <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-white rounded-xl shadow-lg p-4 sm:p-6">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-64 sm:h-80 object-contain mx-auto"
                            />
                        </div>
                    </div>

                    {/* Mobile Product Details */}
                    <div className="w-full space-y-4 sm:space-y-6">
                        {/* Category Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <span className="inline-block rounded-full bg-yellow-400 px-4 py-1 text-xs sm:text-sm font-bold text-black uppercase tracking-wide shadow-lg w-fit">
                                {product.category}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400 font-medium">SKU: #{product._id?.slice(-8)}</span>
                        </div>

                        {/* Title */}
                        <div className="space-y-1 sm:space-y-2">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                                {product.title}
                            </h1>
                            <p className="text-base sm:text-lg text-yellow-400 font-semibold">{product.brand}</p>
                        </div>

                        {/* Rating & Reviews */}
                        

                        {/* Price Section */}
                        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-xl p-4 sm:p-6">
                            <div className="flex flex-wrap items-baseline gap-2 sm:gap-4">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-yellow-400">
                                    ${product.price}
                                </span>
                                <span className="text-base sm:text-lg text-gray-400 line-through">
                                    ${(product.price * 1.2).toFixed(2)}
                                </span>
                                <span className="bg-red-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-full">
                                    -17%
                                </span>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm mt-2">Free shipping on orders over $50</p>
                        </div>

                        {/* Stock & Availability */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${product.stock > 10 ? 'bg-green-400' : product.stock > 0 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                                <span className="text-white font-medium text-sm sm:text-base">
                                    {product.stock > 10 ? `In Stock (${product.stock} available)` : 
                                     product.stock > 0 ? `Low Stock (${product.stock} left)` : 
                                     'Out of Stock'}
                                </span>
                            </div>
                            <span className="text-gray-400 text-xs sm:text-sm">
                                Added: {new Date(product.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Product Description */}
                        <div className="space-y-2 sm:space-y-3">
                            <h3 className="text-lg sm:text-xl font-bold text-white">Product Details</h3>
                            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-2 sm:space-y-3">
                            <h3 className="text-lg sm:text-xl font-bold text-white">Key Features</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                <div className="flex items-center gap-2 sm:gap-3 bg-black/30 rounded-lg p-2 sm:p-3">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-gray-300 text-xs sm:text-sm">Premium Quality</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 bg-black/30 rounded-lg p-2 sm:p-3">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-gray-300 text-xs sm:text-sm">1 Year Warranty</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 bg-black/30 rounded-lg p-2 sm:p-3">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-gray-300 text-xs sm:text-sm">Fast Delivery</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 bg-black/30 rounded-lg p-2 sm:p-3">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-gray-300 text-xs sm:text-sm">30-Day Returns</span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <span className="text-white font-semibold text-sm sm:text-base">Quantity:</span>
                            <div className="flex items-center border border-yellow-400/30 rounded-lg overflow-hidden bg-black/20 w-fit">
                                <button 
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    className="px-3 py-2 bg-black/50 text-yellow-400 hover:bg-yellow-400 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    -
                                </button> 
                                <input
    type="number"
    value={quantity}
    onChange={handleQuantityChange}
    min="1"
    max={product.stock}
    className="no-spinner w-12 sm:w-16 px-2 sm:px-4 py-2 bg-black/30 text-white font-bold text-center border-0 outline-none text-sm sm:text-base"
/>
                                
                                <button 
                                    onClick={increaseQuantity}
                                    disabled={quantity >= product.stock}
                                    className="px-3 py-2 bg-black/50 text-yellow-400 hover:bg-yellow-400 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-gray-400 text-xs sm:text-sm">
                                {product.stock} available
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 pt-4">
                            <button
                                type="button"
                                onClick={()=>{addAuthToCart(product)}}
                                disabled={!!product.inCart}
                                className={`w-full inline-flex items-center justify-center rounded-xl px-6 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg transition transform ${
                                    product.inCart
                                        ? 'bg-yellow-400 text-black cursor-not-allowed'
                                        : 'bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105 active:scale-95'
                                }`}
                            >
                                <svg className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
                                </svg>
                                {product.inCart ? "Already in Cart" : "Add to Cart"}
                            </button>
                            <Link
                                href={{
                                    pathname:'/en/checkout',
                                    query:{
                                        id:product._id,
                                        quantity:quantity
                                    }
                                }}
                                className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-black to-gray-800 border-2 border-yellow-400 px-6 py-3 sm:py-4 text-base sm:text-lg font-bold text-yellow-400 shadow-lg hover:bg-yellow-400 hover:text-white transition transform hover:scale-105 active:scale-95"
                            >
                                <svg className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                                Buy Now
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-700">
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                </svg>
                                <span className="text-xs sm:text-sm">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                                </svg>
                                <span className="text-xs sm:text-sm">Best Price</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 002 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span className="text-xs sm:text-sm">Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex gap-12 items-start">
                    {/* Desktop Image Section */}
                    <div className="flex flex-col w-1/2 gap-6">
                        <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-white rounded-2xl shadow-lg p-8">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full max-w-xs h-96 object-contain mx-auto"
                            />
                        </div>
                        <div className="w-full">
                            <Reviews productId={id}/>
                        </div> 
                    </div>
                    
                    {/* Desktop Details Section */}
                    <div className="flex-1 w-full flex flex-col gap-8 max-w-2xl">
                        {/* Same content as mobile but with original desktop styling */}
                        {/* Category Badge */}
                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-yellow-400 px-6 py-2 text-sm font-bold text-black uppercase tracking-wide shadow-lg">
                                {product.category}
                            </span>
                            <span className="text-sm text-gray-400 font-medium">SKU: #{product._id?.slice(-8)}</span>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                                {product.title}
                            </h1>
                            <p className="text-lg text-yellow-400 font-semibold">{product.brand}</p>
                        </div>

                       

                        {/* Price Section */}
                        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-2xl p-6">
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black text-yellow-400">
                                    ${product.price}
                                </span>
                                <span className="text-lg text-gray-400 line-through">
                                    ${(product.price * 1.2).toFixed(2)}
                                </span>
                                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                    -17%
                                </span>
                            </div>
                            <p className="text-gray-300 text-sm mt-2">Free shipping on orders over $50</p>
                        </div>

                        {/* Stock & Availability */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${product.stock > 10 ? 'bg-green-400' : product.stock > 0 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                                <span className="text-white font-medium">
                                    {product.stock > 10 ? `In Stock (${product.stock} available)` : 
                                     product.stock > 0 ? `Low Stock (${product.stock} left)` : 
                                     'Out of Stock'}
                                </span>
                            </div>
                            <span className="text-gray-400 text-sm">
                                Added: {new Date(product.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Product Description */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white">Product Details</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3">
                                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-gray-300">Premium Quality</span>
                                </div>
                                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3">
                                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-gray-300">1 Year Warranty</span>
                                </div>
                                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3">
                                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-gray-300">Fast Delivery</span>
                                </div>
                                <div className="flex items-center gap-3 bg-black/30 rounded-lg p-3">
                                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span className="text-gray-300">30-Day Returns</span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="text-white font-semibold">Quantity:</span>
                            <div className="flex items-center border border-yellow-400/30 rounded-lg overflow-hidden bg-black/20">
                                <button 
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    className="px-4 py-2 bg-black/50 text-yellow-400 hover:bg-yellow-400 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                    max={product.stock}
                                    className="w-16 px-4 py-2 bg-black/30 text-white font-bold text-center border-0 outline-none"
                                />
                                <button 
                                    onClick={increaseQuantity}
                                    disabled={quantity >= product.stock}
                                    className="px-4 py-2 bg-black/50 text-yellow-400 hover:bg-yellow-400 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-gray-400 text-sm">
                                {product.stock} available
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="button"
                                onClick={()=>{addAuthToCart(product)}}
                                disabled={!!product.inCart}
                                className={`flex-1 inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-bold shadow-lg transition transform ${
                                    product.inCart
                                        ? 'bg-yellow-400 text-black cursor-not-allowed'
                                        : 'bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105 active:scale-95'
                                }`}
                            >
                                <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
                                </svg>
                                {product.inCart ? "Already in Cart" : "Add to Cart"}
                            </button>
                            <Link
                                href={{
                                    pathname:'/en/checkout',
                                    query:{
                                        id:product._id,
                                        quantity:quantity
                                    }
                                }}
                                className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-black to-gray-800 border-2 border-yellow-400 px-8 py-4 text-lg font-bold text-yellow-400 shadow-lg hover:bg-yellow-400 hover:text-white transition transform hover:scale-105 active:scale-95"
                            >
                                <svg className="mr-3 h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                                Buy Now
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-700">
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                </svg>
                                <span className="text-sm">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                                </svg>
                                <span className="text-sm">Best Price</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 002 2v8a2 2 0 002 2z"/>
                                </svg>
                                <span className="text-sm">Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section - Mobile Only (at bottom) */}
                <div className="lg:hidden mt-8">
                    <Reviews productId={id}/>
                </div>
            </div>
        </div>
    )
}