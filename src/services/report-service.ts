import { wait } from "../utils/async";

export interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
}

export const getRevenueReport = async (startDate: Date, endDate: Date): Promise<RevenueData[]> => {
  await wait(800);
  
  const data: RevenueData[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    // Generate random data
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const baseRevenue = isWeekend ? 5000000 : 2000000;
    const randomFactor = Math.random() * 0.5 + 0.8; // 0.8 - 1.3
    
    data.push({
      date: currentDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
      revenue: Math.floor(baseRevenue * randomFactor),
      bookings: Math.floor((baseRevenue * randomFactor) / 100000)
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};
