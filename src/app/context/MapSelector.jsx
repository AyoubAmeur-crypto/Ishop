'use client';

import { useState, useEffect } from 'react';

export function MapSelector({ onCitySelect }) {
  const [isClient, setIsClient] = useState(false);
  const [MapComponent, setMapComponent] = useState(null);

  useEffect(() => {
    // Only run on client side
    setIsClient(true);
    
    // Dynamically import the map after component mounts
    const loadMap = async () => {
      try {
        const { default: DynamicMapComponent } = await import('./MapComponent');
        setMapComponent(() => DynamicMapComponent);
      } catch (error) {
        console.error('Failed to load map:', error);
      }
    };

    loadMap();
  }, []);

  if (!isClient || !MapComponent) {
    return (
      <div className="rounded-xl overflow-hidden border border-yellow-400/30 h-[300px] flex items-center justify-center bg-black/20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-yellow-400 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return <MapComponent onCitySelect={onCitySelect} />;
}