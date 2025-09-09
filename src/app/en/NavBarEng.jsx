'use client'
import React, { useContext, useState, useRef, useEffect } from 'react';
import { ShoppingCart, Package, Info, Globe, Menu, X, CircleUserRound, User, ShoppingBasket, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { userFetchedData } from '../context/AuthContext';
import userData from '../api/product/userData';
import { logoutFromPage } from '../api/product/Authentifcation';
import { getCatUserDetails } from '../api/product/cart';
import cart from './cart/page';

function NavBarEng({onCartUpdate}) {
  const [lang, setLang] = useState('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartItems,setCartItems]=useState(null)

  const {isLogged,userData,setUserData} = useContext(userFetchedData)
 
  const pathname = usePathname();

    const getCartDetails = async ()=>{

       const cartRes = await getCatUserDetails()

       if (cartRes && cartRes.cart && cartRes.cart.items) {
        setCartItems(cartRes.cart.items);
      } else if (cartRes && cartRes.items) {
        setCartItems(cartRes.items);
      } else {
        setCartItems([]);
      }

    }



    useEffect(()=>{
     

if(isLogged){

                getCartDetails()

}

     
    },[onCartUpdate,isLogged])

  const getLangPath = () => {
    if (lang === 'en') {
      return pathname.replace(/^\/fr/, '/en');
    } else {
      return pathname.replace(/^\/en/, '/fr');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    // Add your logout logic here
    console.log('Logging out...');
    const serverResponseLogout = await logoutFromPage()



    if(serverResponseLogout){
      setUserData(null)
      window.location.href='/'
    }
  };

  return (
    <>
      <nav className="bg-black border-b-2 border-yellow-400 px-2 sm:px-6 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href='/' onClick={closeMenu}> 
            <div className="flex items-center gap-1">
              <span className="text-white text-2xl font-semibold">I</span>
              <span className="text-yellow-400 text-2xl">shop</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/en" className="flex items-center gap-1 text-white hover:text-yellow-400 transition-all duration-300">
              <Package size={20} />
              <span>Products</span>
            </Link>
            <Link href="/en/about" className="flex items-center gap-1 text-white hover:text-yellow-400 transition-all duration-300">
              <Info size={20} />
              <span>About</span>
            </Link>
          </div>

          {/* Right Side - Profile, Cart & Language & Hamburger */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Profile Button */}
            {isLogged ? (
              <button
                onClick={toggleProfile}
                className="flex items-center gap-1 text-white hover:text-yellow-400 transition-all duration-300 p-2 rounded-lg hover:bg-gray-900"
              >
                <CircleUserRound size={25} />
              </button>
            ) : (<div className='flex flex-row items-center gap-4'>
              <Link href='/login' className='text-yellow-400 cursor-pointer'>Login</Link>
              <Link href='/signup'  className='px-2 py-1 bg-yellow-400 text-black rounded-lg duration-300 tramsition-all hover:bg-black hover:bg-yellow-500 cursor-pointer'>SignUp</Link>
            </div>)}

            {/* Cart */}
          <Link href="/en/cart" className="flex items-center gap-1 text-white hover:text-yellow-400 transition-all duration-300 p-2 relative">
  <div className="relative">
    <ShoppingCart size={20} />
    {isLogged && cartItems && cartItems.length > 0 && (
      <span className='absolute -top-2 -right-2 bg-yellow-400 rounded-full w-5 h-5 text-black text-xs font-bold flex items-center justify-center min-w-[20px]'>
        {cartItems.length > 99 ? '99+' : cartItems.length}
      </span>
    )}
  </div>
  <span className="hidden sm:inline">Cart</span>
</Link>

            {/* Language Toggle */}
            <Link href={getLangPath()}>
              <div className="flex items-center">
                <button
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full border-2 ${
                    lang === 'en' ? 'border-yellow-400 bg-gray-900' : 'border-gray-700 bg-gray-800'
                  } text-white transition-all duration-300 hover:border-yellow-400`}
                  onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                >
                  <Globe size={18} />
                  <span className="hidden sm:inline">{lang === 'en' ? 'EN' : 'FR'}</span>
                </button>
              </div>
            </Link>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:text-yellow-400 transition-all duration-300 rounded-lg hover:bg-gray-900"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="transition-all duration-300" />
              ) : (
                <Menu size={24} className="transition-all duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-black border-b-2 border-yellow-400 transition-all duration-300 transform ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0 visible' 
              : 'opacity-0 -translate-y-4 invisible'
          }`}
          style={{ zIndex: 50 }}
        >
          <div className="px-4 py-4 space-y-4">
            <Link 
              href="/en" 
              onClick={closeMenu}
              className="flex items-center gap-3 text-white hover:text-yellow-400 transition-all duration-300 py-2 px-2 rounded-lg hover:bg-gray-900"
            >
              <Package size={20} />
              <span>Products</span>
            </Link>
            <Link 
              href="/en/about" 
              onClick={closeMenu}
              className="flex items-center gap-3 text-white hover:text-yellow-400 transition-all duration-300 py-2 px-2 rounded-lg hover:bg-gray-900"
            >
              <Info size={20} />
              <span>About</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 transition-all duration-300"
            style={{ zIndex: 40 }}
            onClick={closeMenu}
          ></div>
        )}
      </nav>

      {/* Profile Sidebar */}
      {isLogged && (
        <>
          {/* Sidebar Overlay */}
          {isProfileOpen && (
            <div
              className="fixed inset-0 bg-black/70 transition-all duration-300 z-40"
              onClick={closeProfile}
            ></div>
          )}

          {/* Profile Sidebar */}
           <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-gray-950 border-l-2 border-yellow-400/30 shadow-2xl transform transition-all duration-300 z-50 ${
              isProfileOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-yellow-400/20 bg-gray-900/30">
              <h3 className="text-white font-semibold text-lg">Profile</h3>
              <button
                onClick={closeProfile}
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 p-1 rounded-lg hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* User Info Section */}
            <div className="p-6 border-b border-yellow-400/10 bg-gray-900/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 bg-yellow-400 rounded-full flex items-center justify-center">
                  <User size={26} className="text-gray-900" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">{userData.firstName+' '+userData.lastName}</p>
                  <p className="text-gray-400 text-sm">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm rounded-full border border-yellow-400/30">
                  {userData.role}
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              <Link
                href="/en/profile"
                onClick={closeProfile}
                className="flex items-center gap-4 px-4 py-3 text-white hover:text-yellow-400 hover:bg-gray-900 rounded-lg transition-all duration-300"
              >
                <User size={20} />
                <span className="font-medium">My Profile</span>
              </Link>
              
              <Link
                href="/en/order"
                onClick={closeProfile}
                className="flex items-center gap-4 px-4 py-3 text-white hover:text-yellow-400 hover:bg-gray-900 rounded-lg transition-all duration-300"
              >
                <ShoppingBasket size={20} />
                <span className="font-medium">Orders</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-gray-900 rounded-lg transition-all duration-300"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>

            {/* Sidebar Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-yellow-400/10 bg-gray-900/30">
              <p className="text-gray-500 text-xs text-center">
                © 2025 IShop. All rights reserved.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NavBarEng;