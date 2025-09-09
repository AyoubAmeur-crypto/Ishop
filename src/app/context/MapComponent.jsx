'use client';

import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useState } from "react";

// Fix default marker icon (only runs on client)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapComponent({ onLocationSelect }) {
  const [position] = useState([31.7917, -7.0926]); // Morocco center
  const [marker, setMarker] = useState(null);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setMarker(e.latlng);
        // Reverse geocode to get detailed address information
        const provider = new OpenStreetMapProvider({ 
          params: { countrycodes: "MA", limit: 1 } 
        });
        
        provider.search({ 
          query: `${e.latlng.lat}, ${e.latlng.lng}` 
        }).then((results) => {
          if (results && results.length > 0) {
            const result = results[0];
            console.log('Full geocoding result:', result); // For debugging
            console.log('Raw geocoding data:', result.raw); // For debugging
            
            let locationName = '';
            let postalCode = '';
            let region = '';
            let fullAddress = result.label || `${e.latlng.lat}, ${e.latlng.lng}`;
            
            if (result.raw) {
              // Extract postal code
              postalCode = result.raw.postcode || 
                          result.raw.postal_code || 
                          result.raw.zipcode || 
                          '';
              
              // Extract region/province
              region = result.raw.state || 
                      result.raw.region || 
                      result.raw.province || 
                      result.raw.county || 
                      result.raw['ISO3166-2-lvl4'] || 
                      result.raw.state_district ||
                      '';
              
              // SIMPLIFIED: Get the most specific location available
              locationName = result.raw.name ||           // Most specific (building, place)
                            result.raw.amenity ||         // Amenity name
                            result.raw.shop ||            // Shop name
                            result.raw.tourism ||         // Tourism spot
                            result.raw.suburb ||          // Neighborhood/suburb
                            result.raw.neighbourhood ||   // Neighborhood
                            result.raw.quarter ||         // Quarter
                            result.raw.city_district ||   // City district
                            result.raw.city ||            // City
                            result.raw.town ||            // Town
                            result.raw.village ||         // Village
                            result.raw.municipality ||    // Municipality
                            '';
            }
            
            // If no postal code found in raw data, try to extract from label
            if (!postalCode && result.label) {
              const postalMatch = result.label.match(/\b\d{5}\b/); // Match 5-digit postal codes
              if (postalMatch) {
                postalCode = postalMatch[0];
              }
            }
            
            // Enhanced region extraction from label if not found in raw
            if (!region && result.label) {
              const parts = result.label.split(',').map(part => part.trim());
              
              // Known Moroccan regions/provinces
              const moroccanRegions = [
                'Casablanca-Settat', 'Rabat-Salé-Kénitra', 'Fès-Meknès', 'Marrakech-Safi',
                'Oriental', 'Tanger-Tétouan-Al Hoceïma', 'Souss-Massa', 'Drâa-Tafilalet',
                'Béni Mellal-Khénifra', 'Laâyoune-Sakia El Hamra', 'Dakhla-Oued Ed-Dahab',
                'Guelmim-Oued Noun',
                // Also check for individual provinces
                'Prefecture of Casablanca', 'Prefecture of Rabat', 'Prefecture of Fès',
                'Casablanca-Settat', 'Rabat-Salé-Kénitra', 'Fès-Meknès', 'Marrakech-Safi',
                'Rhamna Province', 'Province de Rhamna'
              ];
              
              // Look for region in address parts
              for (const part of parts) {
                const foundRegion = moroccanRegions.find(regionName => 
                  part.toLowerCase().includes(regionName.toLowerCase()) ||
                  regionName.toLowerCase().includes(part.toLowerCase())
                );
                if (foundRegion) {
                  region = foundRegion;
                  break;
                }
              }
              
              // If still no region, try to get a meaningful part
              if (!region && parts.length >= 2) {
                for (let i = parts.length - 2; i >= 0; i--) {
                  const part = parts[i];
                  if (part && 
                      part.length > 2 &&
                      !part.toLowerCase().includes('morocco') &&
                      !part.toLowerCase().includes('maroc') &&
                      !part.match(/^\d{5}$/) // not just a postal code
                  ) {
                    region = part;
                    break;
                  }
                }
              }
            }
            
            // If no specific location found in raw data, extract from label
            if (!locationName && result.label) {
              const parts = result.label.split(',').map(part => part.trim());
              console.log('Address parts for location search:', parts);
              
              // Get the first meaningful part (most specific location)
              for (const part of parts) {
                if (part && 
                    part.length > 1 && 
                    !part.toLowerCase().includes('morocco') &&
                    !part.toLowerCase().includes('maroc') &&
                    !part.match(/^\d{5}$/) // not just a postal code
                ) {
                  locationName = part;
                  console.log(`Using location: ${part}`);
                  break;
                }
              }
            }
            
            // Clean up extracted data
            locationName = locationName
              .replace(/^\d+\s*-?\s*/, '') // remove leading postal codes
              .replace(/\s+/g, ' ') // normalize whitespace
              .trim();
            
            region = region
              .replace(/\s+/g, ' ') // normalize whitespace
              .trim();
            
            // Fallback for location name
            if (!locationName || locationName.length < 1) {
              locationName = 'Unknown Location';
            }
            
            // Prepare the data to send back
            const locationData = {
              location: locationName,      // Changed from 'city' to 'location'
              fullAddress: fullAddress,
              postalCode: postalCode,
              region: region,
              coordinates: {
                lat: e.latlng.lat,
                lng: e.latlng.lng
              }
            };
            
            console.log('Final extracted location data:', locationData);
            
            // Send the extracted data back to the parent component
            onLocationSelect(locationData);
            
          }
        }).catch((error) => {
          console.error('Geocoding error:', error);
          // Fallback: just send coordinates
          const fallbackData = {
            location: `Location ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`,
            fullAddress: `Coordinates: ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`,
            postalCode: '',
            region: '',
            coordinates: {
              lat: e.latlng.lat,
              lng: e.latlng.lng
            }
          };
          onLocationSelect(fallbackData);
        });
      },
    });
    
    return marker ? <Marker position={marker}></Marker> : null;
  }

  return (
    <div className="rounded-xl overflow-hidden border border-yellow-400/30">
      <MapContainer 
        center={position} 
        zoom={6} 
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}