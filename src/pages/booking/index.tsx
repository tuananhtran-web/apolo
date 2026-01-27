import React, { useEffect, useState } from "react";
import { Page, Header, Box, Text, Button, Icon, DatePicker, Select, useSnackbar, Modal } from "zmp-ui";
import { TimeSlot, getAvailableSlots, createBooking, BookingType } from "../../services/booking-service";
import { useNavigate, useLocation } from "react-router-dom";

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openSnackbar } = useSnackbar();
  
  const mode = (location.state as any)?.mode || "daily";

  // State
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookingType, setBookingType] = useState<BookingType>('single');
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const clubName = (location.state as any)?.clubName || "Sân cầu lông Apolo";

  useEffect(() => {
    loadSlots();
  }, [date]);

  const loadSlots = async () => {
    setLoading(true);
    try {
      const data = await getAvailableSlots(date.toISOString(), "court-1");
      setSlots(data);
      setSelectedSlots([]); // Reset selection on date change
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSlot = (slotId: string) => {
    if (selectedSlots.includes(slotId)) {
      setSelectedSlots(selectedSlots.filter(id => id !== slotId));
    } else {
      setSelectedSlots([...selectedSlots, slotId]);
    }
  };

  const calculateTotal = () => {
    return selectedSlots.reduce((sum, id) => {
      const slot = slots.find(s => s.id === id);
      return sum + (slot ? slot.price : 0);
    }, 0);
  };

  const handleBooking = async () => {
    setShowConfirm(false);
    const summarySlots = selectedSlots.map((id) => {
      const slot = slots.find((s) => s.id === id);
      return {
        court: "Sân 1",
        time: slot ? slot.time : "",
        price: slot ? slot.price : 0,
      };
    });
    navigate("/booking-summary", {
      state: {
        summary: {
          clubName,
          date: date.toLocaleDateString("vi-VN"),
          slots: summarySlots,
          mode,
          total: calculateTotal(),
        },
      },
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const headerTitle =
    mode === "daily"
      ? "Đặt lịch theo ngày"
      : mode === "fixed"
      ? "Đặt lịch cố định"
      : mode === "visual"
      ? "Đặt lịch ngày trực quan"
      : "Đặt lịch sự kiện";

  return (
    <Page className="bg-[#004f3a] pb-24 min-h-full">
      <Header title={headerTitle} className="bg-[#004f3a] text-white" textColor="white" />
      
      <Box className="p-4">
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-md">
          <Text.Title className="mb-1 text-[#0E6F4E]">{clubName}</Text.Title>
          <Text size="xSmall" className="text-gray-500">
            Chọn thời gian và khung giờ phù hợp để đặt sân.
          </Text>
        </div>
        
        {/* Date Picker */}
        <div className="mb-6">
          <Text className="font-medium mb-2 text-white">Chọn ngày</Text>
          <DatePicker
            mask
            maskClosable
            dateFormat="dd/mm/yyyy"
            title="Chọn ngày đặt sân"
            value={date}
            onChange={(value, selectedDate) => {
                if (selectedDate) setDate(selectedDate);
            }} 
          />
        </div>

        {/* Booking Type */}
        <div className="mb-6">
          <Text className="font-medium mb-2 text-white">Loại hình đặt</Text>
          <div className="flex gap-2">
            {[
              { id: 'single', label: 'Cá nhân' },
              { id: 'group', label: 'Nhóm' },
              { id: 'event', label: 'Sự kiện' }
            ].map((type) => (
              <div
                key={type.id}
                onClick={() => setBookingType(type.id as BookingType)}
                className={`px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
                  bookingType === type.id 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                {type.label}
              </div>
            ))}
          </div>
        </div>

        {/* Event Name Input */}
        {bookingType === 'event' && (
          <div className="mb-6">
            <Text className="font-medium mb-2">Tên sự kiện</Text>
            <input 
              className="w-full p-2 border rounded-lg outline-none focus:border-primary"
              placeholder="Nhập tên sự kiện..."
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
        )}

        {/* Time Slots Grid */}
        <div className="mb-6">
          <Text className="font-medium mb-2 text-white">Chọn khung giờ</Text>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {slots.map((slot) => {
                const isSelected = selectedSlots.includes(slot.id);
                return (
                  <div
                    key={slot.id}
                    onClick={() => !slot.isBooked && toggleSlot(slot.id)}
                    className={`
                      p-2 rounded-lg text-center text-xs font-medium border transition-all
                      ${slot.isBooked 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-transparent' 
                        : isSelected
                          ? 'bg-[#00b050] text-white border-[#00b050] shadow-md transform scale-105'
                          : 'bg-[#00412f] text-white border-gray-500 hover:border-[#00b050] cursor-pointer'
                      }
                    `}
                  >
                    {slot.time}
                    <div className="mt-1 text-[10px] opacity-80">
                      {slot.isBooked ? 'Đã đặt' : formatCurrency(slot.price)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex gap-4 justify-center text-xs text-gray-100 mb-8">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#00412f] border border-gray-400"></div> Trống
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#00b050]"></div> Đang chọn
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gray-200"></div> Đã đặt
          </div>
        </div>
      </Box>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg flex justify-between items-center z-50">
        <div>
          <Text className="text-gray-500 text-sm">Tổng tiền</Text>
          <Text.Title className="text-primary text-xl font-bold">
            {formatCurrency(calculateTotal())}
          </Text.Title>
        </div>
        <Button 
          disabled={selectedSlots.length === 0}
          onClick={() => setShowConfirm(true)}
          className="px-8"
        >
          Đặt ngay
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirm}
        title="Xác nhận đặt sân"
        onClose={() => setShowConfirm(false)}
        actions={[
          {
            text: "Hủy",
            onClick: () => setShowConfirm(false),
          },
          {
            text: "Xác nhận",
            highLight: true,
            onClick: handleBooking,
          },
        ]}
      >
        <div className="py-2">
          <p>Bạn có chắc chắn muốn đặt <b>{selectedSlots.length}</b> khung giờ?</p>
          <p className="mt-2 text-gray-600">Ngày: {date.toLocaleDateString('vi-VN')}</p>
          <p className="text-gray-600">Tổng tiền: <span className="text-primary font-bold">{formatCurrency(calculateTotal())}</span></p>
        </div>
      </Modal>
    </Page>
  );
};

export default BookingPage;
