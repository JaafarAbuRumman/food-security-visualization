import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext.tsx';

// Declare L to satisfy TypeScript since Leaflet is loaded from a CDN
declare const L: any;

interface InteractiveMapProps {
  geoJsonData: any;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ geoJsonData }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const geoJsonLayerRef = useRef<any>(null);
  const { theme } = useTheme();

  // Effect to initialize map and handle cleanup
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [31.2, 36.8],
        zoom: 7,
      });
      mapInstanceRef.current = map;
    }

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Effect to update tile layer based on theme
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    
    const tileUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    
    const newTileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    });

    newTileLayer.addTo(map);
    tileLayerRef.current = newTileLayer;

  }, [theme]);

  // Effect to add/update GeoJSON layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !geoJsonData) return;

    if (geoJsonLayerRef.current) {
        map.removeLayer(geoJsonLayerRef.current);
    }

    const newGeoJsonLayer = L.geoJSON(geoJsonData, {
      style: () => ({
        color: '#16a34a',
        weight: 2,
        opacity: 0.8,
        fillColor: '#16a34a',
        fillOpacity: 0.2,
      }),
      onEachFeature: (feature: any, layer: any) => {
        if (feature.properties) {
          const { name, description } = feature.properties;
          const popupContent = `
            <div class="p-1 max-w-xs">
              <h3 class="font-bold text-lg text-green-700 dark:text-green-400 mb-1">${name}</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300">${description}</p>
            </div>
          `;
          layer.bindPopup(popupContent);
        }
      },
    });

    newGeoJsonLayer.addTo(map);
    geoJsonLayerRef.current = newGeoJsonLayer;
    
    if (newGeoJsonLayer.getBounds().isValid()) {
        map.fitBounds(newGeoJsonLayer.getBounds().pad(0.1));
    }

  }, [geoJsonData]);

  return <div ref={mapContainerRef} className="h-[600px] w-full rounded-lg shadow-lg z-10" />;
};

export default InteractiveMap;
