import React, { useState, useRef } from "react";
import { Page, Text, Icon, useNavigate } from "zmp-ui";
import { ClubCard, Club } from "../components/club-card";
import { FilterSheet, FilterState } from "../components/filter-sheet";

const categories = [
  { id: "1", name: "Pickleball", icon: "zi-more-grid", color: "text-blue-500", bg: "bg-blue-50" },
  { id: "2", name: "Cầu lông", icon: "zi-more-grid", color: "text-green-500", bg: "bg-green-50" },
  { id: "3", name: "Bóng đá", icon: "zi-more-grid", color: "text-green-600", bg: "bg-green-50" },
  { id: "4", name: "Tennis", icon: "zi-more-grid", color: "text-orange-500", bg: "bg-orange-50" },
  { id: "5", name: "B.Chuyền", icon: "zi-more-grid", color: "text-yellow-500", bg: "bg-yellow-50" },
  { id: "6", name: "Bóng rổ", icon: "zi-more-grid", color: "text-red-500", bg: "bg-red-50" },
];

const allClubs: Club[] = [
  {
    id: "1",
    name: "The Dropshot",
    image: "https://images.unsplash.com/photo-1626248560064-a692a549090b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    rating: 4.3,
    distance: "171.9m",
    openTime: "05:00 - 22:00",
    address: "117 Liên Phường, P. Phước Long B, TP. Thủ Đức, TP. HCM",
    type: "daily",
    categoryId: "1",
    tags: ["Đơn ngày", "Sự kiện"]
  },
  {
    id: "2",
    name: "Q9 Sport Park",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    distance: "251.6m",
    openTime: "05:00 - 24:00",
    address: "31A Liên Phường, Phước Long, TP. HCM",
    type: "daily",
    categoryId: "2",
    tags: ["Đơn ngày", "Sự kiện"]
  },
  {
    id: "3",
    name: "Sân Bóng Đá Chảo Lửa",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
    distance: "1.2km",
    openTime: "05:00 - 23:00",
    address: "30 Phan Thúc Duyện, Tân Bình",
    type: "daily",
    categoryId: "3"
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activePill, setActivePill] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const headerClickCount = useRef(0);
  const headerClickTimer = useRef<NodeJS.Timeout | null>(null);

  // Hidden admin login trigger
  const handleLogoClick = () => {
    headerClickCount.current += 1;
    if (headerClickCount.current === 1) {
      headerClickTimer.current = setTimeout(() => {
        headerClickCount.current = 0;
      }, 10000);
    } else if (headerClickCount.current === 5) {
      if (headerClickTimer.current) clearTimeout(headerClickTimer.current);
      headerClickCount.current = 0;
      navigate('/admin-login');
    }
  };

  return (
    <Page className="bg-gray-100 pb-20 relative overflow-y-auto h-full">
      {/* Custom Header Background */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0E6F4E] to-[#158f66] rounded-b-[30px] z-0 overflow-hidden">
         {/* Decorative circles */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
         <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-10 -mb-5"></div>
         {/* Sport icons pattern opacity */}
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/sporty-pattern.png')]"></div>
      </div>

      <div className="relative z-10 px-4 pt-4">
        {/* Top Header Row */}
        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-3" onClick={handleLogoClick}>
              <div className="w-10 h-10 rounded-full bg-[#1e8e66] border-2 border-[#4dcfa1] flex items-center justify-center shadow-lg">
                 <Icon icon="zi-home" className="text-white" />
                 <div className="absolute font-black text-[#2e9e76] text-3xl opacity-50 transform rotate-12">A</div>
              </div>
              <div className="text-white">
                 <Text size="xSmall" className="opacity-90 font-bold">Total Club Management - VJD</Text>
                 {/* Empty space for potential username or greeting */}
              </div>
           </div>
           <div className="flex gap-2">
              <button 
                className="bg-white text-[#0E6F4E] font-bold text-xs py-1.5 px-4 rounded-lg shadow-md active:bg-gray-100 active:scale-95 transition-all duration-200"
                onClick={() => navigate('/pages/login')}
              >
                Đăng nhập
              </button>
              <button className="bg-transparent border border-white text-white font-bold text-xs py-1.5 px-4 rounded-lg active:bg-white/10 active:scale-95 transition-all duration-200">
                Đăng kí
              </button>
           </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2 mb-4">
           <div className="flex-1 bg-white rounded-xl shadow-lg flex items-center px-3 py-2.5">
              <Icon icon="zi-search" className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Tìm kiếm" 
                className="flex-1 outline-none text-sm bg-transparent"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <Icon icon="zi-qrline" className="text-gray-600 ml-2" />
              <Icon icon="zi-search" className="text-[#0E6F4E] ml-3" size={24} />
           </div>
           <div className="w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#0E6F4E] active:scale-95 transition-transform">
              <Icon icon="zi-heart" />
           </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
           {['Cầu lông gần tôi', 'Pickleball gần tôi', 'Xé vé gần tôi'].map((pill, idx) => (
             <div 
               key={idx}
               className={`whitespace-nowrap px-4 py-2 rounded-lg font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer border ${activePill === pill ? 'bg-[#0E6F4E] text-white border-[#0E6F4E]' : 'bg-white text-gray-600 border-gray-100'}`}
               onClick={() => setActivePill(activePill === pill ? null : pill)}
             >
               {pill}
             </div>
           ))}
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
           <div className="flex justify-between gap-4 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <div key={cat.id} className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer active:scale-95 transition-transform duration-200">
                   <div className={`w-12 h-12 rounded-full ${cat.bg} flex items-center justify-center shadow-sm border border-gray-100`}>
                      <Icon icon={cat.icon} className={cat.color} size={24} />
                   </div>
                   <Text size="xxSmall" className="font-medium text-gray-600">{cat.name}</Text>
                </div>
              ))}
           </div>
        </div>

        {/* Section Title */}
        <div className="flex justify-between items-center mb-3 px-1">
           <div className="flex items-center gap-2">
              <Icon icon="zi-globe" className="text-orange-500" />
              <Text.Title size="small" className="font-bold text-red-600">Tìm sân trống, sự kiện xé vé, ghép đội</Text.Title>
           </div>
           <Icon icon="zi-tune" className="text-[#0E6F4E]" size={24} />
        </div>

        {/* Club List */}
        <div>
           {allClubs.map(club => (
             <ClubCard key={club.id} club={club} />
           ))}
        </div>

      </div>
    </Page>
  );
};

export default HomePage;
