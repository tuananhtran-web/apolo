import React from "react";
import { Page, Text, Icon, Button, Box, useNavigate } from "zmp-ui";

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const MenuItem = ({ icon, title, subtitle, onClick, isNew }: { icon: string, title: string, subtitle?: string, onClick?: () => void, isNew?: boolean }) => (
    <div 
      className="bg-white p-4 flex items-center justify-between border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon icon={icon} className="text-green-600" size={24} />
        <div>
           <Text className="text-gray-700 font-medium text-base">{title}</Text>
           {subtitle && <Text className="text-gray-400 text-xs">{subtitle}</Text>}
        </div>
        {isNew && (
           <div className="bg-green-100 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded ml-2">NEW</div>
        )}
      </div>
      <Icon icon="zi-chevron-right" className="text-gray-300" size={20} />
    </div>
  );

  return (
    <Page className="bg-gray-50 h-full pb-20">
      {/* Green Header Background */}
      <div className="bg-green-600 h-40 relative">
        {/* Decorative curves could go here */}
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-24 relative z-10 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-lg flex flex-col gap-4">
          
          <div className="flex gap-4">
            {/* Logo */}
            <div className="w-16 h-16 rounded-full bg-green-800 flex items-center justify-center flex-shrink-0 border-4 border-green-50">
               <Icon icon="zi-user-solid" className="text-green-400" size={32} />
               {/* Simulating the 'A' logo */}
               <div className="absolute font-black text-white text-3xl opacity-20">A</div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1">
               <Text.Title className="font-bold text-lg leading-tight mb-1">Total Club Management - VJD</Text.Title>
               <Text className="text-yellow-500 text-sm font-medium">Tạo tài khoản để nhận nhiều ưu đãi hơn</Text>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-1">
             <Button 
               className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-lg py-2"
               size="medium"
               onClick={() => navigate('/pages/login')}
             >
               Đăng nhập
             </Button>
             <button 
               className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg py-2 active:bg-gray-50 transition-colors"
               onClick={() => console.log('Register')}
             >
               Đăng kí
             </button>
          </div>

        </div>
      </div>

      {/* Activity Section */}
      <div className="px-4 mb-6">
        <Text.Title className="text-green-700 font-bold mb-2 ml-1">Hoạt động</Text.Title>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
           <MenuItem 
             icon="zi-calendar" 
             title="Danh sách lịch đã đặt" 
             onClick={() => console.log('History')} 
           />
        </div>
      </div>

      {/* System Section */}
      <div className="px-4 mb-6">
        <Text.Title className="text-green-700 font-bold mb-2 ml-1">Hệ thống</Text.Title>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
           <MenuItem 
             icon="zi-info-circle" 
             title="Thông tin phiên bản: 2.8.5" 
           />
           <MenuItem 
             icon="zi-shield-solid" 
             title="Điều khoản và chính sách" 
           />
           <MenuItem 
             icon="zi-star" 
             title="Ứng dụng có gì mới" 
             isNew
           />
           <MenuItem 
             icon="zi-globe" 
             title="Ngôn ngữ - Tiếng Việt" 
           />
        </div>
      </div>

    </Page>
  );
};

export default UserProfilePage;
