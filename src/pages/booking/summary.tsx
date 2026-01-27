import React from "react";
import { Page, Header, Box, Text, Button, Icon, useNavigate, useLocation } from "zmp-ui";

interface BookingSummaryState {
  clubName: string;
  date: string;
  slots: { court: string; time: string; price: number }[];
  mode: string;
  total: number;
}

const BookingSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as any)?.summary as BookingSummaryState | undefined;

  if (!state) {
    navigate(-1);
    return null;
  }

  const { clubName, date, slots, mode, total } = state;

  const title =
    mode === "daily"
      ? "Đặt lịch theo ngày"
      : mode === "fixed"
      ? "Đặt lịch cố định"
      : mode === "visual"
      ? "Đặt lịch ngày trực quan"
      : "Đặt lịch sự kiện";

  return (
    <Page className="bg-[#004f3a] min-h-full pb-24">
      <Header title={title} className="bg-[#004f3a] text-white" textColor="white" />

      <Box className="p-4 space-y-4">
        <div className="bg-[#0b5f43] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="zi-info-circle" />
            <Text className="font-bold">Thông tin sân</Text>
          </div>
          <Text className="text-sm font-medium mb-1">Tên CLB: {clubName}</Text>
          <Text size="xSmall" className="opacity-80">
            Ngày chơi: {date}
          </Text>
        </div>

        <div className="bg-[#0b5f43] rounded-2xl p-4 text-white space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Icon icon="zi-calendar" />
            <Text className="font-bold">Thông tin lịch đặt</Text>
          </div>
          {slots.map((slot, index) => (
            <div key={index} className="flex justify-between text-sm">
              <Text>
                {slot.court} | {slot.time}
              </Text>
              <Text>{slot.price.toLocaleString("vi-VN")}đ</Text>
            </div>
          ))}
          <div className="mt-2 text-sm">
            <Text>Đối tượng: KHÁCH HÀNG BÌNH THƯỜNG</Text>
            <Text>
              Tổng giờ: <Text className="font-bold">{slots.length}h00</Text>
            </Text>
          </div>
        </div>

        <div className="bg-[#0b5f43] rounded-2xl p-4 text-white space-y-3">
          <Text className="font-bold">Thanh toán</Text>
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-yellow-500 text-black font-bold"
              size="small"
              onClick={() => navigate("/login")}
            >
              ĐĂNG NHẬP
            </Button>
            <Button
              className="flex-1 bg-white text-[#0E6F4E] font-bold"
              size="small"
              onClick={() => navigate("/register")}
            >
              ĐĂNG KÝ
            </Button>
          </div>
          <div className="mt-2">
            <Text size="small">Số tiền cần thanh toán</Text>
            <Text.Title className="text-yellow-300">
              {total.toLocaleString("vi-VN")}đ
            </Text.Title>
          </div>
        </div>

        <div className="bg-[#0b5f43] rounded-2xl p-4 text-white space-y-3">
          <Text className="font-bold">Thông tin người đặt</Text>
          <div>
            <Text size="xSmall" className="mb-1 block">
              Tên của bạn
            </Text>
            <input
              className="w-full rounded-lg px-3 py-2 text-sm text-black"
              placeholder="Nhập tên của bạn"
            />
          </div>
          <div>
            <Text size="xSmall" className="mb-1 block">
              Số điện thoại
            </Text>
            <div className="flex items-center border rounded-lg bg-white">
              <div className="flex items-center px-2 border-r">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                  alt="VN"
                  className="w-4 h-4 mr-1"
                />
                <Text size="xSmall" className="text-gray-700">
                  +84
                </Text>
              </div>
              <input
                className="flex-1 px-2 py-2 text-sm outline-none"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>
        </div>
      </Box>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#004f3a]">
        <Button
          fullWidth
          className="bg-yellow-500 text-black font-bold rounded-lg py-3"
          onClick={() => navigate(-1)}
        >
          XÁC NHẬN & THANH TOÁN
        </Button>
      </div>
    </Page>
  );
};

export default BookingSummaryPage;

