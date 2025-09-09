'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import { productList, generalProductList } from '../api/product/product'
import Link from 'next/link'
import { Search } from 'lucide-react'
import NavBarEng from './NavBarEng'
import { addToCart } from '../api/product/cart'
import { userFetchedData } from '../context/AuthContext'
import { Toast } from 'primereact/toast'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import BannerSection from './BannerSection/page'
import CategorySection from './CategorySection/page'

export default function Products() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [popUp,setPopup]=useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const { isLogged } = useContext(userFetchedData)
  const toast = useRef(null)

  const categoryBanners = {
    "men's clothing": {
      img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1600&q=80",
      title: "Men's Clothing",
      desc: "Discover the latest in men's fashion",
    },
    "women's clothing": {
      img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1600&q=80",
      title: "Women's Clothing",
      desc: "Elegant styles for every occasion",
    },
    "electronics": {
      img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1600&q=80",
      title: "Electronics",
      desc: "Latest tech and gadgets",
    },
    "jewelery": {
      img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
      title: "Jewelery",
      desc: "Luxury jewelry and accessories",
    }
  }

  const categories = ["men's clothing", "women's clothing", "electronics", "jewelery"]

  // Filter products to show only selected category or all if no category is selected
  const getDisplayCategories = () => {
    if (category === 'all') {
      return categories
    }
    return [category] // Only show the selected category
  }

  const productsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = filtered.filter(p => p.category === cat)
    return acc
  }, {})

  const refreshProductList = () => {
    if (!isLogged) {
      generalProductList().then(data => {
        setProducts(data)
        setFiltered(data)
      })
    } else {
      productList().then(data => {
        setProducts(data)
        setFiltered(data)
      })
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
        refreshProductList()
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

    useEffect(() => {

      setPopup(true)
  }, [])

  useEffect(() => {
    refreshProductList()
  }, [isLogged])

  // Filter by category and scroll to top
  const applyCategorySearch = (val) => {
    let results = products
    setCategory(val)
    
    if (val === 'all') {
      setFiltered(products)
    } else {
      results = results.filter(p => p.category === val)
      setFiltered(results)
    }
    
    // Scroll to top when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filter by search
  const handleFilter = () => {
    let result = products
    if (search.trim()) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }
    setFiltered(result)
    // Scroll to top when search is applied
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col">
      {popUp && 
      <div className="fixed inset-0 bg-black/60  z-50 flex items-center justify-center p-4 animate-fadeIn">
  <div className="bg-black border-2 border-yellow-400 rounded-2xl max-w-4xl w-full relative overflow-hidden animate-slideInFromBottom">
              {/* Close Button */}
              <button 
                onClick={() => setPopup(false)}
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
                    src="https://res.cloudinary.com/dlomtxi0t/image/upload/v1756722068/Untitled-2_tzy9dq.png"
                    alt="iShop Morocco - Premium Shopping"
                    className="w-full h-full object-cover"
                  />
                  
                 
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
                    Best Quality with <span className="text-white">iShop</span>
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
          </div>}
      <Toast ref={toast} position="top-center" />
      <NavBarEng onCartUpdate={refreshProductList} />
      <div className="w-full px-4 py-6">
        <BannerSection />
        
        {/* Main Container with max width constraint */}
        <div className="max-w-[1440px] mx-auto">
          <div className="flex gap-4 lg:gap-6">
            {/* Left Sidebar Banner */}
            <div className="hidden lg:block w-60 xl:w-64 flex-shrink-0">
              <div className="sticky top-4 space-y-4 lg:space-y-6">
                {/* Promotional Banner */}
                <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                  <img
                    src="https://res.cloudinary.com/dlomtxi0t/image/upload/v1756722068/Untitled-2_tzy9dq.png"
                    alt="Special Offer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-400/20 to-transparent">
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                        Special Offer
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg lg:text-xl mb-2">Flash Sale</h3>
                      <p className="text-white/80 text-sm mb-3">Up to 60% OFF selected items</p>
                      <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-500 transition w-full">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 lg:p-6 rounded-2xl shadow-xl">
                  <h4 className="text-black font-bold text-base lg:text-lg mb-2">Stay Updated!</h4>
                  <p className="text-black/80 text-xs lg:text-sm mb-4">Get exclusive deals and new arrivals</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-lg text-black text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-black/20"
                  />
                  <button className="w-full bg-black text-yellow-400 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition">
                    Subscribe
                  </button>
                </div>

                {/* Category Quick Links */}
                <div className="bg-black/80 backdrop-blur-sm p-4 lg:p-6 rounded-2xl border border-yellow-400/20">
                  <h4 className="text-yellow-400 font-bold text-base lg:text-lg mb-4">Quick Browse</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => applyCategorySearch('all')}
                      className={`w-full text-left py-2 px-3 rounded-lg transition text-xs lg:text-sm font-medium ${
                        category === 'all' 
                          ? 'bg-yellow-400 text-black' 
                          : 'text-white hover:text-yellow-400 hover:bg-yellow-400/10'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => applyCategorySearch(cat)}
                        className={`w-full text-left py-2 px-3 rounded-lg transition text-xs lg:text-sm font-medium ${
                          category === cat 
                            ? 'bg-yellow-400 text-black' 
                            : 'text-white hover:text-yellow-400 hover:bg-yellow-400/10'
                        }`}
                      >
                        {categoryBanners[cat].title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Search & Filter Bar */}
              <div className="relative w-full mb-6 lg:mb-8 min-h-[180px] lg:min-h-[200px]">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&w=800&q=60"
                    alt="Dark pattern"
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-yellow-400/20 to-black/40 rounded-2xl" />
                <div className="relative flex flex-col md:flex-row items-center gap-3 lg:gap-4 w-full rounded-2xl p-4 lg:p-6">
                  <select
                    value={category}
                    onChange={e => applyCategorySearch(e.target.value)}
                    className="w-full md:w-1/4 rounded-xl px-3 lg:px-4 py-2 lg:py-3 bg-yellow-400/90 text-black font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-sm lg:text-base"
                  >
                    <option value="all">All Categories</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="electronics">Electronics</option>
                    <option value="women's clothing">Women's Clothing</option>
                  </select>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products…"
                    className="w-full md:w-2/4 rounded-xl px-3 lg:px-4 py-2 lg:py-3 bg-white/90 text-black font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-sm lg:text-base"
                  />
                  <button
                    onClick={handleFilter}
                    className="w-full md:w-1/4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 lg:px-6 py-2 lg:py-3 text-base lg:text-lg font-bold text-black shadow-xl hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <Search className="w-4 h-4 lg:w-5 lg:h-5" />
                    Search
                  </button>
                </div>
              </div>

              {/* Show selected category info when filtering */}
              {category !== 'all' && (
                <div className="mb-6 bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 border border-yellow-400/30 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-yellow-400 font-bold text-lg">
                        Showing: {categoryBanners[category].title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {productsByCategory[category].length} products found
                      </p>
                    </div>
                    <button
                      onClick={() => applyCategorySearch('all')}
                      className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition text-sm"
                    >
                      Show All
                    </button>
                  </div>
                </div>
              )}

              {/* Category Swiper */}
              <CategorySection onCategorySelect={applyCategorySearch} />

              {/* Category Banners & Listings - Only show selected category or all */}
              {getDisplayCategories().map(cat => (
                <div key={cat} className="mb-12 lg:mb-16">
                  {/* Category Banner */}
                  <div className="w-full rounded-2xl overflow-hidden mb-6 lg:mb-8 shadow-2xl relative h-40 lg:h-48 flex items-center border border-yellow-400/20">
                    <img
                      src={categoryBanners[cat].img}
                      alt={categoryBanners[cat].title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/70 via-yellow-400/50 to-yellow-400/70" />
                    <div className="relative z-10 px-6 lg:px-8 py-4 lg:py-6">
                      <h2 className="text-2xl lg:text-3xl font-black text-black mb-1 lg:mb-2 drop-shadow-lg">{categoryBanners[cat].title}</h2>
                      <p className="text-base lg:text-lg text-black/90 drop-shadow-md">{categoryBanners[cat].desc}</p>
                      <div className="mt-2">
                        <span className="bg-black/20 text-black px-3 py-1 rounded-full text-sm font-bold">
                          {productsByCategory[cat].length} Products
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Listing for this category */}
                  {productsByCategory[cat].length > 0 ? (
                    <div className="grid gap-4 lg:gap-4 xl:gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                      {productsByCategory[cat].map(product => (
                        <div
                          key={product._id}
                          className="rounded-2xl border border-yellow-400/60 bg-black p-4 lg:p-6 shadow-2xl flex flex-col transition-all duration-300 hover:scale-101 hover:shadow-yellow-400/20 group"
                        >
                          <div className="relative h-48 lg:h-56 w-full flex items-center justify-center mb-3 lg:mb-4 group bg-gradient-to-br from-white to-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.title}
                              width={300}
                              height={300}
                              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-300 bg-gradient-to-br from-yellow-400/90 to-yellow-500/90 rounded-lg p-4">
                              <div className="flex flex-col gap-3 lg:gap-4 w-full">
                                <button
                                  onClick={() => addAuthToCart(product)}
                                  disabled={product.inCart}
                                  className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-md font-semibold transition text-xs lg:text-sm ${
                                    product.inCart
                                      ? 'bg-black/70 text-yellow-400 cursor-not-allowed'
                                      : 'bg-black/70 text-yellow-400 hover:bg-black/90 hover:shadow-lg'
                                  }`}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
                                  </svg>
                                  {product.inCart ? "Added" : "Add to cart"}
                                </button>
                                <Link href={`/en/product/${product._id}`} className="flex items-center gap-2 bg-black/70 text-yellow-400 px-3 lg:px-4 py-2 rounded-lg font-semibold hover:bg-black/90 hover:shadow-lg transition text-xs lg:text-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                                  </svg>
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex items-center justify-between mb-3 lg:mb-4">
                            <span className="rounded bg-gradient-to-r from-yellow-400 to-yellow-500 px-2 lg:px-3 py-1 text-xs font-bold text-black uppercase shadow-lg">
                              {product.category}
                            </span>
                            <span className="bg-gradient-to-r from-black to-gray-800 text-yellow-400 font-bold px-2 lg:px-3 py-1 rounded-full shadow-lg border border-yellow-400/60 text-xs lg:text-sm">
                              ${product.price}
                            </span>
                          </div>

                          <div className="flex flex-col items-start justify-center mb-3 w-full">
  <div className="relative group w-full">
    {/* Animated glow */}
    <div className="absolute -inset-1  rounded-xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse blur-sm"></div>
    
    {/* Main brand showcase */}
    <div className="relative bg-black border border-yellow-400/50 rounded-xl p-3  transform  transition-all duration-300">
      {/* Top golden accent line */}
      <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent"></div>
      
      <div className="flex items-center justify-between ">
        <div className="flex flex-row  ">
        
          
          {/* Brand text section */}
          <div className="flex flex-col">
           
            <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 tracking-wide drop-shadow-lg">
              {product.brand}
            </span>
          </div>
        </div>
        
        {/* Certification badge */}
        <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border border-yellow-400/60 rounded-full px-2 py-1">
          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="text-yellow-400 text-xs font-bold">Verified</span>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
    </div>
  </div>
</div>
    
                       
                          <Link href={`/en/product/${product._id}`} className="text-sm lg:text-lg font-semibold leading-tight text-white group-hover:text-yellow-400 mb-2 text-center transition-colors">
                            {product.title.length > 20
                              ? product.title.slice(0, 20) + '...'
                              : product.title}
                          </Link>
                          <p className="text-gray-300 text-xs lg:text-sm mb-3 lg:mb-4 text-center group-hover:text-white transition-colors">
                            {product.description.length > 60
                              ? product.description.slice(0, 60) + '...'
                              : product.description}
                          </p>
                          <button
                            type="button"
                            onClick={() => addAuthToCart(product)}
                            disabled={product.inCart}
                            className={`mt-auto inline-flex items-center rounded-lg px-3 lg:px-5 py-2 lg:py-2.5 text-xs lg:text-sm font-medium focus:outline-none focus:ring-4 focus:ring-yellow-300 transition shadow-lg ${
                              product.inCart
                                ? 'bg-black text-yellow-400 cursor-not-allowed border-yellow-400 border-2'
                                : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 hover:shadow-xl hover:scale-105'
                            }`}
                          >
                            <svg className="mr-1 lg:mr-2 h-4 w-4 lg:h-5 lg:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                            </svg>
                            {product.inCart ? "Added" : "Add to cart"}
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='w-full min-h-[120px] flex flex-col items-center justify-center text-lg lg:text-xl text-yellow-400 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl border border-yellow-400/20'>
                      No products found in this category
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Sidebar Banner */}
            <div className="hidden lg:block w-60 xl:w-64 flex-shrink-0">
              <div className="sticky top-4 space-y-4 lg:space-y-6">
                {/* Featured Product */}
                <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
                  <img
                    src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cea0253b-8ad3-4ba1-9644-c82fddb93aa9/NIKE+COURT+VISION+LO.png"
                    alt="Featured Product"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-400/20 to-transparent">
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg lg:text-xl mb-2">Best Seller</h3>
                      <p className="text-white/80 text-sm mb-3">Premium quality at great prices</p>
                      <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-500 transition w-full">
                        View Product
                      </button>
                    </div>
                  </div>
                </div>

                {/* Customer Support */}
                <div className="bg-gradient-to-br from-black to-gray-900 border border-yellow-400/20 p-4 lg:p-6 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="text-yellow-400 font-bold text-base lg:text-lg mb-2">Need Help?</h4>
                    <p className="text-white/80 text-xs lg:text-sm mb-4">24/7 Customer Support</p>
                    <button className="w-full bg-yellow-400 text-black py-2 rounded-lg font-bold text-sm hover:bg-yellow-500 transition">
                      Contact Us
                    </button>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 lg:p-6 rounded-2xl shadow-xl">
                  <h4 className="text-black font-bold text-base lg:text-lg mb-4 text-center">Follow Us</h4>
                  <div className="flex justify-center space-x-3 lg:space-x-4">
                    <button className="w-8 h-8 lg:w-10 lg:h-10 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 lg:w-10 lg:h-10 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.14.66-1.989 1.483-1.989.699 0 1.037.525 1.037 1.155 0 .703-.449 1.754-.68 2.726-.194.819.41 1.487 1.219 1.487 1.463 0 2.587-1.544 2.587-3.771 0-1.972-1.416-3.353-3.44-3.353-2.344 0-3.721 1.759-3.721 3.575 0 .708.273 1.467.614 1.881.067.081.077.152.057.235-.061.252-.196.796-.223.907-.035.146-.116.177-.268.107-1.001-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.287-4.84 2.781 0 4.940 1.981 4.940 4.628 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.92l-.498 1.902c-.181.695-.669 1.566-.995 2.097.751.232 1.544.357 2.37.357 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 lg:w-10 lg:h-10 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.007 0C5.373 0 .007 5.373.007 12s5.366 12 12 12 12-5.373 12-12S18.641.007 12.007.007zM8.387 18.312c-1.113 0-2.013-.9-2.013-2.007 0-1.113.9-2.013 2.013-2.013 1.106 0 2.007.9 2.007 2.013 0 1.106-.9 2.007-2.007 2.007zM18.312 15.593H15.74c-1.327 0-2.4-1.073-2.4-2.4s1.073-2.4 2.4-2.4h2.572c1.327 0 2.4 1.073 2.4 2.4s-1.073 2.4-2.4 2.4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}