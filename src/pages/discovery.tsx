import React from "react";
import { Page, Text, Icon, Button, Box, useNavigate } from "zmp-ui";
import { discoveryEvents } from "../mock/data";

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

      {/* Feed List */}
      <div className="border-t border-gray-100">
        {discoveryEvents.map((event) => (
          <div key={event.id} className="p-4 border-b border-gray-50">
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
                 <img src={event.clubAvatar} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <Text.Title size="small" className="font-bold">{event.clubName}</Text.Title>
                <div className="flex items-center text-gray-500 text-xs mt-0.5">
                  <Icon icon="zi-location" size={12} className="mr-1" />
                  <span className="text-[#283b91] font-medium mr-1">({event.distance})</span>
                  <span className="line-clamp-1">{event.address}</span>
                </div>
                <div className="text-gray-400 text-xs mt-0.5">
                  {event.time}
                </div>
              </div>
            </div>

            {/* Post Content Text */}
            <div className="mb-3">
               <Text size="normal">{event.content}</Text>
               <div className="flex gap-2 mt-1">
                 {event.hashtags.map((tag, idx) => (
                   <Text key={idx} size="normal" className="text-[#283b91] font-medium">{tag}</Text>
                 ))}
               </div>
            </div>

            {/* Schedule List Container */}
            {event.availableSlots.length > 0 && (
              <div className="bg-[#eef2ff] rounded-xl p-3 border border-[#e0e7ff] mb-4">
                {event.availableSlots.map((slot, index) => (
                  <div key={index} className="bg-white rounded-xl p-3 shadow-sm border border-[#e0e7ff] mb-3 last:mb-0 relative overflow-hidden">
                     <div className="flex justify-between items-center mb-2">
                       <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-[#283b91] text-white flex items-center justify-center text-xs font-bold">{index + 1}</div>
                         <div className="border border-[#283b91] text-[#283b91] text-[10px] px-2 py-0.5 rounded font-bold uppercase">Sân trống</div>
                       </div>
                       <div className="flex items-center text-[#283b91] text-xs font-bold">
                         Xem thêm ({slot.courts.length}) <Icon icon="zi-chevron-down" size={14} />
                       </div>
                     </div>
                     
                     <div className="mb-2">
                       <Text className="font-bold text-lg">{slot.date}</Text>
                       {slot.courts.map((court, cIdx) => (
                         <div key={cIdx} className="mt-1 text-sm text-gray-600">
                            <div><span className="font-bold text-black">{court.name}:</span></div>
                            <div className="text-xs text-gray-500">{court.time}</div>
                         </div>
                       ))}
                     </div>

                     <Button 
                       fullWidth
                       className="bg-[#1a2b70] text-white font-bold rounded-lg text-sm"
                       onClick={() => navigate("/booking/visual", { state: { clubName: event.clubName, mode: "visual" } })}
                     >
                       Xem chi tiết
                     </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Page>
  );
};

export default DiscoveryPage;
