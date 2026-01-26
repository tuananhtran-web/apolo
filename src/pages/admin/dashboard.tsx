import React from "react";
import { Page, Header, Box, Text, Icon, useNavigate } from "zmp-ui";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Quản lý thành viên",
      icon: "zi-user-group",
      color: "bg-blue-500",
      path: "/pages/admin/user-list",
      desc: "Xem, sửa, xóa, cộng ngày"
    },
    {
      title: "Quản lý gói tập",
      icon: "zi-list-1",
      color: "bg-green-500",
      path: "/pages/admin/packages/list",
      desc: "Thêm gói, chỉnh sửa giá"
    },
    // Future modules
    {
      "title": "Báo cáo doanh thu",
      "icon": "zi-poll",
      "color": "bg-orange-500",
      "path": "/pages/admin/revenue/index",
      "desc": "Thống kê thu chi"
    },
    {
      "title": "Gửi thông báo",
      "icon": "zi-notif",
      "color": "bg-purple-500",
      "path": "/pages/admin/notifications/send",
      "desc": "Gửi tin nhắn cho user"
    }
  ];

  return (
    <Page className="bg-gray-50">
      <Header title="Admin Dashboard" showBackIcon={false} />
      
      <Box className="p-4">
        <Text.Title className="mb-4 font-bold text-gray-700">Chức năng quản trị</Text.Title>
        
        <div className="grid grid-cols-1 gap-4">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              onClick={() => navigate(item.path)}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 active:scale-95 transition-transform"
            >
              <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white`}>
                <Icon icon={item.icon} size={24} />
              </div>
              <div className="flex-1">
                <Text.Title size="small" className="font-bold">{item.title}</Text.Title>
                <Text size="xxSmall" className="text-gray-500">{item.desc}</Text>
              </div>
              <Icon icon="zi-chevron-right" className="text-gray-300" />
            </div>
          ))}
        </div>
      </Box>
    </Page>
  );
};

export default AdminDashboard;
