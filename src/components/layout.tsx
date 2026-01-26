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
            </AnimationRoutes>
          </div>
          <AppBottomNavigation />
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
