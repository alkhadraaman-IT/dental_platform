import React, { useState } from 'react';
import { 
  Check, X, Clock, LayoutDashboard, ChevronLeft, Plus,
  Activity, CheckCircle2, Star, Calendar, User 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('new');
  
  // 1. بيانات الطلبات الجديدة
  const [newRequests, setNewRequests] = useState([
    { id: 1, name: "علاء السعدي", case: "قلع ضرس عقل", date: "15 مايو", pay: "كامل على المريض" },
    { id: 2, name: "منى علي", case: "حشوة ليزر تجميلية", date: "16 مايو", pay: "نص بنص" },
  ]);

  // 2. بيانات الحالات المستلمة
  const activeCases = [
    { id: 101, patientName: "سامر المصري", caseName: "سحب عصب ثنايا", progress: 65 },
    { id: 102, patientName: "هالة حسن", caseName: "تنظيف لثة عميق", progress: 30 },
  ];

  // 3. بيانات الأرشيف (التي كانت ناقصة)
  const completedCases = [
    { id: 201, patientName: "ياسين كمال", caseName: "تبييض أسنان", date: "2024/03/12", rating: 5, note: "حالة ممتازة" },
    { id: 202, patientName: "رنا اليوسف", caseName: "جسر خزفي", date: "2024/02/20", rating: 4, note: "تم التسليم" },
    { id: 203, patientName: "خالد العلي", caseName: "حشوة أملغم", date: "2024/01/10", rating: 5, note: "مكتمل" },
  ];

  const handleAction = (id, type) => {
    setNewRequests(prev => prev.filter(req => req.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-20 px-4 relative overflow-hidden" dir="rtl">
      <DecorativeBlobs />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* هيدر اللوحة */}
        <div className="flex items-center gap-4 mb-8 bg-white/40 p-5 rounded-[2rem] border border-primary/5 backdrop-blur-md shadow-sm">
          <div className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-primary-dark italic leading-none">لوحة تحكم الطبيب</h1>
            <p className="text-[9px] text-secondary font-bold uppercase tracking-widest mt-1">إدارة الحالات والمراجعات</p>
          </div>
        </div>

        {/* الإحصائيات العلويّة */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <StatCard icon={<Clock size={20}/>} label="انتظار" count={newRequests.length} color="primary" />
          <StatCard icon={<Activity size={20}/>} label="مستلمة" count={activeCases.length} color="secondary" />
          <StatCard icon={<CheckCircle2 size={20}/>} label="منجزة" count={completedCases.length} color="green" />
        </div>

        {/* قسم الوصول السريع لإدارة المواعيد */}
<div className="grid grid-cols-2 gap-4 mb-8">
  <Link to="/manage-schedule" className="bg-gradient-to-br from-secondary/20 to-secondary/5 p-4 rounded-[2rem] border border-secondary/10 flex items-center gap-3 hover:scale-[1.02] transition-all">
    <div className="p-2 bg-secondary rounded-xl text-primary-dark shadow-sm">
      <Calendar size={20} />
    </div>
    <span className="text-[11px] font-black text-primary-dark">إدارة جدولي</span>
  </Link>

  <Link to="/add-availability" className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-[2rem] border border-primary/10 flex items-center gap-3 hover:scale-[1.02] transition-all">
    <div className="p-2 bg-primary rounded-xl text-white shadow-sm">
      <Plus size={20} />
    </div>
    <span className="text-[11px] font-black text-primary-dark">إضافة توفر</span>
  </Link>
</div>

        {/* التبويبات الثلاثة */}
        <div className="grid grid-cols-3 gap-2 mb-8 bg-white/30 p-1.5 rounded-2xl border border-primary/5">
          <TabButton active={activeTab === 'new'} onClick={() => setActiveTab('new')} label="الجديدة" />
          <TabButton active={activeTab === 'active'} onClick={() => setActiveTab('active')} label="المستلمة" />
          <TabButton active={activeTab === 'done'} onClick={() => setActiveTab('done')} label="الأرشيف" />
        </div>

        {/* محتوى التبويبات */}
        <div className="space-y-4">
          
          {/* تبويب: الطلبات الجديدة */}
          {activeTab === 'new' && (
            newRequests.length > 0 ? (
              newRequests.map(req => (
                <div key={req.id} className="bg-white/90 rounded-[2.5rem] p-6 border border-primary/5 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl">{req.name[0]}</div>
                    <div>
                      <h3 className="text-lg font-black text-primary-dark">{req.name}</h3>
                      <p className="text-xs text-textSecondary font-bold">{req.case} • {req.pay}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleAction(req.id, 'accept')} className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-xs shadow-lg shadow-primary/20 active:scale-95 transition-all">قبول</button>
                    <button onClick={() => handleAction(req.id, 'reject')} className="flex-1 bg-red-50 text-red-500 py-4 rounded-2xl font-black text-xs active:scale-95 transition-all">رفض</button>
                  </div>
                </div>
              ))
            ) : <NoDataMessage />
          )}

          {/* تبويب: الحالات المستلمة */}
          {activeTab === 'active' && (
            activeCases.map(c => (
              <Link to={`/case-details/${c.id}`} key={c.id} className="bg-white/90 rounded-[2.5rem] p-6 border border-primary/5 shadow-sm block hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary font-black">{c.patientName[0]}</div>
                    <div>
                      <h3 className="text-lg font-black text-primary-dark">{c.caseName}</h3>
                      <p className="text-xs text-textSecondary font-bold">المريض: {c.patientName}</p>
                    </div>
                  </div>
                  <ChevronLeft className="text-primary mt-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase text-primary px-1">
                    <span>نسبة الإنجاز</span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="h-3 w-full bg-primary/5 rounded-full overflow-hidden border border-primary/5 p-0.5">
                    <div className="h-full bg-gradient-to-l from-primary to-secondary rounded-full transition-all" style={{ width: `${c.progress}%` }}></div>
                  </div>
                </div>
              </Link>
            ))
          )}

          {/* تبويب: الأرشيف (المنجزة) */}
          {activeTab === 'done' && (
            completedCases.map(c => (
              <div key={c.id} className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-6 border border-primary/5 flex flex-col gap-3 shadow-sm opacity-90">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-primary-dark text-sm">{c.patientName}</h3>
                      <p className="text-[10px] text-textSecondary font-bold">{c.caseName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] font-black">{c.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-primary/5">
                  <div className="flex items-center gap-1 text-[9px] text-textSecondary font-bold">
                    <Calendar size={12} /> {c.date}
                  </div>
                  <p className="text-[9px] text-primary italic font-black uppercase tracking-tighter">{c.note}</p>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

// مكونات صغيرة لتقليل حجم الكود الأساسي
const StatCard = ({ icon, label, count, color }) => (
  <div className="bg-white/80 p-4 rounded-3xl border border-primary/5 shadow-sm flex flex-col items-center">
    <div className={`text-${color} mb-1 opacity-70`}>{icon}</div>
    <p className="text-[9px] text-textSecondary font-black uppercase tracking-tighter">{label}</p>
    <p className="text-xl font-black text-primary-dark leading-none">{count}</p>
  </div>
);

const TabButton = ({ active, onClick, label }) => (
  <button onClick={onClick} className={`py-3.5 rounded-xl font-black text-[11px] transition-all ${active ? 'bg-primary text-white shadow-md' : 'text-textSecondary hover:bg-white/50'}`}>
    {label}
  </button>
);

const NoDataMessage = () => (
  <div className="text-center py-20 bg-white/30 rounded-[3rem] border-2 border-dashed border-primary/10">
    <p className="font-bold text-textSecondary text-sm italic">لا توجد بيانات حالياً</p>
  </div>
);

export default StudentDashboard;