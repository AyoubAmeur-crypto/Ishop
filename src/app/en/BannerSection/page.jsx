import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion'

import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function BannerSection() {
  const mainBanners = [
    {
      img: 'https://res.cloudinary.com/dlomtxi0t/image/upload/v1756724409/pexels-mnzoutfits-1670770_wv7qar.jpg',
      title: 'Summer Sale 2025',
      subtitle: 'Up to 70% OFF',
      desc: 'Shop the biggest summer collection with amazing discounts on all categories.',
      cta: 'Shop Now',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      img: 'https://res.cloudinary.com/dlomtxi0t/image/upload/v1756724152/pexels-garrettmorrow-682933_p2awiy.jpg',
      title: 'New Electronics',
      subtitle: 'Latest Tech Arrivals',
      desc: 'Discover cutting-edge technology and innovative gadgets for modern life.',
      cta: 'Explore',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      img: 'https://res.cloudinary.com/dlomtxi0t/image/upload/v1756724265/pexels-letssnacktoronto-1630344_taeoau.jpg',
      title: 'Fashion Forward',
      subtitle: 'Trending Styles',
      desc: 'Express yourself with our curated collection of fashion and accessories.',
      cta: 'Shop Fashion',
      gradient: 'from-pink-400 to-red-500'
    }
  ];

  const leftBanner = {
    img: 'https://res.cloudinary.com/dlomtxi0t/image/upload/v1756719144/pexels-didsss-1335463_i8v10y.jpg',
    title: 'Premium Shoes',
    desc: 'Step into comfort and style',
    badge: 'New Collection',
    cta: 'Shop Shoes'
  };

  const rightBanner = {
    img: 'https://res.cloudinary.com/dlomtxi0t/image/upload/v1756718803/pexels-cottonbro-4066296_cusyqr.jpg',
    title: 'Luxury Watches',
    desc: 'Timeless elegance on your wrist',
    badge: 'Limited Edition',
    cta: 'Shop Watches'
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-12 w-full">
      {/* Left Vertical Banner */}
      <div className="lg:w-1/5 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
        >
          <img
            src={leftBanner.img}
            alt={leftBanner.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="absolute top-4 left-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                {leftBanner.badge}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-xl mb-2">{leftBanner.title}</h3>
              <p className="text-white/80 text-sm mb-3">{leftBanner.desc}</p>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-500 transition">
                {leftBanner.cta}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Hero Banner - Center */}
      <div className="lg:w-3/5 w-full relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet bg-white/50',
            bulletActiveClass: 'swiper-pagination-bullet-active bg-yellow-400'
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          {mainBanners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <img
                  src={banner.img}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-60`}></div>
                <div className="absolute inset-0 flex flex-col justify-center items-start p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white max-w-lg"
                  >
                    <span className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold mb-4">
                      {banner.subtitle}
                    </span>
                    <h1 className="text-3xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight">
                      {banner.title}
                    </h1>
                    <p className="text-lg lg:text-xl mb-6 text-white/90">
                      {banner.desc}
                    </p>
                    <button className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 hover:scale-105 transition transform shadow-lg">
                      {banner.cta}
                    </button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-white/30 transition">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-white/30 transition">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </Swiper>
      </div>

      {/* Right Vertical Banner */}
      <div className="lg:w-1/5 w-full">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[300px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
        >
          <img
            src={rightBanner.img}
            alt={rightBanner.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="absolute top-4 left-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                {rightBanner.badge}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-xl mb-2">{rightBanner.title}</h3>
              <p className="text-white/80 text-sm mb-3">{rightBanner.desc}</p>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-500 transition">
                {rightBanner.cta}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


export default BannerSection