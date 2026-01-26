import React, { useState } from 'react';
import { Page, Box, Input, Icon, Text } from 'zmp-ui';

interface MapMarkerProps {
  x: number;
  y: number;
  type: 'pickleball' | 'badminton' | 'football' | 'tennis' | 'user';
  label?: string;
  isUser?: boolean;
}

const MapMarker: React.FC<MapMarkerProps> = ({ x, y, type, label, isUser }) => {
  let color = 'bg-blue-500';
  let icon = 'zi-more-grid';
  
  if (isUser) {
    return (
      <div 
        className="absolute w-12 h-12 rounded-full border-4 border-white/50 bg-green-500/20 flex items-center justify-center animate-pulse z-20"
        style={{ top: `${y}%`, left: `${x}%` }}
      >
        <div className="w-4 h-4 rounded-full bg-green-600 border-2 border-white shadow-lg"></div>
      </div>
    );
  }

  switch(type) {
    case 'pickleball': color = 'bg-blue-600'; icon = 'zi-more-grid'; break; // Placeholder for pickleball
    case 'badminton': color = 'bg-green-600'; icon = 'zi-more-grid'; break; // Placeholder
    case 'football': color = 'bg-red-600'; icon = 'zi-more-grid'; break;
    case 'tennis': color = 'bg-orange-500'; icon = 'zi-more-grid'; break;
  }

  return (
    <div 
      className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-full cursor-pointer active:scale-110 transition-transform duration-200"
      style={{ top: `${y}%`, left: `${x}%` }}
      onClick={() => console.log(`Clicked marker: ${type}`)}
    >
      {label && (
        <div className="mb-1 bg-white px-2 py-1 rounded-full shadow-md whitespace-nowrap z-10">
          <Text size="xxSmall" className="font-bold text-gray-700">{label}</Text>
        </div>
      )}
      <div className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-lg flex items-center justify-center text-white z-0 hover:scale-110 transition-transform`}>
         <Icon icon={icon} size={16} />
      </div>
      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white -mt-1"></div>
    </div>
  );
};

const MapPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const markers: MapMarkerProps[] = [
    { x: 50, y: 50, type: 'user', isUser: true },
    { x: 45, y: 40, type: 'pickleball', label: 'Sân pickleball' },
    { x: 60, y: 45, type: 'badminton', label: 'Sân cầu lông' },
    { x: 30, y: 60, type: 'football', label: 'Sân bóng đá' },
    { x: 70, y: 30, type: 'tennis' },
    { x: 20, y: 30, type: 'pickleball' },
    { x: 80, y: 60, type: 'badminton' },
    { x: 40, y: 70, type: 'football' },
    { x: 55, y: 25, type: 'tennis' },
    { x: 25, y: 50, type: 'pickleball' },
    { x: 75, y: 55, type: 'badminton' },
    { x: 35, y: 35, type: 'football' },
  ];

  return (
    <Page className="relative h-full w-full overflow-hidden bg-[#e6f4f1]">
      {/* Mock Map Background - Using a pattern or simple color for now as we don't have a real map image URL guaranteed to work perfectly without API */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         {/* Simple SVG pattern to mimic streets/rivers */}
         <svg width="100%" height="100%">
           <path d="M0 100 Q 200 300 400 100 T 800 200" stroke="#aadaff" strokeWidth="20" fill="none" />
           <path d="M0 300 Q 150 150 300 300 T 600 300" stroke="#aadaff" strokeWidth="15" fill="none" />
           <path d="M100 0 L 100 800" stroke="white" strokeWidth="10" fill="none" />
           <path d="M300 0 L 300 800" stroke="white" strokeWidth="8" fill="none" />
           <path d="M0 200 L 800 200" stroke="white" strokeWidth="8" fill="none" />
           <path d="M0 500 L 800 450" stroke="white" strokeWidth="8" fill="none" />
         </svg>
      </div>

      {/* Markers */}
      {markers.map((m, i) => (
        <MapMarker key={i} {...m} />
      ))}

      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-50">
        <div className="bg-white rounded-full shadow-lg p-2 flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
             <Icon icon="zi-location" className="text-green-600" size={20} />
           </div>
           <input 
             type="text" 
             placeholder="Tìm kiếm sân quanh đây." 
             className="flex-1 bg-transparent outline-none text-sm"
           />
           <Icon icon="zi-search" className="text-gray-500 mr-2" />
        </div>

        {/* Filter Chips */}
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-2">
           <div className="bg-white px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
             <Icon icon="zi-more-grid" className="text-blue-500" size={16} />
             <Text size="xSmall" className="font-medium">Sân pickleball</Text>
           </div>
           <div className="bg-white px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
             <Icon icon="zi-more-grid" className="text-green-500" size={16} />
             <Text size="xSmall" className="font-medium">Sân cầu lông</Text>
           </div>
           <div className="bg-white px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
             <Icon icon="zi-more-grid" className="text-red-500" size={16} />
             <Text size="xSmall" className="font-medium">Sân bóng đá</Text>
           </div>
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute top-24 right-4 z-40 flex flex-col gap-2">
        <div className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center">
          <Icon icon="zi-layers" size={20} className="text-gray-600" />
        </div>
      </div>

      <div className="absolute bottom-20 right-4 z-40 flex flex-col gap-3">
         <div className="w-12 h-12 bg-green-700 rounded-full shadow-lg flex items-center justify-center text-white">
           <Icon icon="zi-arrow-up" size={24} />
         </div>
         <div className="w-12 h-12 bg-green-700 rounded-full shadow-lg flex items-center justify-center text-white">
           <Icon icon="zi-location-solid" size={24} />
         </div>
      </div>

    </Page>
  );
};

export default MapPage;
