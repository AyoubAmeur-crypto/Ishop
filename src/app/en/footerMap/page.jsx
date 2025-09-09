'use client'
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import the map component with no SSR
const DynamicMap = dynamic(() => import('../../context/MapfototerComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-full bg-gray-900/50 border border-yellow-400/30 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-yellow-400 text-sm">Loading map...</p>
      </div>
    </div>
  )
});

export default function FooterMap({ lat = 33.5731, lng = -7.5898 }) {
  return (
    <div className="w-full">
      <DynamicMap lat={lat} lng={lng} />
    </div>
  );
}