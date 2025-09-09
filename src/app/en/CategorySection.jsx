import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion'
import { Toast } from 'primereact/toast'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

function CategorySection({onCategorySelect}) {
  const categories = [
    {
      name: "Men's Clothing",
      value: "men's clothing",
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80",
      description: "Discover the latest in men's fashion"
    },
    {
      name: "Women's Clothing", 
      value: "women's clothing",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
      description: "Elegant styles for every occasion"
    },
    {
      name: "Electronics",
      value: "electronics", 
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80",
      description: "Latest tech and gadgets"
    },
    {
      name: "Jewelery",
      value: "jewelery",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80", 
      description: "Luxury jewelry and accessories"
    }
  ];

  return (
    <div className="mb-12">
      

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: '.category-button-next',
          prevEl: '.category-button-prev',
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet bg-white/50',
          bulletActiveClass: 'swiper-pagination-bullet-active bg-yellow-400'
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="category-swiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
              onClick={()=>{onCategorySelect && onCategorySelect(category.value)}}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Yellow Overlay */}
              <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Explore Collection
                  </span>
                  <h3 className="text-2xl font-black mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Zoom Effect Circle */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="category-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-yellow-400/80 transition group">
          <svg className="w-6 h-6 text-white group-hover:text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </div>
        <div className="category-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-yellow-400/80 transition group">
          <svg className="w-6 h-6 text-white group-hover:text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </Swiper>
    </div>
  );
}

export default CategorySection