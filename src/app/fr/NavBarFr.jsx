'use client'
import React, { useContext, useState } from 'react';
import { ShoppingCart, Package, Info, Globe, Menu, X, CircleUserRound, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { userFetchedData } from '../context/AuthContext';

function NavBarFr() {
  const [lang, setLang] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
 
  const pathname = usePathname();
  
  const getLangPath = () => {
    if (lang === 'en') {
      return pathname.replace(/^\/fr/, '/en');
    } else {
      return pathname.replace(/^\/en/, '/fr');
    }
  };

  const {isLogged}=useContext(userFetchedData)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };
   const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    closeProfile();
  };


  return (
    <nav className="bg-black border-b-2 border-yellow-400 px-2 sm:px-6 py-3 relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href='/fr' onClick={closeMenu}> 
          <div className="flex items-center gap-1">
            <span className="text-white text-2xl font-semibold">I</span>
            <span className="text-yellow-400 text-2xl">shop</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/fr" className="flex items-center gap-1 text-white hover:text-yellow-400 transition-all duration-300">
            <Package size={20} />
            <span>Produits</span>
          </Link>
          <Link href="/fr/about" className="flex items-center gap-1 text-white hover:text-yellow-400 transition-all duration-300">
            <Info size={20} />
            <span>À Propos</span>
          </Link>
        </div>

        {/* Right Side - Cart & Language & Hamburger */}
        <div className="flex items-center gap-1 sm:gap-4">
          {/* Cart */}
          {isLogged && (
              <button
                onClick={toggleProfile}
                className="flex items-center gap-1 text-white hover:text-yellow-400 transition-all duration-300 p-2 rounded-lg hover:bg-gray-900"
              >
                <CircleUserRound size={25} />
              </button>
            )}
          <Link href="/fr/cart" className="flex items-center gap-1 text-white hover:text-yellow-400 transition-all duration-300 p-2">
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Panier</span>
          </Link>

          {/* Language Toggle */}
          <Link href={getLangPath()}>
            <div className="flex items-center">
              <button
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full border-2 ${
                  lang === 'fr' ? 'border-yellow-400 bg-gray-900' : 'border-gray-700 bg-gray-800'
                } text-white transition-all duration-300 hover:border-yellow-400`}
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              >
                <Globe size={18} />
                <span className="hidden sm:inline">{lang === 'fr' ? 'FR' : 'EN'}</span>
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
            href="/fr" 
            onClick={closeMenu}
            className="flex items-center gap-3 text-white hover:text-yellow-400 transition-all duration-300 py-2 px-2 rounded-lg hover:bg-gray-900"
          >
            <Package size={20} />
            <span>Produits</span>
          </Link>
          <Link 
            href="/fr/about" 
            onClick={closeMenu}
            className="flex items-center gap-3 text-white hover:text-yellow-400 transition-all duration-300 py-2 px-2 rounded-lg hover:bg-gray-900"
          >
            <Info size={20} />
            <span>À Propos</span>
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
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <User size={28} className="text-black" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">John Doe</p>
                  <p className="text-gray-400 text-sm">john.doe@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-sm rounded-full border border-yellow-400/30">
                  Premium Member
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
                href="/en/settings"
                onClick={closeProfile}
                className="flex items-center gap-4 px-4 py-3 text-white hover:text-yellow-400 hover:bg-gray-900 rounded-lg transition-all duration-300"
              >
                <Settings size={20} />
                <span className="font-medium">Settings</span>
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
    </nav>
  );
}

export default NavBarFr;