import React from "react";
import { Page, Text, Icon, Button, Box, useNavigate } from "zmp-ui";

const DiscoveryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Page className="bg-white pb-20">
      {/* Header Title */}
      <div className="pt-4 px-4 pb-2">
        <Text.Title size="large" className="text-[#283b91] font-black italic uppercase text-2xl">
          KHÁM PHÁ
        </Text.Title>
      </div>

      {/* Filter Tabs */}
      <div className="flex px-4 gap-2 overflow-x-auto no-scrollbar mb-4">
        <div className="flex-shrink-0 border border-[#283b91] bg-[#eef2ff] text-[#283b91] px-4 py-1.5 rounded-full font-bold text-sm">
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
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
               <img src="https://ui-avatars.com/api/?name=Amber+Pickleball&background=random" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <Text.Title size="small" className="font-bold">Amber Pickleball Club</Text.Title>
              <div className="flex items-center text-gray-500 text-xs mt-0.5">
                <Icon icon="zi-location" size={12} className="mr-1" />
                <span className="text-[#283b91] font-medium mr-1">(10.6km)</span>
                <span className="line-clamp-1">Tầng 10, Tòa nhà Samco Building...</span>
              </div>
              <div className="text-gray-400 text-xs mt-0.5">
                08:45 • 20/01/2026
              </div>
            </div>
          </div>

          {/* Post Content Text */}
          <div className="mb-3">
             <Text size="normal">🔥 Sân trống trong hôm nay</Text>
             <Text size="normal" className="text-[#283b91] font-medium">#thongbaosantrong</Text>
          </div>

          {/* Schedule List Container */}
          <div className="bg-[#eef2ff] rounded-xl p-3 border border-[#e0e7ff] mb-4">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e0e7ff] mb-3 relative overflow-hidden">
               <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-[#283b91] text-white flex items-center justify-center text-xs font-bold">1</div>
                   <div className="border border-[#283b91] text-[#283b91] text-[10px] px-2 py-0.5 rounded font-bold uppercase">Sân trống</div>
                 </div>
                 <div className="flex items-center text-[#283b91] text-xs font-bold">
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

               <Button 
                 fullWidth
                 className="bg-[#1a2b70] text-white font-bold rounded-lg text-sm"
                 onClick={() => navigate("/booking/visual", { state: { clubName: "Amber Pickleball Club", mode: "visual" } })}
               >
                 Xem chi tiết
               </Button>
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
                    <div className="text-xs text-gray-500">01:00 - 09:00 , 11:00 - 14:00 , 17:00 - 19:00</div>
                 </div>
               </div>

               <Button 
                 fullWidth
                 className="bg-green-800 text-white font-bold rounded-lg text-sm"
                 onClick={() => navigate("/booking/visual", { state: { clubName: "Amber Pickleball Club", mode: "visual" } })}
               >
                 Xem chi tiết
               </Button>
            </div>

            <div className="text-center mt-3 text-green-700 font-bold text-sm flex items-center justify-center gap-1 cursor-pointer">
              Xem thêm 3 lịch khác <Icon icon="zi-chevron-down" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-20 right-4">
        <div className="w-12 h-12 bg-[#283b91] rounded-full text-white flex items-center justify-center shadow-lg cursor-pointer">
           <Icon icon="zi-plus" size={24} />
        </div>
      </div>
    </Page>
  );
};

export default DiscoveryPage;
