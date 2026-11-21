// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowUpLeft } from 'lucide-react';

const Footer = ({ isLoggedIn }) => { // أضفنا isLoggedIn هنا كـ Props
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* 1. هوية المنصة */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary-dark font-black text-xl shadow-lg">D</div>
              <h3 className="text-xl font-black">منصة طب الأسنان</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              نعمل على تسهيل رحلة العلاج والتعليم، لنكون الرابط الأوثق بين الطالب المبدع والمريض.
            </p>
          </div>

          {/* 2. الروابط السريعة - التعديل هنا */}
          <div className="flex flex-col gap-6">
            <h4 className="text-secondary font-bold border-r-4 border-secondary pr-3 leading-none">روابط الوصول</h4>
            <div className="grid grid-cols-1 gap-4">
              
              {/* رابط الرئيسية دائماً ظاهر */}
              <Link to="/" className="group flex items-center gap-2 text-white/70 hover:text-secondary transition-all">
                <ArrowUpLeft size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-medium">الصفحة الرئيسية</span>
              </Link>

              {/* رابط الملف الشخصي يظهر فقط إذا كان مسجل دخول */}
              {isLoggedIn && (
                <Link to="/profile" className="group flex items-center gap-2 text-white/70 hover:text-secondary transition-all">
                  <ArrowUpLeft size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm font-medium">الملف الشخصي</span>
                </Link>
              )}

              {/* روابط الـ Anchor دائماً ظاهرة */}
              <a href="#about" className="group flex items-center gap-2 text-white/70 hover:text-secondary transition-all">
                <ArrowUpLeft size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-medium">من نحن</span>
              </a>
              
              <a href="#faq" className="group flex items-center gap-2 text-white/70 hover:text-secondary transition-all">
                <ArrowUpLeft size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-medium">الأسئلة الشائعة</span>
              </a>
            </div>
          </div>

          {/* 3. قنوات التواصل */}
          <div className="flex flex-col gap-6">
            <h4 className="text-secondary font-bold border-r-4 border-secondary pr-3 leading-none">تواصل معنا</h4>
            <div className="space-y-4 text-white/70">
              <div className="flex items-center gap-3"><Phone size={18} className="text-secondary"/> 09xx xxx xxx</div>
              <div className="flex items-center gap-3"><Mail size={18} className="text-secondary"/> info@dental.com</div>
            </div>
          </div>

        </div>

        {/* سطر الحقوق وتوقيع أمان */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] tracking-widest uppercase italic">
            © {new Date().getFullYear()} جـمـيـع الـحـقـوق مـحـفـوظـة لـدى كـلـيـة طـب الأسـنـان
          </p>
          
          <div className="flex items-center gap-4 bg-white/[0.02] px-6 py-3 rounded-2xl border border-white/5 group">
            <div className="text-left">
              <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] mb-1">Concept & Dev</p>
              <p className="text-secondary font-black text-xs italic group-hover:text-white transition-colors">AMAN CREATIVE STUDIO</p>
            </div>
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary-dark font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">
              A
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;