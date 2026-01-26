import React from 'react';
import { Box, Text, Icon, useNavigate } from 'zmp-ui';

export interface Club {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  openTime: string;
  address: string;
  type?: 'daily' | 'event';
  categoryId?: string;
  distanceKm?: number;
  tags?: string[];
}

interface ClubCardProps {
  club: Club;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const navigate = useNavigate();

  return (
    <Box 
      className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm active:scale-95 transition-transform duration-200"
      onClick={() => console.log('Card clicked')}
    >
      {/* Image Header */}
      <div className="relative h-40 w-full">
        <img 
          src={club.image} 
          alt={club.name} 
          className="w-full h-full object-cover"
        />
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full shadow-sm">
             <Icon icon="zi-star-solid" className="text-yellow-400" size={12} />
             <Text size="xxSmall" className="font-bold">{club.rating}</Text>
          </div>
          <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
             Đơn ngày
          </div>
          {club.type === 'event' && (
             <div className="bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
               Sự kiện
             </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md active:bg-gray-100">
             <Icon icon="zi-heart" size={20} className="text-gray-600" />
           </div>
           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md active:bg-gray-100">
             <Icon icon="zi-share" size={20} className="text-gray-600" />
           </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-3">
        <div className="flex justify-between items-start">
           <div className="flex items-start gap-2 flex-1">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                 <img src="https://i.pravatar.cc/100?img=12" className="w-full h-full object-cover" alt="logo" />
              </div>
              <div>
                 <Text.Title size="small" className="font-bold">{club.name}</Text.Title>
                 <Text size="xxSmall" className="text-gray-500 line-clamp-2 mt-0.5">
                    <span className="text-red-500 font-medium">({club.distance})</span> {club.address}
                 </Text>
                 <div className="flex items-center text-gray-500 mt-1">
                    <Icon icon="zi-clock-1" size={12} />
                    <Text size="xxSmall" className="ml-1">{club.openTime}</Text>
                 </div>
              </div>
           </div>

           <button 
             className="bg-[#F5B400] text-white font-bold text-xs py-2 px-4 rounded-lg shadow-sm active:bg-yellow-600 active:scale-95 transition-all duration-200 flex-shrink-0 ml-2"
             onClick={(e) => {
               e.stopPropagation();
               console.log('Book clicked');
             }}
           >
             ĐẶT LỊCH
           </button>
        </div>
      </div>
    </Box>
  );
};
