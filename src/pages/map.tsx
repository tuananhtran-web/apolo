import React, { useState } from 'react';
import { Page, Icon, Text, Header, useNavigate } from 'zmp-ui';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet default icon not showing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapMarkerProps {
  id: number;
  lat: number;
  lng: number;
  name: string;
  type: string;
}

const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const markers: MapMarkerProps[] = [
    { id: 1, lat: 10.762622, lng: 106.660172, name: 'CLB Cầu Lông Phú Mỹ', type: 'badminton' },
    { id: 2, lat: 10.772622, lng: 106.670172, name: 'Sân Pickleball Quận 7', type: 'pickleball' },
    { id: 3, lat: 10.752622, lng: 106.650172, name: 'Sân Bóng Đá K300', type: 'football' },
    { id: 4, lat: 10.782622, lng: 106.680172, name: 'Sân Tennis Lan Anh', type: 'tennis' },
    { id: 5, lat: 10.765622, lng: 106.655172, name: 'Sân Cầu Lông ABC', type: 'badminton' },
  ];

  const handleBook = (clubName: string) => {
    navigate("/booking", { state: { mode: "daily", clubName } });
  };

  return (
    <Page className="h-full flex flex-col">
      <Header title="Bản đồ sân" className="bg-[#283b91] text-white" textColor="white" showBackIcon={false} />
      
      <div className="flex-1 relative z-0">
        <MapContainer 
            center={[10.762622, 106.660172]} 
            zoom={14} 
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {markers.map((marker) => (
            <Marker key={marker.id} position={[marker.lat, marker.lng]}>
              <Popup>
                <div className="min-w-[150px]">
                  <Text className="font-bold text-sm mb-1">{marker.name}</Text>
                  <Text size="xSmall" className="text-gray-500 mb-2 capitalize">{marker.type}</Text>
                  <button
                    className="w-full bg-[#283b91] text-white text-xs py-1.5 rounded hover:bg-blue-800 transition-colors font-medium"
                    onClick={() => handleBook(marker.name)}
                  >
                    ĐẶT LỊCH NGAY
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Overlay Search & Filter */}
        <div className="absolute top-4 left-4 right-4 z-[1000]">
           <div className="bg-white rounded-lg shadow-lg p-2 flex items-center gap-2 mb-2">
             <Icon icon="zi-search" className="text-gray-400" />
             <input 
               placeholder="Tìm kiếm khu vực..." 
               className="flex-1 outline-none text-sm"
             />
           </div>
           
           <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-[#283b91]">
                 Tất cả
              </div>
              <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-gray-600">
                 Pickleball
              </div>
              <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-gray-600">
                 Cầu lông
              </div>
           </div>
        </div>
      </div>
    </Page>
  );
};

export default MapPage;