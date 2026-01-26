import { wait } from "../utils/async";

export interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  isRead: boolean;
  target: 'all' | 'selected';
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    title: "Khuyến mãi 50%",
    body: "Giảm giá 50% cho tất cả các gói tập trong tháng này!",
    date: new Date().toISOString(),
    isRead: false,
    target: "all"
  },
  {
    id: "notif-2",
    title: "Bảo trì hệ thống",
    body: "Hệ thống sẽ bảo trì vào lúc 00:00 ngày mai.",
    date: new Date(Date.now() - 86400000).toISOString(),
    isRead: true,
    target: "all"
  }
];

export const getNotifications = async (): Promise<Notification[]> => {
  await wait(500);
  return [...MOCK_NOTIFICATIONS];
};

export const sendNotification = async (title: string, body: string, target: 'all' | 'selected', userIds?: string[]): Promise<void> => {
  await wait(800);
  console.log("Sending notification:", { title, body, target, userIds });
  MOCK_NOTIFICATIONS.unshift({
    id: `notif-${Date.now()}`,
    title,
    body,
    date: new Date().toISOString(),
    isRead: false,
    target
  });
};
