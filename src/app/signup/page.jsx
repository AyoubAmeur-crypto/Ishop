'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { SignUp } from '../api/product/Authentifcation'
import { Message } from 'primereact/message';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
        

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
        setMessage(null)


    if(formData.confirmPassword.trim().toString() !== formData.password.trim().toString() ){

         setMessage({
            success: false,
            message: "Password Doesn't Match!",
            type: 'error'
        })
        return
    }
    setLoading(true)
    try {

        const sendAuthSignUpForm = await SignUp(formData)
        setMessage(sendAuthSignUpForm)
    if(sendAuthSignUpForm.success){
        

        setTimeout(()=>{window.location.href='/en'},2000)
    }

        
    } catch (error) {
        console.log("can't signup due to this",error);


            setMessage({
            success: false,
            message: 'An unexpected error occurred',
            type: 'error'
        })
        
    }finally{

        setLoading(false)
    }
    
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-2">IShop</h1>
            <p className="text-gray-300">Join our premium shopping community</p>
          </div>
          {message && (
  <div className="mb-6">
    <Message 
      severity={message.success ? "success" : "error"} 
      text={message.message}
      className="w-full"
    />
  </div>
)}
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
 

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-yellow-400 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-yellow-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-yellow-400 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-yellow-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-yellow-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-yellow-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-yellow-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-yellow-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  placeholder="Create password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-yellow-400 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-yellow-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="rounded border-yellow-400/30 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0 bg-gray-900"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                I agree to the{' '}
                <Link href="/terms" className="text-yellow-400 hover:text-yellow-300 transition">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300 transition">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-xl hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black transition transform hover:scale-105"
            >
              {loading ?       <div className="flex flex-col items-center justify-center"><div className="w-5 h-5 border-2 border-gray-600 border-t-black rounded-full animate-spin"></div></div>
 : <div>Create Account</div>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Banner */}
      <div className="flex-1 hidden md:flex relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80"
          alt="Join premium shopping"
          className="w-full h-full object-cover"
        />
        {/* Gray overlay for better text visibility */}
        <div className="absolute inset-0 bg-gray-900/70" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Start Your Journey
            </h2>
            <p className="text-xl text-yellow-400 font-medium drop-shadow">
              Join thousands of satisfied customers and discover amazing deals
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage