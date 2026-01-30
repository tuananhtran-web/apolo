import React, { useState } from "react";
import { Page, Header, Box, Text, Button, Icon, useNavigate, useLocation, useSnackbar } from "zmp-ui";

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openSnackbar } = useSnackbar();
  const state = (location.state as any) || {};
  const { booking, paymentMethod, grandTotal, userInfo } = state;

  const [isExpanded, setIsExpanded] = useState(true);

  if (!booking) {
    return (
      <Page>
        <Header title="Thanh toán" className="bg-[#283b91] text-white" textColor="white" />
        <Box className="p-4 flex items-center justify-center h-full">
          <Text>Không có thông tin thanh toán</Text>
        </Box>
      </Page>
    );
  }

  const bankInfo = {
    bankName: "ACB",
    accountName: "NGUYEN NHAT ANH",
    accountNumber: "3693691818",
  };

  const qrUrl = `https://img.vietqr.io/image/${bankInfo.bankName}-${bankInfo.accountNumber}-compact.png?amount=${grandTotal || 0}&addInfo=${encodeURIComponent((userInfo?.name || 'Khach') + ' chuyen tien')}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    openSnackbar({
      text: "Đã sao chép vào bộ nhớ tạm",
      type: "success",
      duration: 2000,
    });
  };

  const handleConfirm = () => {
    openSnackbar({
        text: "Đã xác nhận thanh toán. Vui lòng chờ xác nhận từ chủ sân.",
        type: "success",
        duration: 3000,
    });
    setTimeout(() => {
        navigate("/");
    }, 2000);
  };

  return (
    <Page className="bg-gray-100 min-h-full pb-24">
      <Header title="Thanh toán" className="bg-[#283b91] text-white" textColor="white" />
      
      <div className="p-4 space-y-4">
        {/* Booking Info Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Text.Title size="small">Thông tin lịch đặt</Text.Title>
            <Icon icon={isExpanded ? "zi-chevron-up" : "zi-chevron-down"} />
          </div>
          
          {isExpanded && (
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Icon icon="zi-user" className="text-green-600" size={16} />
                </div>
                <div>
                  <Text size="xSmall" className="text-gray-500">Tên</Text>
                  <Text className="font-medium">{userInfo?.name || "Khách hàng"}</Text>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Icon icon="zi-call" className="text-green-600" size={16} />
                </div>
                <div>
                  <Text size="xSmall" className="text-gray-500">SĐT</Text>
                  <Text className="font-medium">{userInfo?.phone || "Chưa cung cấp"}</Text>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Icon icon="zi-note" className="text-green-600" size={16} />
                </div>
                <div>
                   <Text size="xSmall" className="text-gray-500">Mã đơn</Text>
                   <Text className="font-bold">#5457</Text>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Icon icon="zi-calendar" className="text-green-600" size={16} />
                </div>
                <div>
                  <Text size="xSmall" className="text-gray-500">Chi tiết đơn</Text>
                  <Text className="font-medium">{new Date().toLocaleDateString('vi-VN')}</Text>
                  <Text size="small" className="text-gray-600">
                    {booking.mode === 'visual' ? `Đặt trực quan - ${booking.clubName}` : `Đặt theo ngày - ${booking.clubName}`}
                  </Text>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Icon icon="zi-dollar" className="text-green-600" size={16} />
                </div>
                <div>
                  <Text size="xSmall" className="text-gray-500">Tổng đơn</Text>
                  <Text className="font-bold">{grandTotal?.toLocaleString('vi-VN')} đ</Text>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                   <Icon icon="zi-wallet" className="text-green-600" size={16} />
                </div>
                <div>
                   <Text size="xSmall" className="text-gray-500">Cần thanh toán</Text>
                   <Text className="font-bold text-[#283b91]">{grandTotal?.toLocaleString('vi-VN')} đ</Text>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Method Section */}
        {paymentMethod === 'transfer' ? (
            <div className="bg-white rounded-xl shadow-sm p-4">
                <Text.Title size="small" className="mb-3">1. Tài khoản ngân hàng</Text.Title>
                <div className="flex gap-2">
                    <div className="flex-1 space-y-2">
                        <div>
                            <Text size="xSmall" className="text-gray-500">Tên tài khoản:</Text>
                            <Text className="font-bold uppercase text-sm">{bankInfo.accountName}</Text>
                        </div>
                        <div>
                            <Text size="xSmall" className="text-gray-500">Số tài khoản:</Text>
                            <div className="flex items-center gap-2">
                                <Text className="font-bold text-lg text-[#283b91]">{bankInfo.accountNumber}</Text>
                                <Icon 
                                    icon="zi-copy" 
                                    className="text-gray-400 cursor-pointer" 
                                    onClick={() => handleCopy(bankInfo.accountNumber)}
                                />
                            </div>
                        </div>
                        <div>
                            <Text size="xSmall" className="text-gray-500">Ngân hàng:</Text>
                            <Text className="font-bold">{bankInfo.bankName}</Text>
                        </div>
                    </div>
                    <div className="w-32 shrink-0">
                        <img 
                            src={qrUrl} 
                            alt="VietQR" 
                            className="w-full h-auto rounded-lg border border-gray-200"
                        />
                    </div>
                </div>
            </div>
        ) : (
            <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Icon icon="zi-check" className="text-green-600 text-3xl" />
                 </div>
                 <Text.Title className="text-green-600 mb-2">Thanh toán tại quầy</Text.Title>
                 <Text className="text-gray-600 text-sm">
                    Vui lòng thanh toán <b>{grandTotal?.toLocaleString('vi-VN')} đ</b> tại quầy thu ngân khi đến nhận sân.
                 </Text>
            </div>
        )}

        {/* Warning/Instruction Box */}
        {paymentMethod === 'transfer' && (
            <div className="bg-green-500 text-white p-3 rounded-xl flex items-start gap-2">
                <Icon icon="zi-warning-solid" className="text-yellow-300 mt-0.5" />
                <Text size="small" className="flex-1">
                    Vui lòng chuyển khoản <b>{grandTotal?.toLocaleString('vi-VN')} đ</b> và chụp màn hình xác nhận thanh toán để hoàn tất đặt lịch!
                </Text>
            </div>
        )}

        {/* Info Note */}
        <div className="bg-blue-50 p-4 rounded-xl text-center">
            <Text size="small" className="text-gray-600">
                Sau khi gửi ảnh (nếu chuyển khoản), vui lòng kiểm tra trạng thái lịch đặt tại tab "Tài khoản" tới khi chủ sân xác nhận đơn.
            </Text>
            <Text size="small" className="text-gray-500 mt-2 italic">
                Đơn của bạn còn được giữ chỗ trong 15:00
            </Text>
        </div>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-50">
        <Button 
            fullWidth 
            className="bg-[#d32829] text-white font-bold rounded-lg h-12 text-lg"
            onClick={handleConfirm}
        >
            XÁC NHẬN ĐẶT
        </Button>
      </div>
    </Page>
  );
};

export default PaymentPage;