import React from "react";
import { Page, Header, Box, Text, Button, Icon, useNavigate, useLocation } from "zmp-ui";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as any) || {};
  const { booking, paymentMethod, grandTotal, userInfo } = state;

  if (!booking) {
    return <Page><Text>Không có thông tin thanh toán</Text></Page>;
  }

  return (
    <Page className="bg-white min-h-full">
      <Header title="Thanh toán" className="bg-[#283b91] text-white" textColor="white" />
      
      <Box className="p-4 flex flex-col items-center justify-center min-h-[80vh]">
        {paymentMethod === 'transfer' ? (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Icon icon="zi-poll" className="text-[#283b91] text-3xl" />
            </div>
            <Text.Title className="text-[#283b91] mb-2 text-center">Thông tin chuyển khoản</Text.Title>
            <Text className="text-center text-gray-500 mb-6">
              Vui lòng quét mã QR bên dưới để hoàn tất thanh toán
            </Text>
            
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 mb-6">
               <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  {/* Placeholder for QR Code */}
                  <div className="text-center">
                    <Icon icon="zi-qrline" size={48} className="text-gray-400 mb-2" />
                    <Text className="text-gray-500 text-xs">Mã QR VietQR</Text>
                  </div>
               </div>
               <div className="text-center space-y-1">
                 <Text className="font-bold text-lg">{grandTotal?.toLocaleString('vi-VN')} đ</Text>
                 <Text className="text-sm text-gray-600">Nội dung: {userInfo?.name} - {userInfo?.phone}</Text>
               </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Icon icon="zi-check-circle-solid" className="text-green-600 text-5xl" />
            </div>
            <Text.Title className="text-green-600 mb-2 text-center text-xl">Đặt lịch thành công!</Text.Title>
            <Text className="text-center text-gray-500 mb-8 max-w-xs">
              Cảm ơn <b>{userInfo?.name}</b>. Vui lòng đến quầy thu ngân để thanh toán tiền mặt khi nhận sân.
            </Text>
            
            <div className="w-full bg-gray-50 p-4 rounded-xl mb-6">
               <div className="flex justify-between mb-2">
                 <Text className="text-gray-500">Mã đặt sân</Text>
                 <Text className="font-bold">#BK{Math.floor(Math.random() * 10000)}</Text>
               </div>
               <div className="flex justify-between mb-2">
                 <Text className="text-gray-500">Tổng tiền</Text>
                 <Text className="font-bold text-[#d32829]">{grandTotal?.toLocaleString('vi-VN')} đ</Text>
               </div>
            </div>
          </>
        )}

        <Button 
          fullWidth
          className="bg-[#283b91] text-white font-bold rounded-xl"
          onClick={() => navigate('/')}
        >
          Về trang chủ
        </Button>
      </Box>
    </Page>
  );
};

export default PaymentPage;
