import React, { useState } from 'react'; 
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import theme from '../styles/theme';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const { buttons, inputs, helpers, spacing, fontSizes } = theme;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${helpers.flexCenter} bg-background p-4 relative overflow-hidden`}>
      
      {/* إخفاء زر العين الافتراضي من المتصفح */}
      <style>
        {`
          input::-ms-reveal, 
          input::-ms-clear, 
          input[type="password"]::-webkit-contacts-auto-fill-button,
          input[type="password"]::-webkit-credentials-auto-fill-button,
          input[type="password"]::-webkit-textfield-decoration-container,
          input[type="password"]::-webkit-inner-spin-button,
          input[type="password"]::-webkit-outer-spin-button {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            -webkit-appearance: none !important;
            appearance: none !important;
          }
        `}
      </style>

      <DecorativeBlobs />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border-t-4 border-secondary">
        
        <div className={`${helpers.flexCol} items-center ${spacing.margin.medium}`}>
          <h2 className={`${fontSizes.heroTitle.mobile} ${fontSizes.heroTitle.tablet} text-text-primary font-bold`}>
            مرحبا بعودتك
          </h2>
          <p className="text-text-secondary mt-2">سجل دخولك للمتابعة</p>
        </div>

        <form onSubmit={handleLogin} className={spacing.gap.medium + " flex flex-col"}>
          
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input 
              required 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="البريد الإلكتروني" 
              className={`${inputs.primary} pr-12`}
            />
          </div>

          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input 
              required 
              name="password" 
              type={showPassword ? "text" : "password"} 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="كلمة المرور" 
              className={`${inputs.primary} pr-12 pl-12 w-full text-[11px] font-bold outline-none`} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary transition-all"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button type="submit" className={`${buttons.primary} ${helpers.flexCenter} gap-2 mt-6 w-full`}>
            <LogIn size={20} />
            <span>تسجيل الدخول</span>
          </button>
        </form>

<div className="text-right">
            <Link to="/forgot-password" className="text-[11px] font-bold text-primary hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>
          
        <div className={`mt-8 text-center ${fontSizes.bodyText.mobile} text-text-secondary`}>
          ليس لديك حساب؟ 
          <Link to="/signup" className="text-primary-dark font-bold hover:underline mr-1">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;