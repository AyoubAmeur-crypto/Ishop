import React from 'react'
import Link from 'next/link'
import FooterMap from '../footerMap/page'

function FooterEn() {
  return (
    <footer className="bg-black border-t border-yellow-400/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-3">
                iShop
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Morocco's premier online shopping destination. Discover premium quality products with express delivery nationwide.
              </p>
            </div>
            
            {/* Social Media */}
            <div className="mb-8">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="w-10 h-10 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-yellow-400/50">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-10 h-10 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-yellow-400/50">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 3.95-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.95 4 2.98-1.46 1.16-3.31 1.84-5.33 1.84-.35 0-.69-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-10 h-10 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-yellow-400/50">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.562-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </Link>
                <Link href="#" className="w-10 h-10 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-yellow-400/50">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.007 0C5.373 0 .007 5.373.007 12s5.366 12 12 12 12-5.373 12-12S18.641.007 12.007.007zM16.57 16.57c-1.405 1.405-3.278 2.18-5.277 2.18s-3.872-.775-5.277-2.18S3.836 13.292 3.836 11.293s.775-3.872 2.18-5.277S9.294 3.836 11.293 3.836s3.872.775 5.277 2.18 2.18 3.278 2.18 5.277-.775 3.872-2.18 5.277z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-yellow-400 font-bold text-lg mb-4">Stay Updated</h4>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-yellow-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition"
                />
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-400 font-bold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/en" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/en/products" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/en/categories" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/en/order" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/en/cart" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/en/about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-yellow-400 font-bold text-xl mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/en/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/en/shipping" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/en/returns" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/en/faq" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/en/support" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  24/7 Support
                </Link>
              </li>
              <li>
                <Link href="/en/track" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='w-85 lg:w-100'>
            <h3 className="text-yellow-400 font-bold text-xl mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 w-full">
              
                <FooterMap lat='33.5559235' lng='-7.4782789'/>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-400 text-sm">+212 770-566628</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400 text-sm">support@ishop.ma</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Working Hours</p>
                  <p className="text-gray-400 text-sm">24/7 Customer Support</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8">
              <h4 className="text-yellow-400 font-bold text-lg mb-4">We Accept</h4>
              <div className="flex flex-wrap gap-3">
                <div className="bg-gray-900/50 border border-yellow-400/30 rounded-lg px-3 py-2 flex items-center gap-2">
                  <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/>
                  </svg>
                  <span className="text-white text-sm font-medium">Cash on Delivery</span>
                </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-yellow-400/20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; 2025 iShop Morocco. All rights reserved. | Made with ❤️ by Ayoub Ameur</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <Link href="/en/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/en/terms" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/en/cookies" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                Cookie Policy
              </Link>
              <Link href="/en/sitemap" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterEn