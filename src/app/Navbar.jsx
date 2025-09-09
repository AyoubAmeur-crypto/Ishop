'use client'
import React, { useState } from 'react';
import { ShoppingCart, Package, Info, Globe } from 'lucide-react';
import Link from 'next/link';

function Navbar() {
  const [lang, setLang] = useState('en');
  return (
    <nav className="bg-black border-b-2 border-yellow-400 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
     <Link href='/'> <div className="flex items-center gap-1">
        <span className="text-white text-2xl font-semibold">I</span>
        <span className="text-yellow-400 text-2xl ">shop</span>
      </div></Link>
      {/* Routes */}
      <div className="flex items-center gap-8">
        <a href="/products" className="flex items-center gap-1 text-white hover:text-yellow-400 transition">
          <Package size={20} />
          <span>Products</span>
        </a>
        <a href="/about" className="flex items-center gap-1 text-white hover:text-yellow-400 transition">
          <Info size={20} />
          <span>About</span>
        </a>
        <a href="/cart" className="flex items-center gap-1 text-white hover:text-yellow-400 transition">
          <ShoppingCart size={20} />
          <span>Cart</span>
        </a>
      </div>
      {/* Language Toggle */}
     <Link href={`/${lang}`}><div className="flex items-center gap-2">
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-full border-2 ${lang === 'en' ? 'border-yellow-400 bg-gray-900' : 'border-gray-700 bg-gray-800'} text-white transition`}
          onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
        >
          <Globe size={18} />
          <span>{lang === 'en' ? 'English' : 'Français'}</span>
        </button>
      </div> </Link> 
    </nav>
  );
}

export default Navbar;