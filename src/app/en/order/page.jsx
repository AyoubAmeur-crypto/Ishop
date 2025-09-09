'use client'
import ProtectedRoutes from '@/app/context/ProtectedRoutes'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserOrders } from '@/app/api/product/order'
import Link from 'next/link'

export default function OrderPage() {
  const [showPromoPopup, setShowPromoPopup] = useState(false)
  const [loading,setLoading]=useState(false)
  const [orders,setOrders]=useState([])
  const router = useRouter()


  const getOrderDetais = async ()=>{

    setLoading(true)
    try {

      const serverRes = await getUserOrders()
      setOrders(serverRes.orders)
      
    } catch (error) {
      console.log("can't get order details for this user due to this",error);
      
      
    }finally{

      setLoading(false)
    }
  }

  useEffect(() => {
    setShowPromoPopup(true)
    getOrderDetais()
  }, [])

  

  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (index) => {
    const statuses = ['Delivered', 'Shipped', 'Processing']
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500']
    return {
      status: statuses[index % 3],
      color: colors[index % 3]
    }
  }

  return (
    <ProtectedRoutes>
      <div className="min-h-screen bg-black text-white">
        {/* Promotional Popup */}
        {showPromoPopup && (
<div className="fixed inset-0 bg-black/60  z-50 flex items-center justify-center p-4 animate-fadeIn">
  <div className="bg-black border-2 border-yellow-400 rounded-2xl max-w-4xl w-full relative overflow-hidden animate-slideInFromBottom">
              {/* Close Button */}
              <button 
                onClick={() => setShowPromoPopup(false)}
                className="absolute top-6 right-6 w-12 h-12 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-full flex items-center justify-center transition-all duration-200 z-10 border border-yellow-400/50"
              >
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-[620px]">
                {/* Left Side - Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
                    alt="iShop Morocco - Premium Shopping"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent"></div>
                  
                 
                </div>

                {/* Right Side - Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-black">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 px-4 py-2 rounded-full w-fit mb-6">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-yellow-400 font-bold text-sm">MOROCCO'S #1 STORE</span>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-4 leading-tight">
                    Best Delivery with <span className="text-white">iShop</span>
                  </h1>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                    Morocco's Premier Shopping Destination
                  </h2>

                  

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Free Shipping All Over Morocco</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Express Delivery 24-48h</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Best Prices Guaranteed</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  

                  {/* Bottom Text */}
                  <p className="text-gray-400 text-sm mt-6 text-center">
                    🇲🇦 Proudly serving Morocco since 2020
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Original Order Page Content */}
        <div className="relative bg-black border-b border-yellow-400/20 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 ">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop"
              alt="Premium shopping background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Background Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          {/* Left Banner with Image */}
          <div className="absolute left-0 top-0 bottom-0 w-24 hidden lg:block overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
              alt="Fashion shopping"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-yellow-400/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-black font-bold text-xs transform -rotate-90 whitespace-nowrap">
                PREMIUM ORDERS
              </div>
            </div>
          </div>
          
          {/* Right Banner with Image */}
<div className="absolute right-0 top-0 bottom-0 w-24 overflow-hidden hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
              alt="Shopping bags"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-yellow-400/80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-black font-bold text-xs transform rotate-90 whitespace-nowrap">
                TRACK & MANAGE
              </div>
            </div>
          </div>
          
          <div className="relative max-w-6xl mx-auto py-20 px-4 ml-24 mr-24 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h1 className="lg:text-6xl text-2xl font-bold text-yellow-400 drop-shadow-lg">My Orders</h1>
              </div>
              <p className="text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                Track and manage your premium shopping experience with detailed order history
              </p>
<div className="mt-8 mb-8">
                <Link 
                  href="/en"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/25"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-lg">Continue Shopping</span>
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </Link>
              </div>
              
              {/* Decorative Elements */}
              <div className="flex justify-center gap-8 mt-8">
                <div className="flex items-center gap-2 text-yellow-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium">Secure Orders</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-12 px-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-black border border-yellow-400/30 p-8 rounded-2xl relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full -mr-12 -mt-12 group-hover:bg-yellow-400/20 transition-all duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-yellow-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/30 transition-all duration-300">
                  <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-yellow-400 font-semibold mb-3 text-xl">Total Orders</h3>
                <p className="text-5xl font-bold text-white mb-2">{orders.length}</p>
                <p className="text-gray-400 text-sm">Orders placed</p>
              </div>
            </div>

            <div className="bg-black border border-yellow-400/30 p-8 rounded-2xl relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full -mr-12 -mt-12 group-hover:bg-yellow-400/20 transition-all duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-yellow-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/30 transition-all duration-300">
                  <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-yellow-400 font-semibold mb-3 text-xl">Total Spent</h3>
                <p className="text-5xl font-bold text-white mb-2">
                  ${orders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm">Amount invested</p>
              </div>
            </div>

            <div className="bg-black border border-yellow-400/30 p-8 rounded-2xl relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full -mr-12 -mt-12 group-hover:bg-yellow-400/20 transition-all duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-yellow-400/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/30 transition-all duration-300">
                  <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-yellow-400 font-semibold mb-3 text-xl">Items Ordered</h3>
                <p className="text-5xl font-bold text-white mb-2">
                  {orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
                </p>
                <p className="text-gray-400 text-sm">Products purchased</p>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-8">
            {orders.map((order, index) => {
              const status = getStatusBadge(index)
              return (
                <div key={order._id} className="bg-black border border-yellow-400/30 rounded-2xl overflow-hidden relative hover:border-yellow-400/50 transition-all duration-300">
                  {/* Left Border Accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
                  
                  {/* Order Header */}
                  <div className="p-8 border-b border-yellow-400/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-yellow-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-4 mb-3">
                            <h3 className="lg:text-2xl md:text-md text-sm font-bold text-white">Order #{order._id}</h3>
                            
                          </div>
                          <p className="text-gray-400">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="md:text-3xl text-xl font-bold text-yellow-400 mb-1">${order.totalPrice}</p>
                        <p className="text-gray-400 flex items-center justify-end gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {order.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold text-yellow-400">
                        Items ({order.items.reduce((sum, item) => sum + item.quantity, 0)})
                      </h4>
                    </div>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.product._id} className="flex items-center gap-6 p-6 bg-yellow-400/5 rounded-xl border border-yellow-400/20 hover:border-yellow-400/30 transition-all duration-300">
                          <img 
                            src={item.product.image} 
                            alt={item.product.title}
                            className="w-20 h-20 object-cover rounded-xl border border-yellow-400/30"
                          />
                          <div className="flex-1">
<h5 className="font-bold text-white text-xs lg:text-lg mb-2">
  <span className="lg:hidden">
    {item.product.title.length > 10 
      ? `${item.product.title.substring(0, 10)}...` 
      : item.product.title
    }
  </span>
  <span className="hidden lg:inline">
    {item.product.title}
  </span>
</h5>  <p className="text-gray-400 mb-3  w-fit">{item.product.brand}</p>
  <div className="flex items-center justify-between gap-4 w-full ">
    <span className="text-yellow-400 font-bold text-sm lg:text-lg">${item.product.price}</span>
    <span className="text-gray-400 whitespace-nowrap">Qty: {item.quantity}</span>
  </div>
</div>
                          <div className="text-right mr-2 w-44 ">
                            <p className="text-white font-bold lg:text-xl text-sm">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  )
}