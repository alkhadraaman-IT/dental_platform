// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Calendar, LogIn, CalendarCheck, Menu, X } from 'lucide-react';

const Navbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // حالة القائمة في الجوال
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // دالة لإغلاق القائمة عند الضغط على أي رابط
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-primary/5" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        
        {/* جهة اليمين: الشعار */}
        <div className="flex items-center gap-10">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">D</div>
            <span className="text-primary-dark font-black text-xl">Dental<span className="text-secondary">Platform</span></span>
          </Link>

          {/* روابط الكمبيوتر (تختفي في الجوال) */}
          <div className="hidden md:flex items-center gap-8 font-bold text-textPrimary">
            <Link to="/" className={`hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : ''}`}>الرئيسية</Link>
            <Link to={isLoggedIn ? "/bookings" : "/login"} className="hover:text-primary transition-colors flex items-center gap-2">
              <Calendar size={18} /> حجز موعد
            </Link>
            {isLoggedIn && (
              <Link to="/my-bookings" className="hover:text-primary transition-colors flex items-center gap-2">
                <CalendarCheck size={18} /> حجوزاتي
              </Link>
            )}
          </div>
        </div>

        {/* جهة اليسار: أزرار الدخول + زر المنيو للجوال */}
        <div className="flex items-center gap-2 md:gap-4">
          {isLoggedIn ? (
            <Link to="/profile" onClick={closeMenu} className="flex items-center gap-2 group">
              <div className="text-right hidden lg:block">
                <p className="text-[10px] text-textSecondary leading-none">مرحباً بك</p>
                <p className="text-sm font-bold text-primary-dark leading-tight">أمان الإبداع</p>
              </div>
              <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center text-secondary border-2 border-transparent group-hover:border-secondary transition-all">
                <User size={20} />
              </div>
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-primary font-bold px-4 py-2 hover:bg-primary/5 rounded-xl transition-all">دخول</Link>
              <Link to="/signup" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-primary-dark transition-all">إنشاء حساب</Link>
            </div>
          )}

          {/* زر الهامبرغر (يظهر فقط في الجوال) */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-primary-dark hover:bg-primary/5 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* قائمة الجوال المنسدلة (Mobile Menu) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-primary/5 px-6 py-8 space-y-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-5 font-bold text-lg text-primary-dark">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 py-2 border-b border-gray-50">الرئيسية</Link>
            
            <Link to={isLoggedIn ? "/bookings" : "/login"} onClick={closeMenu} className="flex items-center gap-3 py-2 border-b border-gray-50 text-secondary">
              <Calendar size={20} /> حجز موعد جديد
            </Link>

            {isLoggedIn && (
              <Link to="/my-bookings" onClick={closeMenu} className="flex items-center gap-3 py-2 border-b border-gray-50 text-primary">
                <CalendarCheck size={20} /> حجوزاتي الحالية
              </Link>
            )}

            {!isLoggedIn && (
              <div className="flex flex-col gap-4 pt-4">
                <Link to="/login" onClick={closeMenu} className="w-full py-4 text-center rounded-2xl bg-primary/5 text-primary">تسجيل الدخول</Link>
                <Link to="/signup" onClick={closeMenu} className="w-full py-4 text-center rounded-2xl bg-primary text-white shadow-lg">إنشاء حساب جديد</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;