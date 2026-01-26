import React from "react";
import { Page, Text, Icon, Button, Box, useNavigate } from "zmp-ui";

interface PromoCardProps {
  title: string;
  subtitle: string;
  promoText: string;
  price?: string;
  address?: string;
  phone?: string;
  imageColor: string; // fallback color since we don't have real images
  buttonText?: string;
  theme?: 'swin' | 'coco' | 'yellow';
}

const PromoCard: React.FC<PromoCardProps> = ({ 
  title, subtitle, promoText, price, address, phone, imageColor, buttonText = "ĐẶT LỊCH NGAY", theme = 'swin'
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-lg relative bg-white active:scale-95 transition-transform duration-200 ease-in-out cursor-pointer"
      onClick={() => console.log('Card clicked')}
    >
      {/* Background & Layout */}
      <div className={`h-48 relative ${imageColor} flex`}>
        {/* Left Content (Info) */}
        <div className="w-1/2 p-3 flex flex-col justify-center relative z-10 bg-white/90" 
             style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'}}>
          
          {/* Logo/Title */}
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

          {/* Promo Highlight */}
          <div className="mt-1">
            <Text className="text-blue-900 font-bold text-xs uppercase opacity-80">Ưu đãi</Text>
            <Text className="text-red-600 font-black text-3xl leading-none">{promoText}</Text>
            {price && <Text className="text-red-600 font-bold text-sm">{price}</Text>}
          </div>

          {/* Contact Info */}
          {(address || phone) && (
            <div className="mt-2 text-[10px] text-gray-600 font-medium">
               {phone && <div className="flex items-center gap-1"><Icon icon="zi-call" size={10} /> {phone}</div>}
               {address && <div className="flex items-center gap-1 line-clamp-1"><Icon icon="zi-location" size={10} /> {address}</div>}
            </div>
          )}
        </div>

        {/* Right Content (Image Placeholder & Button) */}
        <div className="w-1/2 relative">
           {/* Decorative elements to mimic the screenshot */}
           {theme === 'swin' && (
             <>
               <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://via.placeholder.com/200')] bg-cover"></div>
               <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1">
                  <Icon icon="zi-more-grid" className="text-blue-800" size={20} />
               </div>
             </>
           )}
           
           {/* Button */}
           <div className="absolute bottom-3 right-3">
             <button 
               className="bg-yellow-500 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 active:bg-yellow-700 transition-colors"
               onClick={(e) => {
                 e.stopPropagation();
                 console.log('Book clicked');
               }}
             >
               {buttonText}
             </button>
           </div>
        </div>
      </div>
      
      {/* Pagination Dots Simulator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
      </div>
    </div>
  );
};

const CocoCard = () => (
  <div className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-lg relative h-48 bg-cover bg-center active:scale-95 transition-transform duration-200" 
       style={{backgroundImage: 'url("https://images.unsplash.com/photo-1626248560064-a692a549090b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60")'}}>
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
    
    <div className="absolute top-0 left-0 bg-orange-500 text-white px-3 py-1 rounded-br-xl font-bold text-sm z-10">
       Gió mùa về ✦<br/>Ưu đãi giờ vàng
    </div>

    <div className="absolute bottom-0 left-0 p-4 z-10 w-full flex justify-between items-end">
       <div>
         <div className="text-white text-xs opacity-90">Giá sân chỉ từ</div>
         <div className="text-orange-400 font-black text-4xl">140K</div>
       </div>
       <button className="bg-yellow-500 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-md mb-1">
         ĐẶT LỊCH NGAY
       </button>
    </div>

    <div className="absolute top-4 right-4 text-white font-serif italic font-bold text-xl drop-shadow-md">
      Coco <span className="text-xs not-italic font-sans block text-right">PICKLECLUB</span>
    </div>
  </div>
);

const CenterCard = () => (
  <div className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-lg relative h-40 bg-yellow-400 flex active:scale-95 transition-transform duration-200">
     <div className="w-1/2 p-4 flex flex-col justify-center bg-white" style={{clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'}}>
        <div className="flex items-center gap-1 mb-1">
          <div className="bg-black text-yellow-400 text-[10px] font-bold px-1 rounded">Gw</div>
          <Text className="font-bold text-xs">Pickleball</Text>
        </div>
        <Text className="font-black text-lg text-yellow-600 leading-tight uppercase">SÂN TRUNG TÂM</Text>
        <Text className="font-bold text-xs text-red-500 uppercase">DEAL SIÊU HOT CUỐI TUẦN</Text>
        
        <div className="mt-2 flex items-end gap-1">
           <div className="bg-blue-600 text-white text-[10px] font-bold px-1 py-0.5 rounded">FREE</div>
           <Text className="text-[10px] font-bold">BANH + VỢT</Text>
        </div>
        <div className="mt-1">
           <Text className="text-[10px]">CHỈ TỪ</Text>
           <Text className="text-green-600 font-black text-2xl leading-none">60<span className="text-sm align-top">K</span></Text>
        </div>
     </div>
     <div className="w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
             className="w-full h-full object-cover" alt="court" />
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-yellow-400 rounded-tl-full"></div>
     </div>
  </div>
);

const FeaturedPage: React.FC = () => {
  return (
    <Page className="bg-gray-100 pb-20 pt-2 h-full overflow-y-auto">
       <PromoCard 
         title="PICKLEBALL" 
         subtitle="QUẬN 10" 
         promoText="10%" 
         price="KHÁCH HÀNG THUÊ SÂN CỐ ĐỊNH"
         phone="093 8344 218"
         address="218A Đ. Thành Thái, Phường 15, Quận 10"
         imageColor="bg-gradient-to-r from-blue-900 to-blue-600"
       />

       <PromoCard 
         title="PICKLEBALL" 
         subtitle="HÀ NỘI" 
         promoText="100K" 
         price="/GIỜ"
         phone="076 4321 666"
         address="214 NGUYỄN XIỂN - THANH XUÂN - HÀ NỘI"
         imageColor="bg-gradient-to-r from-blue-800 to-red-600"
       />

       <CocoCard />
       
       <CenterCard />
    </Page>
  );
};

export default FeaturedPage;
