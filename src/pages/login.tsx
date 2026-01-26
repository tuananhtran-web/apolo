import React, { useState, useRef } from "react";
import { Page, Box, Text, Input, Button, useNavigate, Icon } from "zmp-ui";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const tapCountRef = useRef(0);
  const firstTapTimeRef = useRef(0);
  const RESET_TIME_MS = 10000; // 10 seconds
  const REQUIRED_TAPS = 5;

  const handleLoginTap = () => {
    const now = Date.now();

    // Reset if time elapsed is too long
    if (tapCountRef.current > 0 && now - firstTapTimeRef.current > RESET_TIME_MS) {
      tapCountRef.current = 0;
      firstTapTimeRef.current = 0;
    }

    if (tapCountRef.current === 0) {
      firstTapTimeRef.current = now;
    }

    tapCountRef.current += 1;

    console.log(`Tap count: ${tapCountRef.current}`);

    if (tapCountRef.current >= REQUIRED_TAPS) {
      // Check if within time window again to be safe
      if (now - firstTapTimeRef.current <= RESET_TIME_MS) {
        console.log("Hidden admin login triggered!");
        navigate("/admin-login");
        // Reset after successful trigger
        tapCountRef.current = 0;
        firstTapTimeRef.current = 0;
        return; // Prevent normal login action if we want to hijack it completely, 
                // or we can let it proceed but navigation happens first.
                // Usually for "hidden" features, we might want to stop the normal flow 
                // or just navigate. Since this is a button click, we navigate.
      }
    }

    // Normal Login Logic (Mock)
    if (tapCountRef.current < REQUIRED_TAPS) {
        // Only show "Normal" behavior if not triggering admin
        // For demo, we just log or do nothing until the user actually "submits" 
        // effectively. But if the requirement is "Tap Login button 5 times",
        // it implies the button *is* the login button.
        
        // If this were a real app, we might check validation here.
        if (phoneNumber.length >= 10) {
             // navigate("/"); // Uncomment to allow normal login
        }
    }
  };

  const handleNormalLogin = () => {
      // This function executes the "visual" login logic
      // We combine the tap counting here.
      handleLoginTap();
      
      // If we didn't navigate to admin, proceed with normal login simulation
      if (tapCountRef.current < REQUIRED_TAPS) {
         if (phoneNumber) {
             navigate("/");
         }
      }
  };

  return (
    <Page className="bg-white flex flex-col justify-center p-6 h-full">
      <Box className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
          <Icon icon="zi-user" className="text-white text-4xl" />
        </div>
        <Text.Title size="large" className="font-bold text-primary">Đăng nhập</Text.Title>
        <Text size="normal" className="text-gray-500 mt-2">Chào mừng bạn quay trở lại</Text>
      </Box>

      <Box className="w-full space-y-4">
        <Input 
          type="text" 
          label="Số điện thoại" 
          placeholder="Nhập số điện thoại của bạn" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="rounded-lg"
        />
        
        <Button 
          fullWidth 
          size="large"
          className="rounded-full font-bold shadow-md bg-primary mt-6"
          onClick={handleNormalLogin}
        >
          Đăng nhập
        </Button>
      </Box>

      <Box className="mt-8 text-center">
        <Text size="small" className="text-gray-400">
          Chưa có tài khoản? <span className="text-primary font-bold">Đăng ký ngay</span>
        </Text>
      </Box>
    </Page>
  );
};

export default LoginPage;
