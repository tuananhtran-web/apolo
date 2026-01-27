import React, { useState, useRef } from "react";
import { Page, Text, Icon, useNavigate, useSnackbar } from "zmp-ui";
import { ClubCard } from "../components/club-card";
import { Club, clubs } from "../mock/data";
import { ClubDetailSheet } from "../components/club-detail-sheet";
import { useLocation } from "react-router-dom";

const categories = [
  { id: "1", name: "Pickleball", icon: "zi-more-grid", color: "text-blue-500", bg: "bg-blue-50" },
  { id: "2", name: "Cầu lông", icon: "zi-more-grid", color: "text-green-500", bg: "bg-green-50" },
  { id: "3", name: "Bóng đá", icon: "zi-more-grid", color: "text-green-600", bg: "bg-green-50" },
  { id: "4", name: "Tennis", icon: "zi-more-grid", color: "text-orange-500", bg: "bg-orange-50" },
  { id: "5", name: "B.Chuyền", icon: "zi-more-grid", color: "text-yellow-500", bg: "bg-yellow-50" },
  { id: "6", name: "Bóng rổ", icon: "zi-more-grid", color: "text-red-500", bg: "bg-red-50" },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const location = useLocation();
  const [activePill, setActivePill] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const headerClickCount = useRef(0);
  const headerClickTimer = useRef<NodeJS.Timeout | null>(null);

  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleClubClick = (club: Club) => {
    setSelectedClub(club);
    setIsSheetVisible(true);
  };

  const handleCategoryClick = (id: string) => {
    const next = selectedCategory === id ? null : id;
    setSelectedCategory(next);
    setActivePill(null);
    navigate("/search", {
      state: {
        preset: {
          categoryId: next,
        },
      },
    });
  };

  const handlePillClick = (pill: string) => {
    const next = activePill === pill ? null : pill;
    setActivePill(next);
    setSelectedCategory(null);
    navigate("/search", {
      state: {
        preset: {
          keyword: next,
        },
      },
    });
  };

  const advancedFilters = (location.state as any)?.advancedSearch;

  const filteredClubs = clubs.filter(club => {
    // 1. Search Keyword Filter
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      if (!club.name.toLowerCase().includes(keyword) && !club.address.toLowerCase().includes(keyword)) {
        return false;
      }
    }

    // 2. Category Filter (Home & nâng cao)
    if (selectedCategory && club.categoryId !== selectedCategory) {
      return false;
    }

    if (advancedFilters?.selectedSports && advancedFilters.selectedSports.length > 0) {
      if (!advancedFilters.selectedSports.includes(club.categoryId)) {
        return false;
      }
    }

    // 3. Quick Filter Pills
    if (activePill) {
      if (activePill === 'Cầu lông gần tôi') {
        if (club.categoryId !== '2' && !club.name.toLowerCase().includes('cầu lông')) return false;
      } else if (activePill === 'Pickleball gần tôi') {
         if (club.categoryId !== '1' && !club.name.toLowerCase().includes('pickleball')) return false;
      } else if (activePill === 'Xé vé gần tôi') {
        if (club.type !== 'event' && !club.tags?.includes('Sự kiện')) return false;
      }
    }

    if (advancedFilters?.keywords && advancedFilters.keywords.length > 0) {
      const hasKeyword = advancedFilters.keywords.some((kw: string) => {
        if (kw === "Cầu lông gần tôi") {
          return club.categoryId === "2" || club.name.toLowerCase().includes("cầu lông");
        }
        if (kw === "Pickleball gần tôi") {
          return club.categoryId === "1" || club.name.toLowerCase().includes("pickleball");
        }
        if (kw === "Xé vé gần tôi") {
          return club.type === "event" || club.tags?.includes("Sự kiện");
        }
        return false;
      });
      if (!hasKeyword) return false;
    }

    if (advancedFilters?.bookingType) {
      if (advancedFilters.bookingType === "daily" && club.type !== "daily") return false;
      if (advancedFilters.bookingType === "event" && club.type !== "event") return false;
    }

    if (advancedFilters?.distance && advancedFilters.distance > 0) {
      const numericDistance = parseFloat(club.distance);
      if (!Number.isNaN(numericDistance) && numericDistance > advancedFilters.distance) {
        return false;
      }
    }

    return true;
  });

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
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </button>
              <button 
                className="bg-transparent border border-white text-white font-bold text-xs py-1.5 px-4 rounded-lg active:bg-white/10 active:scale-95 transition-all duration-200"
                onClick={() => navigate('/register')}
              >
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
              <Icon 
                icon="zi-qrline" 
                className="text-gray-600 ml-2 cursor-pointer active:text-[#0E6F4E]" 
                onClick={() => navigate('/qr-scanner')}
              />
              <Icon icon="zi-search" className="text-[#0E6F4E] ml-3" size={24} />
           </div>
           <div className="w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#0E6F4E] active:scale-95 transition-transform" onClick={() => openSnackbar({ text: "Chức năng Yêu thích đang phát triển", type: "info" })}>
             <Icon icon="zi-heart" />
          </div>
       </div>

       {/* Quick Filter Pills */}
       <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
          {['Cầu lông gần tôi', 'Pickleball gần tôi', 'Xé vé gần tôi'].map((pill, idx) => (
            <div 
              key={idx}
              className={`whitespace-nowrap px-4 py-2 rounded-lg font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer border ${activePill === pill ? 'bg-[#0E6F4E] text-white border-[#0E6F4E]' : 'bg-white text-gray-600 border-gray-100'}`}
              onClick={() => handlePillClick(pill)}
            >
              {pill}
            </div>
          ))}
       </div>

       {/* Categories */}
       <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <div className="flex justify-between gap-4 overflow-x-auto no-scrollbar">
             {categories.map((cat) => (
               <div 
                 key={cat.id} 
                 className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer active:scale-95 transition-transform duration-200"
                 onClick={() => handleCategoryClick(cat.id)}
               >
                  <div className={`w-12 h-12 rounded-full ${cat.bg} flex items-center justify-center shadow-sm border ${selectedCategory === cat.id ? 'border-[#0E6F4E] border-2' : 'border-gray-100'}`}>
                     <Icon icon={cat.icon} className={cat.color} size={24} />
                  </div>
                  <Text size="xxSmall" className={`font-medium ${selectedCategory === cat.id ? 'text-[#0E6F4E] font-bold' : 'text-gray-600'}`}>{cat.name}</Text>
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
          <Icon
            icon="zi-tune"
            className="text-[#0E6F4E]"
            size={24}
            onClick={() => navigate("/search")}
          />
       </div>

       {/* Club List */}
       <div>
          {filteredClubs.length > 0 ? (
            filteredClubs.map(club => (
              <ClubCard 
                key={club.id} 
                club={club} 
                onClick={handleClubClick}
              />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <Text>Không tìm thấy kết quả nào</Text>
            </div>
          )}
       </div>

      </div>

      <ClubDetailSheet 
        club={selectedClub}
        visible={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
      />
    </Page>
  );
};

export default HomePage;
