import React from "react";
import { Page, Text, Icon, Button, Box } from "zmp-ui";

const DiscoveryPage: React.FC = () => {
  return (
    <Page className="bg-white pb-20">
      {/* Header Title */}
      <div className="pt-4 px-4 pb-2">
        <Text.Title size="large" className="text-green-700 font-black italic uppercase text-2xl">
          KHÁM PHÁ
        </Text.Title>
      </div>

      {/* Filter Tabs */}
      <div className="flex px-4 gap-2 overflow-x-auto no-scrollbar mb-4">
        <div className="flex-shrink-0 border border-green-600 bg-green-50 text-green-700 px-4 py-1.5 rounded-full font-bold text-sm">
          Tất cả
        </div>
        <div className="flex-shrink-0 border border-gray-200 text-gray-500 px-4 py-1.5 rounded-full font-medium text-sm flex items-center gap-1">
          <Icon icon="zi-notif" size={16} />
          Thông báo
        </div>
        <div className="flex-shrink-0 border border-gray-200 text-gray-500 px-4 py-1.5 rounded-full font-medium text-sm flex items-center gap-1">
          <Icon icon="zi-gift" size={16} />
          Ưu đãi
        </div>
        <div className="flex-shrink-0 border border-gray-200 text-gray-500 px-4 py-1.5 rounded-full font-medium text-sm flex items-center gap-1">
          <Icon icon="zi-calendar" size={16} />
          Sự kiện
        </div>
      </div>

      {/* Feed Item */}
      <div className="border-t border-gray-100">
        <div className="p-4">
          {/* Post Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
               {/* Placeholder logo */}
               <img src="https://via.placeholder.com/100x100.png?text=A" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <Text.Title size="small" className="font-bold">Amber Pickleball Club</Text.Title>
              <div className="flex items-center text-gray-500 text-xs mt-0.5">
                <Icon icon="zi-location" size={12} className="mr-1" />
                <span className="text-green-600 font-medium mr-1">(10.6km)</span>
                <span className="line-clamp-1">Tầng 10, Tòa nhà Samco Building - 326 Võ Văn Kiệt...</span>
              </div>
              <div className="text-gray-400 text-xs mt-0.5">
                08:45 • 20/01/2026
              </div>
            </div>
          </div>

          {/* Post Content Text */}
          <div className="mb-3">
             <Text size="normal">🔥 Sân trống trong hôm nay</Text>
             <Text size="normal" className="text-green-600 font-medium">#thongbaosantrong</Text>
          </div>

          {/* Schedule List Container */}
          <div className="bg-green-50 rounded-xl p-3 border border-green-100 mb-4">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-green-100 mb-3 relative overflow-hidden">
               <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold">1</div>
                   <div className="border border-green-600 text-green-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Sân trống</div>
                 </div>
                 <div className="flex items-center text-green-700 text-xs font-bold">
                   Xem thêm (2) <Icon icon="zi-chevron-down" size={14} />
                 </div>
               </div>
               
               <div className="mb-2">
                 <Text className="font-bold text-lg">23/01/2026</Text>
                 <div className="mt-1 text-sm text-gray-600">
                    <div><span className="font-bold text-black">Sân 1:</span></div>
                    <div className="text-xs text-gray-500">01:00 - 08:00 , 14:00 - 16:30 , 22:00 - 24:00</div>
                 </div>
                 <div className="mt-1 text-sm text-gray-600">
                    <div><span className="font-bold text-black">Sân 2:</span></div>
                    <div className="text-xs text-gray-500">01:00 - 08:00 , 14:00 - 16:30 , 20:00 - 24:00</div>
                 </div>
               </div>

               <button className="w-full bg-green-800 text-white font-bold py-2 rounded-lg text-sm">
                 Xem chi tiết
               </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-green-100 relative overflow-hidden">
               <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold">2</div>
                   <div className="border border-green-600 text-green-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Sân trống</div>
                 </div>
                 <div className="flex items-center text-green-700 text-xs font-bold">
                   Xem thêm (2) <Icon icon="zi-chevron-down" size={14} />
                 </div>
               </div>
               
               <div className="mb-2">
                 <Text className="font-bold text-lg">24/01/2026</Text>
                 <div className="mt-1 text-sm text-gray-600">
                    <div><span className="font-bold text-black">Sân 1:</span></div>
                    <div className="text-xs text-gray-500">01:00 - 09:00 , 11:00 - 14:00 , 17:00 - 19:00 , 22:00 - 24:00</div>
                 </div>
                 <div className="mt-1 text-sm text-gray-600">
                    <div><span className="font-bold text-black">Sân 2:</span></div>
                    <div className="text-xs text-gray-500">01:00 - 08:30 , 11:00 - 13:30 , 17:00 - 19:00 , 22:00 - 24:00</div>
                 </div>
               </div>

               <button className="w-full bg-green-800 text-white font-bold py-2 rounded-lg text-sm">
                 Xem chi tiết
               </button>
            </div>

            {/* Footer Expand */}
            <div className="flex items-center justify-center text-green-800 font-bold text-sm mt-3 gap-1">
               Xem thêm 3 lịch khác <Icon icon="zi-chevron-down" size={16} />
            </div>

          </div>

          {/* Banner Image */}
          <div className="rounded-xl overflow-hidden shadow-sm relative h-32 bg-blue-400">
             {/* Simple visual placeholder for the pickleball banner */}
             <div className="absolute inset-0 flex items-center justify-between px-6 bg-gradient-to-r from-blue-400 to-blue-600">
                <div className="text-white">
                   <Icon icon="zi-more-grid" size={40} className="opacity-20 absolute top-2 left-2" />
                   <Icon icon="zi-more-grid" size={20} className="opacity-20 absolute bottom-2 right-10" />
                </div>
                <Text className="text-white font-black text-2xl tracking-widest drop-shadow-md">PICKLEBALL</Text>
                <div className="text-white">
                   <Icon icon="zi-more-grid" size={50} className="opacity-20" />
                </div>
             </div>
             {/* Racket graphic simulation */}
             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-pink-400 rounded-full opacity-80 border-4 border-white"></div>
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-800 rounded-full opacity-80 border-4 border-white"></div>
          </div>

        </div>
      </div>

    </Page>
  );
};

export default DiscoveryPage;
