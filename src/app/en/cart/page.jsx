'use client'
import ProtectedRoutes from '@/app/context/ProtectedRoutes'
import React, { useContext, useEffect, useState } from 'react'
import { Trash2, Plus, Minus, ShoppingBag, Lock, Truck, Shield, CreditCard, ArrowRight, Heart, Star, Gift, Tag, Percent, Clock } from 'lucide-react'
import Link from 'next/link'
import NavBarEng from '../NavBarEng'
import { getCatUserDetails,removeProductFromCart,updateCartServerQuantity } from '@/app/api/product/cart'
import { productList } from '@/app/api/product/product'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { userFetchedData } from '@/app/context/AuthContext'

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [suggestedProduct,setSuggestedProduct]=useState([])
  const {isLogged}=useContext(userFetchedData)
  
  const getCartInfos = async ()=>{
    try {
      const res = await getCatUserDetails()
      console.log("server response",res.cart.items);
      setCartItems(res.cart.items)
    } catch (error) {
      console.log("can't get cart due to this",error);
    }
  }

  const getSuggestedProducts = async ()=>{


    try {
      const getProducts = await productList()

      setSuggestedProduct(getProducts)
      
    } catch (error) {

      console.log("can't get product due to this",error);


      
      
    }
  }

  useEffect(()=>{
    getCartInfos()
    getSuggestedProducts()
  },[isLogged])

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(prev => 
      prev.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
    await updateCartServerQuantity(itemId,newQuantity)
    await getCartInfos()
  }

  const removeItem = async (itemId) => {
    setCartItems(prev => prev.filter(item => item._id !== itemId))
    await removeProductFromCart(itemId)
    await getCartInfos()
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)
  }

  const calculateTax = (subtotal) => subtotal * 0.1
  const calculateShipping = (subtotal) => subtotal > 100 ? 0 : 9.99
  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal + calculateTax(subtotal) + calculateShipping(subtotal)
  }

  return (
    <ProtectedRoutes>
      <div className="min-h-screen bg-black overflow-x-hidden">
        <NavBarEng onCartUpdate={getCartInfos} />
        
        {/* Cart Hero Banner with Real Image */}
        <div className="relative w-full h-48 lg:h-64">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop" 
            alt="Shopping Cart Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80">
            <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-center text-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-3 drop-shadow-2xl">
                  🛒 Your Shopping Cart
                </h1>
                <p className="text-white/90 text-lg lg:text-xl font-medium mb-4">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready for checkout
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Shield size={20} className="text-yellow-400" />
                  <span className="text-white font-medium">Secure checkout • Free shipping over $100</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
        </div>

        {/* Main Content with Side Banners */}
        <div className="flex w-full max-w-[1440px] mx-auto">
          {/* Left Promotional Banner */}
          <div className="hidden xl:block w-[140px] flex-shrink-0">
            <div className="sticky top-4 space-y-4 p-2">
              {/* Small Icon Banners */}
              <Link href="/en?category=electronics" className="block">
                <div className="relative overflow-hidden rounded-xl transform rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer group">
                  <img 
                    src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=400&fit=crop" 
                    alt="Electronics Sale"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-700/70 to-transparent">
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <Percent size={20} className="text-white mx-auto mb-1" />
                      <p className="text-white font-black text-sm">50% OFF</p>
                      <p className="text-white text-xs">Electronics</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">SALE</span>
                  </div>
                </div>
              </Link>
              
              <div className="relative overflow-hidden rounded-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&h=400&fit=crop" 
                  alt="Free Shipping"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-700/70 to-transparent">
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <Gift size={20} className="text-white mx-auto mb-1" />
                    <p className="text-white font-black text-sm">FREE</p>
                    <p className="text-white text-xs">Shipping</p>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">$100+</span>
                </div>
              </div>
              
              <Link href="/en?category=women's clothing" className="block">
                <div className="relative overflow-hidden rounded-xl transform rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop" 
                    alt="Fashion Sale"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-700/70 to-transparent">
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <Clock size={20} className="text-white mx-auto mb-1" />
                      <p className="text-white font-black text-sm">24H</p>
                      <p className="text-white text-xs">Delivery</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">FAST</span>
                  </div>
                </div>
              </Link>

              {/* Long Vertical Banner - Left */}
              <Link href="/en?category=men's clothing" className="block mt-6">
                <div className="relative overflow-hidden rounded-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer group">
                  <img 
                    src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=300&h=800&fit=crop" 
                    alt="Men's Fashion Collection"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30">
                    <div className="absolute bottom-4 left-3 right-3 text-center">
                      <h3 className="text-white font-black text-lg mb-2">MEN'S</h3>
                      <p className="text-white font-bold text-sm mb-1">FASHION</p>
                      <p className="text-yellow-400 text-xs font-medium">UP TO 60% OFF</p>
                    </div>
                    <div className="absolute top-4 left-3">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                        NEW SEASON
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-yellow-400/10 border-2 border-yellow-400/50 rounded-xl"></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 px-4 py-8 min-w-0">
            {cartItems.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={48} className="text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Add some products to get started</p>
                <Link href="/en">
                  <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-3 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-600 transition">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Free Shipping Banner */}
                  <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Gift className="text-green-400" size={24} />
                      <div>
                        <p className="text-green-400 font-semibold">🎉 Congratulations!</p>
                        <p className="text-white text-sm">You qualify for FREE shipping on this order!</p>
                      </div>
                    </div>
                  </div>

                  {cartItems.map((item, index) => (
                    <div key={item._id} className="bg-black/40 border border-yellow-400/20 rounded-2xl p-6 backdrop-blur-sm hover:border-yellow-400/40 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="w-full sm:w-32 h-32 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 group">
                          <img
                            src={item.product?.image}
                            alt={item.product?.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="flex-1">
                              <Link href={`/en/product/${item.product?._id}`}>
                                <h3 className="text-white font-semibold text-lg hover:text-yellow-400 transition line-clamp-2 cursor-pointer">
                                  {item.product?.title}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                                  {item.product?.category}
                                </span>
                                <span className="text-gray-400 text-sm">{item.product?.brand}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex items-center gap-1">
                                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                  <span className="text-yellow-400 text-sm font-medium">
                                    {item.product?.ratings}
                                  </span>
                                </div>
                                <span className="text-gray-500">•</span>
                                <span className="text-green-400 text-sm font-medium">In Stock</span>
                              </div>
                            </div>
                            
                            <div className="text-right sm:ml-4">
                              <p className="text-2xl font-bold text-yellow-400">
                                ${item.product?.price?.toFixed(2)}
                              </p>
                              <p className="text-gray-400 text-sm">per item</p>
                              {index === 0 && (
                                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                                  15% OFF
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border border-yellow-400/30 rounded-lg bg-black/20">
                                <button
                                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="p-2 text-white hover:text-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="px-4 py-2 text-white font-medium min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                  className="p-2 text-white hover:text-yellow-400 transition"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              <div className="text-sm">
                                <p className="text-gray-400">Item total:</p>
                                <p className="text-white font-semibold">
                                  ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button 
                                className="p-2 text-gray-400 hover:text-yellow-400 transition rounded-lg hover:bg-yellow-400/10"
                                title="Save for later"
                              >
                                <Heart size={18} />
                              </button>
                              <button
                                onClick={() => removeItem(item._id)}
                                className="p-2 text-gray-400 hover:text-red-400 transition rounded-lg hover:bg-red-400/10"
                                title="Remove item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Recommended Products */}
     <div className="mt-8 bg-black/40 border border-yellow-400/20 rounded-2xl p-6">
  <h3 className="text-xl font-bold text-white mb-4">You might also like</h3>
  
  <div className="relative">
    {/* Left Arrow - Positioned in center of swiper */}
    <button className="swiper-button-prev-custom absolute left-[-40] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-yellow-400/80 hover:bg-yellow-400/40 rounded-full flex items-center justify-center transition-colors group shadow-lg">
      <svg className="w-5 h-5 text-black group-hover:text-black transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    {/* Right Arrow - Positioned in center of swiper */}
    <button className="swiper-button-next-custom absolute right-[-40] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-yellow-400/80 hover:bg-yellow-400/40 rounded-full flex items-center justify-center transition-colors group shadow-lg">
      <svg className="w-5 h-5 text-black group-hover:text-black transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={16}
      slidesPerView={1}
      navigation={{
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      }}
      pagination={{ 
        clickable: true,
        el: '.swiper-pagination-custom',
        bulletClass: 'swiper-pagination-bullet-custom',
        bulletActiveClass: 'swiper-pagination-bullet-active-custom'
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={suggestedProduct.length > 3}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
      }}
      className="suggested-products-swiper mx-12"
    >
      {suggestedProduct.map((product, index) => (
        <SwiperSlide key={index}>
          <Link href={`/en/product/${product._id}`}>
            <div className="bg-black/20 rounded-lg p-4 border border-yellow-400/10 hover:border-yellow-400/30 transition cursor-pointer group h-full">
              <div className="w-full h-40 rounded-lg mb-3 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-white text-sm font-medium mb-2 line-clamp-2">
                {product.title.length > 40 ? product.title.slice(0, 40) + '...' : product.title}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-yellow-400 text-sm font-bold">${product.price}</p>
                <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                  {product.category}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 text-xs">{product.ratings}</span>
                </div>
                <span className="text-gray-400 text-xs">{product.brand}</span>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Custom Pagination - Centered below swiper */}
  <div className="flex flex-col items-end justify-center w-full   mt-6">
    <div className="swiper-pagination-custom flex flex-row items-center justify-center  gap-2"></div>
  </div>
</div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  {/* Promo Code */}
                  <div className="bg-black/40 border border-yellow-400/20 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-white mb-4">Promo Code</h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 bg-black/40 border border-yellow-400/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      />
                      <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-black/40 border border-yellow-400/20 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal ({cartItems.length} items)</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Discount</span>
                        <span className="text-green-400">-$30.00</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Tax (10%)</span>
                        <span>${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Shipping</span>
                        <span className="text-green-400">FREE</span>
                      </div>
                      <div className="border-t border-yellow-400/20 pt-4">
                        <div className="flex justify-between text-xl font-bold text-white">
                          <span>Total</span>
                          <span className="text-yellow-400">${(calculateTotal() - 30).toFixed(2)}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">You saved $39.99!</p>
                      </div>
                    </div>

                    <Link href="/en/cartCheckout" >
                      <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition flex items-center justify-center gap-2 mb-4 hover:scale-105 transform duration-200">
                        Proceed to Checkout
                        <ArrowRight size={20} />
                      </button>
                    </Link>

                    <Link href="/en">
                      <button className="w-full border border-yellow-400/30 text-white py-3 rounded-xl font-medium hover:bg-yellow-400/10 transition">
                        Continue Shopping
                      </button>
                    </Link>

                    {/* Payment Methods */}
                    <div className="mt-6 pt-6 border-t border-yellow-400/20">
                      <p className="text-gray-400 text-sm mb-3">We accept:</p>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          VISA
                        </div>
                        <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          MC
                        </div>
                        <div className="w-10 h-6 bg-yellow-400 rounded text-black text-xs flex items-center justify-center font-bold">
                          PP
                        </div>
                        <div className="w-10 h-6 bg-gray-800 border border-gray-600 rounded text-white text-xs flex items-center justify-center">
                          <CreditCard size={12} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-black/40 border border-yellow-400/20 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-white mb-4">Why Shop With Us?</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
                          <Lock size={20} className="text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Secure Payments</p>
                          <p className="text-gray-400 text-sm">256-bit SSL encryption</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
                          <Truck size={20} className="text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Fast Delivery</p>
                          <p className="text-gray-400 text-sm">2-3 business days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
                          <Shield size={20} className="text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">30-Day Returns</p>
                          <p className="text-gray-400 text-sm">Money-back guarantee</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Promotional Banner */}
          <div className="hidden xl:block w-[140px] flex-shrink-0">
            <div className="sticky top-4 space-y-4 p-2">
              {/* Small Icon Banners */}
              <Link href="/en?category=jewelery" className="block">
                <div className="relative overflow-hidden rounded-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=400&fit=crop" 
                    alt="New Jewelry Collection"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-700/70 to-transparent">
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <Tag size={20} className="text-white mx-auto mb-1" />
                      <p className="text-white font-black text-sm">NEW</p>
                      <p className="text-white text-xs">Arrivals</p>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">HOT</span>
                  </div>
                </div>
              </Link>
              
              <div className="relative overflow-hidden rounded-xl transform rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=400&fit=crop" 
                  alt="Bundle Deals"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-700/70 to-transparent">
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <Gift size={20} className="text-white mx-auto mb-1" />
                    <p className="text-white font-black text-sm">BUNDLE</p>
                    <p className="text-white text-xs">Deals</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">3+1</span>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=400&fit=crop" 
                  alt="VIP Membership"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-700/70 to-transparent">
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <Star size={20} className="text-white mx-auto mb-1" />
                    <p className="text-white font-black text-sm">VIP</p>
                    <p className="text-white text-xs">Member</p>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold">PREMIUM</span>
                </div>
              </div>

              {/* Long Vertical Banner - Right */}
              <Link href="/en?category=electronics" className="block mt-6">
                <div className="relative overflow-hidden rounded-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer group">
                  <img 
                    src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&h=800&fit=crop" 
                    alt="Tech & Electronics"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30">
                    <div className="absolute bottom-4 left-3 right-3 text-center">
                      <h3 className="text-white font-black text-lg mb-2">TECH</h3>
                      <p className="text-white font-bold text-sm mb-1">GADGETS</p>
                      <p className="text-yellow-400 text-xs font-medium">LATEST ARRIVALS</p>
                    </div>
                    <div className="absolute top-4 right-3">
                      <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                        TRENDING
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-yellow-400/10 border-2 border-yellow-400/50 rounded-xl"></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  )
}

export default Cart