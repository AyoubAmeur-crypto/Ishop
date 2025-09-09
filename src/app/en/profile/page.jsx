'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Package, User, Mail, Phone, MapPin, Calendar, Star, CreditCard } from 'lucide-react'
import { userFetchedData } from '@/app/context/AuthContext'
import ProtectedRoutes from '@/app/context/ProtectedRoutes'
import { getUserOrders } from '@/app/api/product/order'

function profile() {
    // Static user data
    const user = {
        firstName: 'Ahmed',
        lastName: 'Benali',
        email: 'ahmed.benali@email.com',
        phone: '+212 6 12 34 56 78',
        address: 'Casablanca, Morocco',
        joinDate: 'January 2023',
        totalOrders: 24,
        totalSpent: 2840.50,
        loyaltyPoints: 1250
    }
    const [orderDetails,setOrderDetails]=useState(null)


    const setDetailsOfOrder = async ()=>{

        try {

            const res = await getUserOrders()
            setOrderDetails(res.orders)
            
        } catch (error) {
            console.log("can't load order dtails api due to this",error);
            
            
        }
    }

    let totalUserPriceOrder = 0

    if (orderDetails && Array.isArray(orderDetails)) {
    orderDetails.forEach(order => {
        if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
                totalUserPriceOrder += (item.product?.price || 0) * (item?.quantity || 0)
            })
        }
    })
}



    useEffect(()=>{
        setDetailsOfOrder()
    },[])
    const {userData,loading}=useContext(userFetchedData)


    useEffect(() => {
    console.log("user data log", userData);
    console.log("loading state", loading);
}, [userData, loading])

     if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-yellow-400 text-xl font-bold">Loading Profile...</div>
                </div>
            </div>
        )
    }

 

    return (
       <ProtectedRoutes>
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-black border-b border-yellow-400/20 p-4 sm:p-6">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link
                        href="/en"
                        className="inline-flex items-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-yellow-400 font-semibold shadow hover:bg-yellow-400 hover:text-black transition"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Back to Shopping</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/en/cart"
                            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-black font-semibold shadow hover:bg-yellow-500 transition"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden sm:inline">Cart</span>
                        </Link>
                        <Link
                            href="/en/order"
                            className="inline-flex items-center gap-2 rounded-lg bg-black border border-yellow-400 px-4 py-2 text-yellow-400 font-semibold hover:bg-yellow-400 hover:text-black transition"
                        >
                            <Package className="w-4 h-4" />
                            <span className="hidden sm:inline">Orders</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-black border border-yellow-400/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
                            {/* Profile Picture */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/50">
                                        <span className="text-2xl sm:text-4xl font-black text-black">
                                              {userData?.firstName?.[0]?.toUpperCase() + userData?.lastName?.[0]?.toUpperCase() || 'AB'}

                                        </span>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                                     
                                    </div>
                                </div>

                                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                       {userData?.firstName +' '+ userData?.lastName}

                                </h1>
                                <div className="flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 rounded-full px-4 py-2">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <span className="text-yellow-400 font-semibold text-sm">VIP Member</span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">{orderDetails?.length}</div>
                                    <div className="text-xs text-gray-400">Orders</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400">${totalUserPriceOrder}</div>
                                    <div className="text-xs text-gray-400">Spent</div>
                                </div>
                               
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition">
                                    Verify Account
                                </button>
                                
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-black border border-yellow-400/20 rounded-2xl p-6 shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <User className="w-6 h-6 text-yellow-400" />
                                Personal Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-black/30 rounded-lg border border-yellow-400/10">
            <Mail className="w-5 h-5 text-yellow-400" />
            <div className="flex-1">
                <div className="text-gray-400 text-sm">Email</div>
                <div className="text-white font-medium">{userData?.email || 'Not provided'}</div>
            </div>
            {userData?.isVerified && (
                <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                    Verified
                </div>
            )}
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-black/30 rounded-lg border border-yellow-400/10">
            <User className="w-5 h-5 text-yellow-400" />
            <div>
                <div className="text-gray-400 text-sm">Full Name</div>
                <div className="text-white font-medium">
                    {userData?.firstName || 'N/A'} {userData?.lastName || ''}
                </div>
            </div>
        </div>
    </div>

    <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-black/30 rounded-lg border border-yellow-400/10">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${userData?.isVerified ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                {userData?.isVerified ? '✓' : '?'}
            </div>
            <div>
                <div className="text-gray-400 text-sm">Verification Status</div>
                <div className={`font-medium ${userData?.isVerified ? 'text-green-400' : 'text-gray-400'}`}>
                    {userData?.isVerified ? 'Account Verified' : 'Pending Verification'}
                </div>
            </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-black/30 rounded-lg border border-yellow-400/10">
            <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                userData?.role === 'admin' ? 'bg-red-500 text-white' : 
                userData?.role === 'moderator' ? 'bg-blue-500 text-white' : 
                'bg-yellow-400 text-black'
            }`}>
                {userData?.role?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
                <div className="text-gray-400 text-sm">Account Role</div>
                <div className="text-white font-medium capitalize">
                    {userData?.role || 'User'}
                </div>
            </div>
        </div>
    </div>
</div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-black border border-yellow-400/20  rounded-2xl p-6 shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <Package className="w-6 h-6 text-yellow-400" />
                                Recent Orders
                            </h2>
                            
                          <div className="space-y-4 max-h-96 overflow-y-auto">
    {orderDetails?.slice(-4).reverse().map((order) => (
        <div key={order._id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-black" />
                </div>
                <div>
                    <div className="text-white font-medium">
                        Order #{order._id?.slice(-6) || 'N/A'}
                    </div>
                    <div className="text-gray-400 text-sm">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: '2-digit', 
                            year: 'numeric'
                        }) : 'Unknown date'}
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-yellow-400 font-bold">${order.totalPrice}</div>
                <div className="text-green-400 text-sm">{order.location}</div>
            </div>
        </div>
    ))}
    
    {/* Show message if no orders */}
    {(!orderDetails || orderDetails.length === 0) && (
        <div className="text-center py-8">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No orders found</p>
            <Link href="/en" className="text-yellow-400 hover:text-yellow-300 text-sm">
                Start Shopping
            </Link>
        </div>
    )}
</div>

<Link
    href="/en/order"
    className="w-full mt-4 bg-black border border-yellow-400 text-yellow-400 font-semibold py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition flex items-center justify-center gap-2"
>
    View All Orders
    <ArrowLeft className="w-4 h-4 rotate-180" />
</Link>
                        </div>

                      
                    </div>
                </div>
            </div>
        </div>
       </ProtectedRoutes> 
       
    )
}

export default profile