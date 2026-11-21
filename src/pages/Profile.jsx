import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, GraduationCap, 
  CalendarCheck, LogOut, Edit3, ShieldCheck, ChevronLeft, 
  Hash, Star, Stethoscope, CheckCircle2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = ({ role, onLogout }) => {
  const navigate = useNavigate();

  // البيانات بناءً على هيكلية Users التي ذكرتِها
  const [userData] = useState({
    uid: "USR12345",
    name: "أمان الإبداع",
    phone: "0930123456",
    email: "aman@creative.studio",
    role: role || 'student', 
    university_id: "202110543",
    profile_image: null,
    year: "السنة الرابعة",
    specialties: ["حشوات تجميلية", "قلع أسنان", "تنظيف لثة"], // Array
    success_cases_count: 12,
    status: "Active",
    joinedDate: "مارس 2024"
  });

  const isStudent = userData.role === 'student';

  return (
    <div className="min-h-screen bg-background py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto text-right">
        
        {/* --- بطاقة الرأس (Header) --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 overflow-hidden border border-primary/5 mb-8">
          <div className="h-44 bg-gradient-to-r from-primary-dark via-primary to-secondary/40 relative">
            {/* عرض الحالة (Status) */}
            <div className="absolute top-6 left-6">
               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                 userData.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
               }`}>
                 {userData.status === 'Active' ? 'نشط' : 'غير نشط'}
               </span>
            </div>
          </div>
          
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row items-end gap-6 -mt-20">
              {/* الصورة الشخصية */}
              <div className="w-36 h-36 bg-white rounded-[2.5rem] shadow-2xl border-8 border-white flex items-center justify-center text-primary relative overflow-hidden group">
                {userData.profile_image ? (
                  <img src={userData.profile_image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  isStudent ? <GraduationCap size={70} /> : <User size={70} />
                )}
              </div>
              
              <div className="flex-1 mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-black text-primary-dark">{userData.name}</h1>
                  {isStudent && <ShieldCheck className="text-secondary" size={24} />}
                </div>
                <p className="text-textSecondary font-medium flex items-center gap-2 mt-1">
                  {isStudent ? 'طالب ممارس' : 'مريض مسجل'} 
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  {isStudent ? `ID: ${userData.university_id}` : 'ملف طبي موثق'}
                </p>
              </div>

              <button 
                onClick={() => navigate('/edit-profile')} 
                className="mb-2 bg-primary text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 flex items-center gap-2"
              >
                <Edit3 size={18} /> تعديل الملف
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* --- العمود الأيمن (معلومات مفصلة) --- */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-primary/5">
              <h3 className="text-lg font-black text-primary-dark mb-8 flex items-center gap-2">
                <Hash size={20} className="text-secondary" /> المعلومات الأكاديمية والتقنية
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-xs text-textSecondary flex items-center gap-1"><Mail size={12}/> البريد الإلكتروني</p>
                  <p className="font-bold text-primary-dark">{userData.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-textSecondary flex items-center gap-1"><Phone size={12}/> رقم الهاتف</p>
                  <p className="font-bold text-primary-dark tracking-wider">{userData.phone}</p>
                </div>

                {isStudent && (
                  <>
                    <div className="space-y-1">
                      <p className="text-xs text-textSecondary flex items-center gap-1"><GraduationCap size={12}/> السنة الدراسية</p>
                      <p className="font-bold text-primary-dark">{userData.year}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-textSecondary flex items-center gap-1"><CheckCircle2 size={12}/> الحالات الناجحة</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-secondary">{userData.success_cases_count}</span>
                        <span className="text-xs font-bold text-textSecondary italic">حالة مكتملة</span>
                      </div>
                    </div>
                    
                    {/* التخصصات - Specialties Array */}
                    <div className="sm:col-span-2 space-y-3">
                      <p className="text-xs text-textSecondary flex items-center gap-1"><Stethoscope size={12}/> التخصصات والمهارات</p>
                      <div className="flex flex-wrap gap-2">
                        {userData.specialties.map((spec, index) => (
                          <span key={index} className="bg-primary/5 text-primary text-[11px] font-black px-4 py-2 rounded-xl border border-primary/10">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* --- العمود الأيسر (إجراءات) --- */}
          <div className="space-y-6">
            {/* بطاقة الحجوزات */}
            <Link to="/my-bookings" className="block group">
              <div className="bg-primary hover:bg-primary-dark p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 transition-all relative overflow-hidden">
                <CalendarCheck size={35} className="mb-4 text-secondary" />
                <h4 className="text-xl font-bold mb-1">جدول المواعيد</h4>
                <p className="text-white/60 text-xs tracking-tight leading-relaxed">
                  {isStudent ? "إدارة مواعيد المرضى المسجلين لديك" : "متابعة حالة حجوزاتك مع الأطباء"}
                </p>
                <ChevronLeft size={20} className="mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x--2 transition-all" />
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
              </div>
            </Link>

            <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 p-6 rounded-[2.5rem] border-2 border-red-50 text-red-500 font-black hover:bg-red-500 hover:text-white transition-all">
              <LogOut size={22} /> تسجيل الخروج
            </button>

            <p className="text-center text-[10px] text-textSecondary font-black uppercase tracking-[0.3em] opacity-40">
              UID: {userData.uid}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;