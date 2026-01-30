import { getSystemInfo } from "zmp-sdk";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { AppProps } from "zmp-ui/app";
import { FloatingActions } from "@/components/floating-actions";
import { AppBottomNavigation } from "@/components/bottom-nav";

import HomePage from "@/pages/index";
import MapPage from "@/pages/map";
import DiscoveryPage from "@/pages/discovery";
import FeaturedPage from "@/pages/featured";
import UserProfilePage from "@/pages/user/profile";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import QRScannerPage from "@/pages/qr-scanner";
import AdminLoginPage from "@/pages/admin-login";
import BookingPage from "@/pages/booking/index";
import VisualBookingPage from "@/pages/booking/visual";
import ServiceSelectionPage from "@/pages/booking/services";
import BookingSummaryPage from "@/pages/booking/summary";
import PaymentPage from "@/pages/payment/index";
import NotificationListPage from "@/pages/notifications/index";
import SearchAdvancedPage from "@/pages/search/index";

const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <FloatingActions />
          <div className="flex-1 overflow-auto pb-16">
            <AnimationRoutes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/pages/map" element={<MapPage />}></Route>
              <Route path="/pages/discovery" element={<DiscoveryPage />}></Route>
              <Route path="/pages/featured" element={<FeaturedPage />}></Route>
              <Route path="/pages/user/profile" element={<UserProfilePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/qr-scanner" element={<QRScannerPage />}></Route>
              <Route path="/admin-login" element={<AdminLoginPage />}></Route>
              <Route path="/booking" element={<BookingPage />}></Route>
              <Route path="/booking/visual" element={<VisualBookingPage />}></Route>
              <Route path="/booking/services" element={<ServiceSelectionPage />}></Route>
              <Route path="/booking-summary" element={<BookingSummaryPage />}></Route>
              <Route path="/payment" element={<PaymentPage />}></Route>
              <Route path="/notifications" element={<NotificationListPage />}></Route>
              <Route path="/search" element={<SearchAdvancedPage />}></Route>
            </AnimationRoutes>
          </div>
          <AppBottomNavigation />
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
