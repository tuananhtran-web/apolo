import React, { useState } from "react";
import { BottomNavigation, Icon, useNavigate } from "zmp-ui";
import { useLocation } from "react-router-dom";

export const AppBottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

  // Map path to active tab
  React.useEffect(() => {
    if (location.pathname === '/') setActiveTab('home');
    else if (location.pathname.includes('/map')) setActiveTab('map');
    else if (location.pathname.includes('/discovery')) setActiveTab('discovery');
    else if (location.pathname.includes('/featured')) setActiveTab('featured');
    else if (location.pathname.includes('/profile') || location.pathname.includes('/user')) setActiveTab('profile');
  }, [location.pathname]);

  return (
    <BottomNavigation
      fixed
      activeKey={activeTab}
      onChange={(key) => {
        setActiveTab(key);
        switch (key) {
          case "home":
            navigate("/");
            break;
          case "map":
            navigate("/pages/map"); // Placeholder
            break;
          case "discovery":
            navigate("/pages/discovery"); // Placeholder
            break;
          case "featured":
            navigate("/pages/featured"); // Placeholder
            break;
          case "profile":
            navigate("/pages/user/profile");
            break;
        }
      }}
      className="z-50 pb-safe-bottom"
    >
      <BottomNavigation.Item
        key="home"
        label="Trang chủ"
        icon={<Icon icon="zi-home" />}
        activeIcon={<Icon icon="zi-home" className="text-primary" />}
      />
      <BottomNavigation.Item
        key="map"
        label="Bản đồ"
        icon={<Icon icon="zi-location" />}
        activeIcon={<Icon icon="zi-location" className="text-primary" />}
      />
      <BottomNavigation.Item
        key="discovery"
        label="Khám phá"
        icon={<Icon icon="zi-more-grid" />}
        activeIcon={<Icon icon="zi-more-grid" className="text-primary" />}
      />
      <BottomNavigation.Item
        key="featured"
        label="Nổi bật"
        icon={<Icon icon="zi-star" />}
        activeIcon={<Icon icon="zi-star" className="text-primary" />}
      />
      <BottomNavigation.Item
        key="profile"
        label="Tài khoản"
        icon={<Icon icon="zi-user" />}
        activeIcon={<Icon icon="zi-user" className="text-primary" />}
      />
    </BottomNavigation>
  );
};
