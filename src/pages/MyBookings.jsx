// src/pages/MyBookings.jsx
import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle2, Activity, Bookmark, ChevronLeft, AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // تأكدي من استيراد Link
import DecorativeBlobs from '../components/common/DecorativeBlobs'; 

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // جعلنا المواعيد في "State" لكي نستطيع الحذف منها
  const [bookings, setBookings] = useState([
    { id: 1, studentName: "أحمد المحمد", university: "جامعة دمشق", caseType: "حشوة تجميلية", date: "14 مايو", status: "confirmed", progress: 40 },
    { id: 2, studentName: "سارة العلي", university: "الجامعة الدولية", caseType: "تنظيف لثة", date: "16 مايو", status: "pending", progress: 0 },
    { id: 3, studentName: "ليلى حسن", university: "جامعة دمشق", caseType: "سحب عصب", date: "10 أبريل", status: "done", progress: 100 },
    { id: 4, studentName: "سامر خالد", university: "جامعة دمشق", caseType: "قلع بسيط", date: "1 مايو", status: "rejected", progress: 0 }
  ]);

  // دالة الإلغاء الفعالة
  const handleCancel = (id) => {
    if(window.confirm("هل أنت متأكد من إلغاء هذا الحجز؟")) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const stats = {
    pending: bookings.filter(b => b.status === 'pending').length,
    active: bookings.filter(b => b.status === 'confirmed').length,
    done: bookings.filter(b => b.status === 'done').length,
    rejected: bookings.filter(b => b.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 relative overflow-hidden" dir="rtl">
      <DecorativeBlobs />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8 bg-white/40 p-5 rounded-[2rem] border border-primary/5 backdrop-blur-md shadow-sm">
          <div className="p-3 bg-secondary rounded-2xl text-primary-dark shadow-lg shadow-secondary/20">
            <Bookmark size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-primary-dark italic leading-none">مواعيدي الشخصية</h1>
            <p className="text-[9px] text-secondary font-bold uppercase tracking-widest mt-1">تتبع حالة طلبات العلاج</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <StatCard icon={<Activity size={20}/>} label="قيد العلاج" count={stats.active} color="secondary" />
          <StatCard icon={<CheckCircle2 size={20}/>} label="المكتملة" count={stats.done} color="green" />
          <StatCard icon={<AlertCircle size={20}/>} label="المرفوضة" count={stats.rejected} color="red" />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-8 bg-white/30 p-1.5 rounded-2xl border border-primary/5">
          <TabButton active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} label="الانتظار" count={stats.pending} />
          <TabButton active={activeTab === 'active'} onClick={() => setActiveTab('active')} label="الحالية" />
          <TabButton active={activeTab === 'done'} onClick={() => setActiveTab('done')} label="المكتملة" />
        </div>

        <div className="space-y-4">
          {/* تبويب الانتظار مع زر إلغاء شغال */}
          {activeTab === 'pending' && bookings.filter(b => b.status === 'pending').map(b => (
            <div key={b.id} className="bg-white/90 rounded-[2.5rem] p-6 border border-primary/5 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl">{b.studentName[0]}</div>
                <div>
                  <h3 className="text-lg font-black text-primary-dark">{b.studentName}</h3>
                  <p className="text-xs text-textSecondary font-bold">{b.caseType}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-amber-50 text-amber-600 py-3 rounded-xl font-black text-[10px] text-center border border-amber-100/50 flex items-center justify-center">بانتظار الطبيب...</div>
                <button 
                  onClick={() => handleCancel(b.id)} 
                  className="px-6 bg-red-50 text-red-500 rounded-xl font-black text-xs active:scale-95 transition-all border border-red-100"
                >
                  إلغاء
                </button>
              </div>
            </div>
          ))}

          {/* تبويب الحالية مع رابط لصفحة تفاصيل المريض */}
          {activeTab === 'active' && bookings.filter(b => b.status === 'confirmed').map(b => (
            <Link to={`/patient-case-view/${b.id}`} key={b.id} className="bg-white/90 rounded-[2.5rem] p-6 border border-primary/5 shadow-sm block hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary font-black">{b.studentName[0]}</div>
                  <div>
                    <h3 className="text-lg font-black text-primary-dark">{b.caseType}</h3>
                    <p className="text-xs text-textSecondary font-bold">الطبيب: {b.studentName}</p>
                  </div>
                </div>
                <ChevronLeft size={20} className="text-primary mt-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase text-primary px-1">
                  <span>تقدم العلاج</span>
                  <span>{b.progress}%</span>
                </div>
                <div className="h-4 w-full bg-primary/5 rounded-full overflow-hidden border border-primary/5 p-0.5">
                  <div className="h-full bg-gradient-to-l from-primary to-secondary rounded-full transition-all" style={{ width: `${b.progress}%` }}></div>
                </div>
              </div>
            </Link>
          ))}
          
          {/* تبويب المكتملة */}

{/* 3. تبويب المكتملة - أصبح الآن يدعم الضغط والانتقال */}
{activeTab === 'done' && bookings.filter(b => b.status === 'done').map(b => (
  <Link 
    to={`/patient-case-view/${b.id}`} 
    key={b.id} 
    className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-6 border border-primary/5 flex justify-between items-center hover:bg-white transition-all shadow-sm mb-4 block"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 border border-green-100">
        <CheckCircle2 size={24}/>
      </div>
      <div>
        <h3 className="font-black text-primary-dark text-sm">{b.caseType}</h3>
        <p className="text-[10px] text-textSecondary font-bold">{b.studentName} • {b.date}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-lg">منجزة</span>
      <ChevronLeft size={18} className="text-primary/40" />
    </div>
  </Link>
))}
        </div>
      </div>
    </div>
  );
};

// مكونات فرعية ثابتة
const StatCard = ({ icon, label, count, color }) => (
  <div className="bg-white/80 p-4 rounded-3xl border border-primary/5 shadow-sm flex flex-col items-center">
    <div className={`text-${color} mb-1 opacity-70`}>{icon}</div>
    <p className="text-[9px] text-textSecondary font-black uppercase tracking-tighter">{label}</p>
    <p className="text-xl font-black text-primary-dark leading-none">{count}</p>
  </div>
);

const TabButton = ({ active, onClick, label, count }) => (
  <button onClick={onClick} className={`py-3.5 rounded-xl font-black text-[11px] transition-all flex items-center justify-center gap-2 ${active ? 'bg-primary text-white shadow-md scale-[1.02]' : 'text-textSecondary'}`}>
    {label}
    {count > 0 && <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white text-primary' : 'bg-primary/10 text-primary'}`}>{count}</span>}
  </button>
);

export default MyBookings;