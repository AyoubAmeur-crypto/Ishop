'use client'

const MovingBanner = () => {
  return (
    <div className="h-12 bg-yellow-400 overflow-hidden relative flex items-center">
      {/* Single continuous marquee */}
      <div className="absolute whitespace-nowrap animate-marquee-simple">
        <span className="text-black font-bold text-sm px-8">
          🚚 FREE SHIPPING ALL OVER MOROCCO - ORDER NOW!
        </span>
        <span className="text-black font-bold text-sm px-8">
          ⚡ EXPRESS DELIVERY 24-48H - PREMIUM SERVICE
        </span>
        <span className="text-black font-bold text-sm px-8">
          💰 BEST PRICES GUARANTEED - SHOP WITH CONFIDENCE
        </span>
        <span className="text-black font-bold text-sm px-8">
          🇲🇦 PROUDLY SERVING MOROCCO SINCE 2020
        </span>
        <span className="text-black font-bold text-sm px-8">
          🛒 THOUSANDS OF SATISFIED CUSTOMERS
        </span>
        <span className="text-black font-bold text-sm px-8">
          ✨ PREMIUM QUALITY PRODUCTS ONLY
        </span>
        {/* Repeat for seamless loop */}
        <span className="text-black font-bold text-sm px-8">
          🚚 FREE SHIPPING ALL OVER MOROCCO - ORDER NOW!
        </span>
        <span className="text-black font-bold text-sm px-8">
          ⚡ EXPRESS DELIVERY 24-48H - PREMIUM SERVICE
        </span>
        <span className="text-black font-bold text-sm px-8">
          💰 BEST PRICES GUARANTEED - SHOP WITH CONFIDENCE
        </span>
        <span className="text-black font-bold text-sm px-8">
          🇲🇦 PROUDLY SERVING MOROCCO SINCE 2020
        </span>
        <span className="text-black font-bold text-sm px-8">
          🛒 THOUSANDS OF SATISFIED CUSTOMERS
        </span>
        <span className="text-black font-bold text-sm px-8">
          ✨ PREMIUM QUALITY PRODUCTS ONLY
        </span>
      </div>
    </div>
  )
}

export default MovingBanner