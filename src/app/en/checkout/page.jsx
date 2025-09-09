'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState, Suspense } from 'react'
import { oneProduct } from '@/app/api/product/product'
import { placeOrder } from '@/app/api/product/order'
import ProtectedRoutes from '@/app/context/ProtectedRoutes'
import dynamic from 'next/dynamic'
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Shield, 
  Truck, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Package,
  Clock,
  DollarSign,
  Heart,
  ShoppingBag,
  Star,
  Award,
  Zap,
  Gift
} from 'lucide-react'

// Dynamic import for MapComponent to disable SSR
const MapComponent = dynamic(() => import('@/app/context/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[250px] sm:h-[300px] bg-black/50 border border-yellow-400/40 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-yellow-400 text-sm">Loading map...</p>
      </div>
    </div>
  )
})

function CheckoutContent() {
    const searchParams = useSearchParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [orderLoading,setOrderLoading]=useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    
    const id = searchParams.get('id')
    const quantity = parseInt(searchParams.get('quantity')) || 1

    // Form data
    const [formData, setFormData] = useState({
        // Step 1: Personal Details
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        
        // Step 2: Delivery Details
        address: '',
        city: '',
        postalCode: '',
        region: '',
        additionalInfo: '',
        
        // Step 3: Order Confirmation
        paymentMethod: 'cash',
        specialInstructions: ''
    })

    const moroccanCities = [
        'Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Agadir', 'Tangier', 
        'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Safi', 'Mohammedia',
        'Khouribga', 'El Jadida', 'Béni Mellal', 'Nador', 'Taza'
    ]

    const getProductDetails = async (id) => {
        setLoading(true)
        try {
            const serverRes = await oneProduct(id)
            setProduct(serverRes)
            
        } catch (error) {
            console.log("can't get the product due to this", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            getProductDetails(id)
        }
    }, [id])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async () => {
        setOrderLoading(true)
        try {
            const serverRes = await placeOrder(formData,id,quantity)
            if(serverRes.success){
                setCurrentStep(4)
            }
        } catch (error) {
            console.log("can't proceed payment due to this",error);
        }finally{
            setOrderLoading(false)
        }
    }

    if (loading) {
        return (
            <ProtectedRoutes>
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-yellow-400 text-xl font-bold">Loading checkout...</p>
                    </div>
                </div>
            </ProtectedRoutes>
        )
    }

    if (!product) {
        return (
            <ProtectedRoutes>
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-center">
                        <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-white text-xl">Product not found</p>
                    </div>
                </div>
            </ProtectedRoutes>
        )
    }

    const totalPrice = (product.price * quantity).toFixed(2)
    const savings = (product.price * 0.2 * quantity).toFixed(2) // 20% savings
    const originalPrice = (product.price * 1.2 * quantity).toFixed(2)

    return (
        <ProtectedRoutes>
            <div className="min-h-screen bg-black overflow-x-hidden">
                {/* Premium Hero Banner */}
<div className="relative w-full h-80 overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0">
        <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80" 
            alt="Premium Shopping Experience"
            className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60"></div>
        {/* Yellow accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-500/10"></div>
    </div>
    
    {/* Minimal floating elements */}
    <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-24 left-16 w-12 h-12 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>
    </div>
    
    <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="flex-1 max-w-2xl">
            {/* Minimal iShop Branding */}
            <div className="flex items-center gap-4 mb-8">
                <div className="bg-yellow-400/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                    <ShoppingBag className="w-8 h-8 text-black" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-white">iShop</h2>
                    <p className="text-yellow-400 text-sm font-medium">Easy Payment</p>
                </div>
            </div>
            
            {/* Minimal Checkout Title */}
            <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                    Secure Checkout
                </h1>
                <p className="text-gray-200 text-lg font-medium max-w-lg">
                    Complete your order in {3 - currentStep + 1} simple steps
                </p>
            </div>
            
            {/* Minimal Trust Indicators */}
            <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <Shield className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Secure</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <Truck className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Trusted</span>
                </div>
            </div>
        </div>
    </div>
    
    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
</div>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Checkout Form - Remove scrollable classes */}
                        <div className="lg:col-span-2">
                            {/* Enhanced Progress Steps */}
                            <div className="bg-gradient-to-br from-black/60 to-black/40 border border-yellow-400/30 rounded-3xl p-4 sm:p-8 mb-8 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-8 overflow-x-auto">
                                    {[1, 2, 3].map((step) => (
                                        <div key={step} className="flex items-center min-w-0">
                                            <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-lg sm:text-xl border-2 transition-all duration-300 ${
                                                currentStep >= step 
                                                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-400/25' 
                                                    : 'bg-black/40 border-gray-600 text-gray-400'
                                            }`}>
                                                {currentStep > step ? <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" /> : step}
                                                {currentStep === step && (
                                                    <div className="absolute inset-0 rounded-2xl bg-yellow-400 animate-pulse opacity-20"></div>
                                                )}
                                            </div>
                                            {step < 3 && (
                                                <div className={`w-16 sm:w-24 h-2 mx-3 sm:mx-6 rounded-full transition-all duration-500 ${
                                                    currentStep > step ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gray-600'
                                                }`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="grid grid-cols-3 text-center gap-2 sm:gap-4">
                                    <div className={`transition-all duration-300 ${currentStep >= 1 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                        <p className="font-bold text-sm sm:text-lg">Personal Info</p>
                                        <p className="text-xs sm:text-sm opacity-75 hidden sm:block">Your details & contact</p>
                                    </div>
                                    <div className={`transition-all duration-300 ${currentStep >= 2 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                        <p className="font-bold text-sm sm:text-lg">Delivery</p>
                                        <p className="text-xs sm:text-sm opacity-75 hidden sm:block">Address & shipping</p>
                                    </div>
                                    <div className={`transition-all duration-300 ${currentStep >= 3 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                        <p className="font-bold text-sm sm:text-lg">Confirmation</p>
                                        <p className="text-xs sm:text-sm opacity-75 hidden sm:block">Review & complete</p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 1: Enhanced Personal Information */}
                            {currentStep === 1 && (
                                <div className="bg-gradient-to-br from-black/60 to-black/40 border border-yellow-400/30 rounded-3xl p-4 sm:p-8 backdrop-blur-sm">
                                    <div className="flex items-center gap-4 mb-6 sm:mb-8">
                                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-2xl">
                                            <User className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white">Personal Information</h2>
                                            <p className="text-gray-400 text-sm sm:text-base">Tell us about yourself to personalize your experience</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-white font-semibold mb-3">First Name *</label>
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                className="w-full bg-black/50 border border-yellow-400/40 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                                                placeholder="Enter your first name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-white font-semibold mb-3">Last Name *</label>
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                className="w-full bg-black/50 border border-yellow-400/40 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                                                placeholder="Enter your last name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <label className="block text-white font-semibold mb-3">Email Address *</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    className="w-full bg-black/50 border border-yellow-400/40 rounded-xl pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                                                    placeholder="your.email@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <label className="block text-white font-semibold mb-3">Phone Number *</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    className="w-full bg-black/50 border border-yellow-400/40 rounded-xl pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                                                    placeholder="+212 6XX XXX XXX"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Privacy Notice */}
                                    <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                                            <div>
                                                <p className="text-blue-400 font-semibold text-sm sm:text-base">🔒 Privacy Protected</p>
                                                <p className="text-white text-xs sm:text-sm">Your information is encrypted and never shared with third parties</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end mt-6 sm:mt-8">
                                        <button
                                            onClick={nextStep}
                                            disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                                        >
                                            Continue to Delivery
                                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Enhanced Delivery Information - Mobile Optimized */}
                            {currentStep === 2 && (
                                <div className="bg-gradient-to-br from-black/60 to-black/40 border border-yellow-400/30 rounded-3xl p-4 sm:p-8 backdrop-blur-sm">
                                    <div className="flex items-center gap-4 mb-6 sm:mb-8">
                                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-2xl">
                                            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white">Delivery Information</h2>
                                            <p className="text-gray-400 text-sm sm:text-base">Where should we deliver your premium product?</p>
                                        </div>
                                    </div>
                                    
                                    {/* iShop Technology Header */}
                                    <div className="mb-6 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/40 rounded-xl p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-yellow-400/20 p-2 rounded-lg">
                                                <MapPin className="w-5 h-5 text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-yellow-400 font-bold text-lg">🚀 iShop Easy Pick Technology</p>
                                                <p className="text-white text-sm">Simply click on the map to pick your address - we'll do the rest automatically!</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Map section - Mobile optimized */}
                                    <div className="mb-6">
                                        <label className="block text-white font-semibold mb-3">Select Location on Map</label>
                                        <div className="h-[250px] sm:h-[300px]">
                                            <MapComponent onLocationSelect={(locationData) => {
                                                // Auto-fill all the extracted data
                                                handleInputChange("city", locationData.location);
                                                handleInputChange("address", locationData.fullAddress);
                                                handleInputChange("postalCode", locationData.postalCode);
                                                handleInputChange("region", locationData.region);
                                                console.log('Selected coordinates:', locationData.coordinates);
                                                console.log('All location data:', locationData);
                                            }} />
                                        </div>
                                    </div>

                                    <div className="space-y-4 sm:space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-white font-semibold mb-3">Location *</label>
                                            <input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => handleInputChange("city", e.target.value)}
                                                className="w-full bg-black/50 border border-yellow-400/40 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                                                placeholder="Auto-filled from map or type manually"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-white font-semibold mb-3">Full Address *</label>
                                            <textarea
                                                value={formData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                className="w-full bg-black/50 border border-yellow-400/40 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 h-24 sm:h-32 resize-none"
                                                placeholder="Auto-filled from map or enter manually"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-white font-semibold mb-3">Postal Code</label>
                                                <input
                                                    type="text"
                                                    value={formData.postalCode}
                                                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                                    className="w-full bg-black/50 border border-yellow-400/40 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                                                    placeholder="Auto-extracted from map"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-white font-semibold mb-3">Region/Province</label>
                                                <input
                                                    type="text"
                                                    value={formData.region}
                                                    onChange={(e) => handleInputChange('region', e.target.value)}
                                                    className="w-full bg-black/50 border border-yellow-400/40 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                                                    placeholder="Auto-extracted from map"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="block text-white font-semibold mb-3">Additional Information</label>
                                            <input
                                                type="text"
                                                value={formData.additionalInfo}
                                                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                                                className="w-full bg-black/50 border border-yellow-400/40 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                                                placeholder="Landmark, building name, special instructions, etc. (optional)"
                                            />
                                        </div>

                                        {/* Delivery Info Cards - Mobile optimized */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                                            <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-xl p-3 sm:p-4">
                                                <div className="flex items-center gap-3">
                                                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-green-400 font-semibold text-sm sm:text-base">🚚 Fast Delivery</p>
                                                        <p className="text-white text-xs sm:text-sm">2-3 business days nationwide</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 rounded-xl p-3 sm:p-4">
                                                <div className="flex items-center gap-3">
                                                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-yellow-400 font-semibold text-sm sm:text-base">💰 Cash on Delivery</p>
                                                        <p className="text-white text-xs sm:text-sm">Pay when you receive your order</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Navigation Buttons - Mobile optimized */}
                                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
                                        <button
                                            onClick={prevStep}
                                            className="order-2 sm:order-1 bg-gray-600 hover:bg-gray-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3"
                                        >
                                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                            Back
                                        </button>
                                        <button
                                            onClick={nextStep}
                                            disabled={!formData.city || !formData.address}
                                            className="order-1 sm:order-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                                        >
                                            Continue to Confirmation
                                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Enhanced Order Confirmation - Mobile optimized */}
                            {currentStep === 3 && (
                                <div className="bg-gradient-to-br from-black/60 to-black/40 border border-yellow-400/30 rounded-3xl p-4 sm:p-8 backdrop-blur-sm">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-2xl">
                                            <CheckCircle className="w-7 h-7 text-black" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-white">Order Confirmation</h2>
                                            <p className="text-gray-400">Review your order details before completing purchase</p>
                                        </div>
                                    </div>
                                    
                                    {/* Enhanced Order Summary */}
                                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-yellow-400/20 rounded-2xl p-6 mb-6">
                                        <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="relative">
                                                <img 
                                                    src={product.image} 
                                                    alt={product.title}
                                                    className="w-24 h-24 object-cover rounded-xl border-2 border-yellow-400/30"
                                                />
                                                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                                                    ×{quantity}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-semibold text-lg mb-2">{product.title}</h4>
                                                <p className="text-gray-400 text-sm mb-2">{product.brand} • {product.category}</p>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star 
                                                                key={i} 
                                                                className={`w-4 h-4 ${i < Math.floor(product.ratings) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-yellow-400 text-sm font-medium">{product.ratings}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-yellow-400 font-bold text-lg">${product.price}</span>
                                                    <span className="text-gray-400 text-sm line-through">${(product.price * 1.2).toFixed(2)}</span>
                                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-17%</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="border-t border-gray-700 pt-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-gray-300">
                                                    <span>Subtotal ({quantity} items):</span>
                                                    <span>${totalPrice}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-300">
                                                    <span>Original Price:</span>
                                                    <span className="line-through">${originalPrice}</span>
                                                </div>
                                                <div className="flex justify-between text-green-400">
                                                    <span>You Save:</span>
                                                    <span>-${savings}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-300">
                                                    <span>Delivery:</span>
                                                    <span className="text-green-400 font-semibold">FREE</span>
                                                </div>
                                                <div className="border-t border-gray-700 pt-3">
                                                    <div className="flex justify-between text-2xl font-bold text-yellow-400">
                                                        <span>Total:</span>
                                                        <span>${totalPrice}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Enhanced Delivery Details */}
                                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-yellow-400/20 rounded-2xl p-6 mb-6">
                                        <h3 className="text-xl font-bold text-white mb-6">Delivery Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-yellow-400 font-semibold">Customer:</span>
                                                    <p className="text-white">{formData.firstName} {formData.lastName}</p>
                                                </div>
                                                <div>
                                                    <span className="text-yellow-400 font-semibold">Phone:</span>
                                                    <p className="text-white">{formData.phone}</p>
                                                </div>
                                                <div>
                                                    <span className="text-yellow-400 font-semibold">Email:</span>
                                                    <p className="text-white">{formData.email}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-yellow-400 font-semibold">Address:</span>
                                                    <p className="text-white">{formData.address}</p>
                                                </div>
                                                <div>
                                                    <span className="text-yellow-400 font-semibold">Location:</span>
                                                    <p className="text-white">{formData.city}</p>
                                                </div>
                                                {formData.postalCode && (
                                                    <div>
                                                        <span className="text-yellow-400 font-semibold">Postal Code:</span>
                                                        <p className="text-white">{formData.postalCode}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Enhanced Payment Method */}
                                    <div className="bg-gradient-to-br from-black/40 to-black/20 border border-yellow-400/20 rounded-2xl p-3 mb-6">
                                        <h3 className="text-xl font-bold text-white mb-6">Payment Method</h3>
                                        <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/40 rounded-xl p-2.5">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-yellow-400 p-3 rounded-xl">
                                                    <DollarSign className="w-8 h-8 text-black" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-yellow-400 font-bold text-sm lg:text-lg">💰 Cash on Delivery</p>
                                                    <p className="text-white text-xs lg:text-sm">Pay when you receive your order <br/> No advance payment required</p>
                                                    <div className="flex items-center gap-1.5 mt-2">
                                                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md  text-xs font-medium">✓Secure</span>
                                                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md text-xs font-medium">✓Trusted</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                   <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
    <button
        onClick={prevStep}
        className="order-2 sm:order-1 bg-gray-600 hover:bg-gray-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
    >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Back</span>
    </button>
    <button
        onClick={handleSubmit}
        className="order-1 sm:order-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl hover:scale-101"
    >
        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-sm sm:text-lg">Place Order (${totalPrice})</span>
    </button>
</div>
                                </div>
                            )}
                                     {currentStep === 4 && (
                                <div className="bg-gradient-to-br from-black/60 to-black/40 border border-yellow-400/30 rounded-3xl p-4 sm:p-8 backdrop-blur-sm">
                                    {/* Success Animation Container */}
                                    <div className="text-center mb-8">
                                        {/* Animated Success Icon */}
                                        <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-6">
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                                            <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 animate-bounce" />
                                            </div>
                                            {/* Success Ring Animation */}
                                            <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-ping"></div>
                                        </div>

                                        {/* Success Message */}
                                        <div className="space-y-4">
                                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
                                                🎉 Order Confirmed!
                                            </h2>
                                            <p className="text-xl sm:text-2xl text-green-400 font-bold">
                                                Payment Successful
                                            </p>
                                            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                                                Congratulations! We have sent you a confirmation message. 
                                                Your premium product is on its way to you.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Order Details Card */}
                                    <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-400/30 rounded-2xl p-6 mb-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="bg-gradient-to-r from-green-400 to-green-500 p-3 rounded-xl">
                                                <Package className="w-6 h-6 text-black" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">Order Summary</h3>
                                                <p className="text-green-400 text-sm">Order ID: #iShop-{Date.now().toString().slice(-6)}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Product Info */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.title}
                                                        className="w-16 h-16 object-cover rounded-xl border-2 border-green-400/30"
                                                    />
                                                    <div>
                                                        <h4 className="text-white font-semibold">{product.title}</h4>
                                                        <p className="text-gray-400 text-sm">Quantity: {quantity}</p>
                                                        <p className="text-green-400 font-bold">${totalPrice}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delivery Info */}
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-green-400 font-semibold">Delivery to:</span>
                                                    <p className="text-white">{formData.firstName} {formData.lastName}</p>
                                                    <p className="text-gray-300 text-sm">{formData.address}</p>
                                                    <p className="text-gray-300 text-sm">{formData.city}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Premium Features Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-400/30 rounded-xl p-4 text-center">
                                            <Mail className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                            <p className="text-white font-semibold text-sm">Email Sent</p>
                                            <p className="text-gray-400 text-xs">Confirmation details</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-400/30 rounded-xl p-4 text-center">
                                            <Truck className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                                            <p className="text-white font-semibold text-sm">Fast Shipping</p>
                                            <p className="text-gray-400 text-xs">2-3 business days</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-400/30 rounded-xl p-4 text-center">
                                            <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                            <p className="text-white font-semibold text-sm">Protected</p>
                                            <p className="text-gray-400 text-xs">Money-back guarantee</p>
                                        </div>
                                    </div>

                                    {/* Premium CTA Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            onClick={() => window.location.href = '/en'}
                                            className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
                                        >
                                            <ShoppingBag className="w-6 h-6 group-hover:animate-bounce" />
                                            Continue Shopping
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => window.location.href = '/en/order'}
                                            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3"
                                        >
                                            <Package className="w-6 h-6" />
                                            View Orders
                                        </button>
                                    </div>

                                    {/* Thank You Message */}
                                    <div className="text-center mt-8 p-6 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/20 rounded-xl">
                                        <p className="text-yellow-400 font-bold text-lg mb-2">🙏 Thank You for Choosing iShop!</p>
                                        <p className="text-gray-300">Your trust means everything to us. We're committed to delivering an exceptional shopping experience.</p>
                                    </div>
                                </div>
                            )}

                            {/* Premium Secure Payment Loading Overlay */}
                            {orderLoading && (
                                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                                    <div className="bg-gradient-to-br from-black/80 to-black/60 border border-yellow-400/30 rounded-3xl p-8 max-w-md w-full mx-4 text-center">
                                        {/* Premium Loading Animation */}
                                        <div className="relative mb-8">
                                            {/* Outer Ring */}
                                            <div className="w-24 h-24 mx-auto relative">
                                                <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full"></div>
                                                <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"></div>
                                                
                                                {/* Inner Security Icon */}
                                                <div className="absolute inset-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                                                    <Shield className="w-8 h-8 text-black animate-pulse" />
                                                </div>
                                                
                                                {/* Pulse Ring */}
                                                <div className="absolute inset-0 border-2 border-yellow-400 rounded-full animate-ping opacity-20"></div>
                                            </div>
                                        </div>

                                        {/* Premium Loading Text */}
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-black text-white">
                                                🔒 Secure Payment Processing
                                            </h2>
                                            <p className="text-yellow-400 font-bold text-lg">
                                                Encrypting your order...
                                            </p>
                                            <p className="text-gray-300 text-sm">
                                                Please don't close this window. Your payment is being processed securely with bank-grade encryption.
                                            </p>
                                        </div>

                                        {/* Loading Steps */}
                                        <div className="mt-8 space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                <span className="text-green-400">Validating payment details</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
                                                <span className="text-yellow-400">Processing secure transaction</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></div>
                                                <span className="text-blue-400">Confirming order placement</span>
                                            </div>
                                        </div>

                                        {/* Security Badges */}
                                        <div className="mt-8 flex justify-center gap-4">
                                            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                                                <Shield className="w-4 h-4 text-green-400" />
                                                <span className="text-green-400 text-xs font-medium">SSL Secured</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
                                                <CheckCircle className="w-4 h-4 text-blue-400" />
                                                <span className="text-blue-400 text-xs font-medium">Bank Grade</span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mt-6">
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Enhanced Order Summary Sidebar - Mobile responsive */}
                        <div className="order-first lg:order-last lg:sticky lg:top-4 lg:h-fit space-y-4 sm:space-y-6">
                            {/* Enhanced Product Card */}
                            <div className="bg-gradient-to-br from-black/60 to-black/40 border border-yellow-400/30 rounded-3xl p-6 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <ShoppingBag className="w-6 h-6 text-yellow-400" />
                                    <h3 className="text-xl font-bold text-white">Your Order</h3>
                                </div>
                                
                                <div className="bg-gradient-to-br from-black/40 to-black/20 rounded-2xl p-6 mb-6 border border-yellow-400/20">
                                    <div className="flex gap-4">
                                        <div className="relative">
                                            <img 
                                                src={product.image} 
                                                alt={product.title}
                                                className="w-24 h-24 object-cover rounded-xl border-2 border-yellow-400/30"
                                            />
                                            <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                                                {quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold text-sm line-clamp-2 mb-2">{product.title}</h4>
                                            <p className="text-gray-400 text-xs mb-2">{product.brand}</p>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star 
                                                            key={i} 
                                                            className={`w-3 h-3 ${i < Math.floor(product.ratings) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-yellow-400 text-xs">{product.ratings}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-yellow-400 font-bold">${product.price}</span>
                                                <span className="text-gray-400 text-xs line-through">${(product.price * 1.2).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Subtotal:</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>You Save:</span>
                                        <span className="text-green-400">-${savings}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Shipping:</span>
                                        <span className="text-green-400 font-semibold">FREE</span>
                                    </div>
                                    <div className="border-t border-gray-700 pt-4">
                                        <div className="flex justify-between text-xl font-bold text-yellow-400">
                                            <span>Total:</span>
                                            <span>${totalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Security Features */}
                            <div className="bg-gradient-to-br from-black/60 to-black/40 border border-yellow-400/30 rounded-3xl p-6 backdrop-blur-sm">
                                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-yellow-400" />
                                    Why Choose iShop?
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                                        <Shield className="w-5 h-5 text-green-400" />
                                        <div>
                                            <p className="text-white font-medium text-sm">100% Secure Checkout</p>
                                            <p className="text-gray-400 text-xs">SSL encrypted & PCI compliant</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                        <Truck className="w-5 h-5 text-blue-400" />
                                        <div>
                                            <p className="text-white font-medium text-sm">Fast Delivery</p>
                                            <p className="text-gray-400 text-xs">2-3 business days nationwide</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                                        <Heart className="w-5 h-5 text-red-400" />
                                        <div>
                                            <p className="text-white font-medium text-sm">Easy Returns</p>
                                            <p className="text-gray-400 text-xs">30-day money-back guarantee</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                                        <Clock className="w-5 h-5 text-yellow-400" />
                                        <div>
                                            <p className="text-white font-medium text-sm">24/7 Customer Support</p>
                                            <p className="text-gray-400 text-xs">Always here to help you</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Cash on Delivery Info */}
                            <div className="bg-gradient-to-br from-black/40 to-black/20 border border-yellow-400/20 rounded-2xl p-4 sm:p-6 mb-6">
    <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Payment Method</h3>
    <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/40 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="bg-yellow-400 p-2 sm:p-3 rounded-xl flex-shrink-0">
                <DollarSign className="w-5 h-5 sm:w-8 sm:h-8 text-black" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-yellow-400 font-bold text-base sm:text-lg mb-1">💰 Cash on Delivery</p>
                <p className="text-white text-sm sm:text-base mb-3">Pay when you receive your order - No advance payment required</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="bg-green-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">✓ Secure</span>
                    <span className="bg-blue-500/20 text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">✓ Trusted</span>
                    <span className="bg-purple-500/20 text-purple-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">✓ Convenient</span>
                </div>
            </div>
        </div>
    </div>
</div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoutes>
    )
}


function CheckoutLoading() {
    return (
        <ProtectedRoutes>
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-yellow-400 text-xl font-bold">Loading checkout...</p>
                </div>
            </div>
        </ProtectedRoutes>
    )
}

function Checkout() {
    return (
        <Suspense fallback={<CheckoutLoading />}>
            <CheckoutContent />
        </Suspense>
    )
}

export default Checkout