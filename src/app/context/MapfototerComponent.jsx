'use client'

export default function FooterMap() {
  // Specific coordinates for Casablanca city center (Hassan II Mosque area)
  const lat = 33.5731;
  const lng = -7.5898;
  
  return (
    <div className="w-full">
      <div className="h-48 w-full bg-gray-900/50 border border-yellow-400/30 rounded-lg overflow-hidden relative">
        {/* Static Map using OpenStreetMap with proper Casablanca coordinates */}
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=-7.62,33.55,-7.56,33.61&layer=mapnik&marker=33.5731,-7.5898`}
          className="w-full h-full"
          style={{ border: 'none' }}
          loading="lazy"
          title="iShop Morocco Location - Casablanca"
          allow="geolocation"
        />
        
        {/* Overlay with your branding */}
        

        {/* Bottom right info */}
        <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm border border-yellow-400/50 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-400 text-xs font-medium">We're Here!</span>
          </div>
        </div>
      </div>
    </div>
  );
}