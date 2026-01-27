import React, { useState, useRef } from "react";
import { Page, Box, Text, Input, Button, Icon, Header, useNavigate, Tabs } from "zmp-ui";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Hidden admin trigger logic
  const tapCountRef = useRef(0);
  const firstTapTimeRef = useRef(0);
  const RESET_TIME_MS = 10000;
  const REQUIRED_TAPS = 5;

  const handleLoginTap = () => {
    const now = Date.now();
    if (tapCountRef.current > 0 && now - firstTapTimeRef.current > RESET_TIME_MS) {
      tapCountRef.current = 0;
      firstTapTimeRef.current = 0;
    }
    if (tapCountRef.current === 0) {
      firstTapTimeRef.current = now;
    }
    tapCountRef.current += 1;

    if (tapCountRef.current >= REQUIRED_TAPS) {
      if (now - firstTapTimeRef.current <= RESET_TIME_MS) {
        navigate("/admin-login");
        tapCountRef.current = 0;
        firstTapTimeRef.current = 0;
        return;
      }
    }

    // Normal Login Logic
    if (tapCountRef.current < REQUIRED_TAPS) {
      navigate("/");
    }
  };

  return (
    <Page className="bg-[#0E6F4E] flex flex-col h-full relative">
       <Header title="Đăng nhập" showBackIcon={true} textColor="white" className="bg-transparent shadow-none" />
       
       <div className="flex-1 bg-white rounded-t-[30px] mt-4 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
             <div 
               className={`flex-1 py-4 text-center font-bold text-sm cursor-pointer ${activeTab === 'phone' ? 'text-[#0E6F4E] border-b-2 border-[#0E6F4E]' : 'text-gray-400'}`}
               onClick={() => setActiveTab('phone')}
             >
                Số điện thoại
             </div>
             <div 
               className={`flex-1 py-4 text-center font-bold text-sm cursor-pointer ${activeTab === 'email' ? 'text-[#0E6F4E] border-b-2 border-[#0E6F4E]' : 'text-gray-400'}`}
               onClick={() => setActiveTab('email')}
             >
                Email
             </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
             {/* Inputs */}
             <div className="space-y-4 mb-6">
                {activeTab === 'phone' ? (
                  <div>
                    <Text.Title size="small" className="font-bold mb-2 text-green-800">Số điện thoại của bạn?</Text.Title>
                    <div className="flex items-center border border-gray-200 rounded-lg p-1">
                      <div className="flex items-center px-3 border-r border-gray-200">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="VN" className="w-5 h-5 mr-1" />
                          <Text className="font-medium text-gray-700">+ 84</Text>
                          <Icon icon="zi-chevron-down" size={16} className="text-gray-400 ml-1" />
                      </div>
                      <input 
                        type="text" 
                        className="flex-1 p-2.5 outline-none text-gray-700 font-medium bg-transparent"
                        placeholder="Nhập số điện thoại" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Text.Title size="small" className="font-bold mb-2 text-green-800">Email của bạn?</Text.Title>
                    <Input 
                      type="text"
                      placeholder="Nhập email của bạn"
                      clearable
                      className="border-gray-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <Text.Title size="small" className="font-bold mb-2 text-green-800">Mật khẩu (*)</Text.Title>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu (*)"
                      className="border-gray-200"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div 
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                        <Icon icon={showPassword ? "zi-eye" : "zi-eye-slash"} className="text-gray-400" />
                    </div>
                  </div>
                </div>
             </div>

             {/* Login Button */}
             <Button 
                fullWidth 
                size="large"
                className="bg-[#0E6F4E] hover:bg-green-800 rounded-lg font-bold text-lg mb-4 shadow-lg"
                onClick={handleLoginTap}
             >
                ĐĂNG NHẬP
             </Button>

             {/* FaceID Button */}
             <div 
               className="border border-green-200 rounded-lg py-3 flex items-center justify-center gap-2 cursor-pointer active:bg-green-50 mb-6"
               onClick={() => console.log("Biometric login")}
             >
                <Icon icon="zi-qrline" className="text-[#0E6F4E]" />
                <Text className="font-bold text-[#0E6F4E] text-sm">Đăng nhập với sinh trắc học</Text>
             </div>

             {/* Links */}
             <div className="flex justify-center items-center gap-1 mb-10">
                <Text size="small" className="text-gray-500">Bạn quên mật khẩu?</Text>
                <Text size="small" className="font-bold text-gray-700 underline cursor-pointer">Quên mật khẩu</Text>
             </div>

             <div className="flex justify-center items-center gap-1 mb-8">
                <Text size="small" className="text-gray-500">Bạn chưa có tài khoản?</Text>
                <Text size="small" className="font-bold text-gray-700 cursor-pointer" onClick={() => navigate("/register")}>Đăng ký</Text>
             </div>

             {/* Social Login */}
             <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 border border-gray-200 px-6 py-2 rounded-full shadow-sm cursor-pointer">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
                   <Text className="font-medium text-gray-600">Google</Text>
                </div>
             </div>

             {/* Footer Partner Link */}
             <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-auto">
                <Text size="small" className="text-center text-yellow-700">
                  Nếu bạn là <span className="font-bold">CHỦ SÂN</span> hoặc <span className="font-bold">NHÂN VIÊN</span>, Bấm vào đây để tải ứng dụng <span className="font-bold">ALOBO - Quản lý sân thể thao!</span>
                </Text>
             </div>
          </div>
       </div>
    </Page>
  );
};

export default LoginPage;
