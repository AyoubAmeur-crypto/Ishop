'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { login } from '../api/product/Authentifcation'
import { Message } from 'primereact/message';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [message,setMessage]=useState(null)
  const [loading,setLoading]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {

      
    console.log('Login attempt:', formData)
    const loginServerResponse = await login(formData)
    setMessage(loginServerResponse)
    if(loginServerResponse.success){

      setTimeout(()=>{window.location.href='/en'},2000)
    }
      
    } catch (error) {

      console.log("can't login due to this",error);

      setMessage({

        success:false,
        message:"Can't login please try again",
        type:'error'
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
            <p className="text-gray-300">Welcome back to premium shopping</p>
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
                  placeholder="Enter your password"
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

            <div className="flex items-end justify-between">
           
              <Link href="/forgot-password" className="text-sm text-yellow-400 hover:text-yellow-300 transition">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-xl hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black transition transform hover:scale-105"
            >
              {loading ? <div className="flex flex-col items-center justify-center"><div className="w-5 h-5 border-2 border-gray-600 border-t-black rounded-full animate-spin"></div></div> : <div>Sign In</div>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link href="/signup" className="text-yellow-400 hover:text-yellow-300 font-medium transition">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Banner */}
      <div className="flex-1 hidden md:flex relative overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    alt="Shopping experience"
    className="w-full h-full object-cover"
  />
  {/* Gray overlay for better text visibility */}
  <div className="absolute inset-0 bg-gray-900/70" />
  <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
  <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
        Premium Shopping Experience
      </h2>
      <p className="text-xl text-yellow-400 font-medium drop-shadow">
        Discover exclusive deals and premium products
      </p>
    </div>
  </div>
</div>
    </div>
  )
}

export default LoginPage