import React, { useState } from "react";
import { Page, Text, Icon, Button, Box, useNavigate, Modal } from "zmp-ui";

interface PromoCardProps {
  title: string;
  subtitle: string;
  promoText: string;
  price?: string;
  address?: string;
  phone?: string;
  imageColor: string;
  buttonText?: string;
  theme?: 'swin' | 'coco' | 'yellow';
  onBook?: () => void;
}

const PromoCard: React.FC<PromoCardProps> = ({ 
  title, subtitle, promoText, price, address, phone, imageColor, buttonText = "ĐẶT LỊCH NGAY", theme = 'swin', onBook
}) => {
  return (
    <div 
      className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-lg relative bg-white active:scale-95 transition-transform duration-200 ease-in-out cursor-pointer"
    >
      <div className={`h-48 relative ${imageColor} flex`}>
        <div className="w-1/2 p-3 flex flex-col justify-center relative z-10 bg-white/90" 
             style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'}}>
          <div className="mb-1">
             {theme === 'swin' && (
               <div className="flex items-center gap-1 mb-1">
                 <Icon icon="zi-star-solid" className="text-red-600" size={24} />
                 <Text className="font-black text-xl text-gray-800 leading-none">SWIN</Text>
               </div>
             )}
             <Text className="font-bold text-lg leading-tight uppercase">{title}</Text>
             <Text className="font-bold text-lg leading-tight text-red-600 uppercase">{subtitle}</Text>
          </div>
          <div className="mt-1">
            <Text className="text-blue-900 font-bold text-xs uppercase opacity-80">Ưu đãi</Text>
            <Text className="text-red-600 font-black text-3xl leading-none">{promoText}</Text>
            {price && <Text className="text-red-600 font-bold text-sm">{price}</Text>}
          </div>
          {(address || phone) && (
            <div className="mt-2 text-[10px] text-gray-600 font-medium">
               {phone && <div className="flex items-center gap-1"><Icon icon="zi-call" size={10} /> {phone}</div>}
               {address && <div className="flex items-center gap-1 line-clamp-1"><Icon icon="zi-location" size={10} /> {address}</div>}
            </div>
          )}
        </div>
        <div className="w-1/2 relative">
           {theme === 'swin' && (
             <>
               <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://via.placeholder.com/200')] bg-cover"></div>
               <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1">
                  <Icon icon="zi-more-grid" className="text-blue-800" size={20} />
               </div>
             </>
           )}
           <div className="absolute bottom-3 right-3">
             <button 
               className="bg-yellow-500 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 active:bg-yellow-700 transition-colors"
               onClick={(e) => {
                 e.stopPropagation();
                 onBook && onBook();
               }}
             >
               {buttonText}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedPage: React.FC = () => {
  const navigate = useNavigate();
  const [showBookingType, setShowBookingType] = useState(false);
  const [selectedClub, setSelectedClub] = useState("");

  const handleBook = (clubName: string) => {
    setSelectedClub(clubName);
    setShowBookingType(true);
  };

  const navigateToBooking = (mode: string) => {
    setShowBookingType(false);
    if (mode === 'visual') {
      navigate("/booking/visual", { state: { clubName: selectedClub, mode: 'visual' } });
    } else {
      navigate("/booking", { state: { clubName: selectedClub, mode } });
    }
  };

  return (
    <Page className="bg-white pb-20">
      <div className="pt-4 px-4 pb-2">
        <Text.Title size="large" className="text-[#283b91] font-black italic uppercase text-2xl">
          NỔI BẬT
        </Text.Title>
      </div>

      <PromoCard 
        title="PICKLEBALL" 
        subtitle="QUẬN 10" 
        promoText="10%" 
        price="KHACH HÀNG THUÊ SÂN CỐ ĐỊNH"
        phone="093 8344 218"
        address="218A Đ. Thành Thái, Phường 15, Quận 10"
        imageColor="bg-[#283b91]"
        onBook={() => handleBook("SWIN Pickleball Quận 10")}
      />
      
      <div className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-lg relative h-48 bg-cover bg-center" 
           style={{backgroundImage: 'url("https://media.istockphoto.com/id/1366580970/photo/pickleball-court.jpg?s=612x612&w=0&k=20&c=L4Q_X3f3s_W-t-Xq_R-Z-q-X-X-X-X-X-X-X-X-X-X-X")'}}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
           <Text className="text-white font-bold text-lg">SÂN TRUNG TÂM</Text>
           <Text className="text-yellow-400 font-bold">DEAL SIÊU HOT CUỐI TUẦN</Text>
           <div className="flex justify-between items-end mt-2">
              <div className="bg-white/90 rounded-lg p-2 flex items-center gap-2">
                 <div className="bg-red-500 text-white text-[10px] font-bold px-1 rounded">FREE</div>
                 <div className="text-xs font-bold text-[#1a2b70]">BANH + VỢT</div>
              </div>
              <Button 
                size="small" 
                className="bg-yellow-500 text-white border-none font-bold"
                onClick={() => handleBook("Sân Trung Tâm")}
              >
                ĐẶT LỊCH NGAY
              </Button>
           </div>
        </div>
      </div>

      {/* Booking Type Modal */}
      <Modal
        visible={showBookingType}
        title="Chọn hình thức đặt"
        onClose={() => setShowBookingType(false)}
        actions={[]}
      >
        <div className="space-y-3 py-2">
          <div
            className="rounded-xl bg-[#eef2ff] px-4 py-3 flex items-center justify-between cursor-pointer border border-blue-100"
            onClick={() => navigateToBooking('visual')}
          >
            <div>
              <Text className="font-bold text-[#283b91]">Đặt lịch ngày trực quan</Text>
              <Text size="xSmall" className="text-gray-500">
                Đặt lịch ngày khi khách chơi nhiều khung giờ, nhiều sân.
              </Text>
            </div>
            <Icon icon="zi-arrow-right" className="text-[#283b91]" />
          </div>
          
          <div
            className="rounded-xl bg-[#ffe7f2] px-4 py-3 flex items-center justify-between cursor-pointer border border-pink-100 relative"
            onClick={() => navigateToBooking('event')}
          >
            <div>
              <Text className="font-bold text-pink-600">Đặt lịch sự kiện</Text>
              <Text size="xSmall" className="text-gray-500">
                Sự kiện giúp bạn chơi chung với người có cùng niềm đam mê.
              </Text>
            </div>
            <Icon icon="zi-arrow-right" className="text-pink-600" />
            <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              NEW
            </div>
          </div>
        </div>
      </Modal>
    </Page>
  );
};

export default FeaturedPage;
