import React, { useEffect, useState } from "react";
import { Page, Header, Box, Text, Button, Icon, DatePicker } from "zmp-ui";
import { TimeSlot, getAvailableSlots } from "../../services/booking-service";
import { useNavigate, useLocation } from "react-router-dom";

// Mock data for courts
const courts = [
  { id: 'court-1', name: '1', price: 50000, status: 'active' },
  { id: 'court-3', name: '3', price: 50000, status: 'active' },
  { id: 'court-2', name: '2', price: 50000, status: 'active' },
  { id: 'court-4', name: '4', price: 50000, status: 'active' },
];

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const mode = (location.state as any)?.mode || "daily";

  // State
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<string>('court-1');

  const clubName = (location.state as any)?.clubName || "Sân cầu lông Apolo";

  useEffect(() => {
    loadSlots();
  }, [date, selectedCourt]);

  const loadSlots = async () => {
    setLoading(true);
    try {
      // Get real slots from API
      let data = await getAvailableSlots(date.toISOString(), selectedCourt);
      
      setSlots(data);
      setSelectedSlots([]); // Reset selection on date/court change
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

  const getUserInfo = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return {
          name: user.displayName || user.name || "Khách hàng",
          phone: user.phoneNumber || user.phone || ""
        };
      } catch (e) {
        console.error("Error parsing user info", e);
      }
    }
    return null;
  };

  const handleContinuePayment = () => {
    if (selectedSlots.length === 0) return;

    const summarySlots = selectedSlots.map((id) => {
      const slot = slots.find((s) => s.id === id);
      return {
        court: courts.find(c => c.id === selectedCourt)?.name || "Sân 1",
        time: slot ? slot.time : "",
        price: slot ? slot.price : 0,
      };
    });

    const userInfo = getUserInfo();
    const total = calculateTotal();
    
    navigate("/payment", {
      state: {
        booking: {
          slots: summarySlots,
          date: date.toISOString(),
          mode: mode,
          clubName: clubName
        },
        userInfo: userInfo,
        grandTotal: total
      }
    });
  };

  const formatCurrency = (amount: number) => {
    // Formatting as A$0.00/h based on image, or just keeping standard VND?
    // Image shows A$0.00/h. Let's try to mimic that or keep it localized.
    // The user said "gióng 100%". The image has A$0.00/h.
    // However, for a Vietnamese app, A$ might be confusing. 
    // I will stick to VND but maybe layout it similarly.
    // Actually, "A$0.00/h" looks like a placeholder in the design file.
    // I will use "50k/h" or similar short format to fit.
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Page className="bg-[#006442] min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <Header 
        title="Đặt lịch theo ngày" 
        className="bg-[#006442] text-white border-none" 
        textColor="white" 
        showBackIcon 
      />
      
      <Box className="flex-1 p-4 overflow-y-auto pb-24">
        
        {/* Date Selection */}
        <div className="flex justify-between items-center mb-6">
          <Text className="text-white font-medium uppercase text-sm tracking-wide">CHỌN THỜI GIAN</Text>
          <div className="bg-white/20 rounded-lg px-3 py-1.5 flex items-center gap-2 backdrop-blur-sm border border-white/30">
            <Text className="text-white text-sm font-medium">
                {date.toLocaleDateString('en-GB')} {/* dd/mm/yyyy */}
            </Text>
            <DatePicker
                dateFormat="dd/mm/yyyy"
                value={date}
                onChange={(value, selectedDate) => {
                    if (selectedDate) setDate(selectedDate);
                }}
            >
                <Icon icon="zi-calendar" className="text-white text-lg" />
            </DatePicker>
          </div>
        </div>

        {/* Time Slots Grid */}
        <div className="mb-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-2">
              {slots.map((slot) => {
                const isSelected = selectedSlots.includes(slot.id);
                // Styles based on state
                let bgClass = "bg-transparent";
                let borderClass = "border border-white";
                let textClass = "text-white";
                
                if (slot.isBooked) {
                    bgClass = "bg-[#FF4D4F]"; // Red
                    borderClass = "border-transparent";
                    textClass = "text-white";
                } else if (isSelected) {
                    bgClass = "bg-[#0091FF]"; // Blue
                    borderClass = "border-transparent";
                    textClass = "text-white";
                } else {
                    // Default available
                    bgClass = "bg-transparent";
                    borderClass = "border border-white";
                    textClass = "text-white";
                }

                // We don't have "Locked" or "Pending" in standard logic yet, 
                // but we can simulate if needed. For now, Booked/Selected/Available covers most.

                return (
                  <div
                    key={slot.id}
                    onClick={() => !slot.isBooked && toggleSlot(slot.id)}
                    className={`
                      ${bgClass} ${borderClass} ${textClass}
                      h-8 rounded-[4px] flex items-center justify-center
                      text-[11px] font-medium cursor-pointer transition-all
                      ${!slot.isBooked && 'active:scale-95'}
                    `}
                  >
                    {slot.time}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Court Selection */}
        <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
                <Text className="text-white text-base font-medium">Chọn sân</Text>
                <Text className="text-[#FFC107] text-xs underline">Xem sân & bảng giá</Text>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {courts.map((court) => (
                    <div 
                        key={court.id} 
                        className="flex flex-col items-center gap-1 cursor-pointer min-w-[70px]"
                        onClick={() => setSelectedCourt(court.id)}
                    >
                        {/* Court Icon - Mimicking the badminton court visual */}
                        <div className={`
                            w-20 h-14 border-2 rounded-md flex items-center justify-center relative
                            ${selectedCourt === court.id ? 'bg-white/10 border-[#FFC107]' : 'bg-white/5 border-white/30'}
                        `}>
                            {/* Court lines simulation */}
                            <div className="w-[80%] h-[80%] border border-white/50 flex flex-col relative">
                                <div className="absolute top-1/2 w-full border-t border-white/50 -translate-y-1/2"></div>
                                <div className="absolute left-1/2 h-full border-l border-white/50 -translate-x-1/2"></div>
                                <Text className="font-bold text-white text-lg drop-shadow-md z-10">{court.name}</Text>
                            </div>
                        </div>
                        <Text className="text-white/70 text-[10px]">A$0.00/h</Text>
                    </div>
                ))}
            </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs text-white mb-20">
            <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-white border border-gray-300"></div>
                <span>Trống</span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-[#0091FF]"></div>
                <span>Lịch của bạn chọn</span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-[#FAAD14]"></div>
                <span>Đang xác nhận</span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-[#FF4D4F]"></div>
                <span>Đã đặt</span>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-[#8C8C8C]"></div>
                <span>Khóa</span>
            </div>
        </div>
      </Box>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#006442] z-50">
        <Button 
          fullWidth
          size="large"
          disabled={selectedSlots.length === 0}
          onClick={handleContinuePayment}
          className="bg-[#FFC107] text-white hover:bg-[#FFB300] active:bg-[#FFA000] rounded-lg font-bold text-lg uppercase h-12 border-none shadow-lg"
        >
          TIẾP TỤC THANH TOÁN {selectedSlots.length > 0 && `(${formatCurrency(calculateTotal())})`}
        </Button>
      </div>
    </Page>
  );
};

export default BookingPage;
