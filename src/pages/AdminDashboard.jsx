// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  School, CheckCircle, Clock, Search, MailWarning,
  Users, ChevronLeft, Calendar, UserRound, Trash2, RefreshCw, XCircle, UserX
} from 'lucide-react';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('universities');
  const [searchTerm, setSearchTerm] = useState("");

  // بيانات الجامعات (متوافقة مع بنية Firestore المقترحة)
  const [universitiesData] = useState([
    { id: 'uni_101', logo: 'D', name: "جامعة دمشق", status: "Active", startDate: "2024-01-01", endDate: "2025-01-01", email: "contact@damas.edu.sy" },
    { id: 'uni_102', logo: 'I', name: "الجامعة الدولية", status: "Inactive", startDate: "2023-06-15", endDate: "2024-06-15", email: "info@iu.edu.sy" },
  ]);

  // بيانات المرضى
  const [patientsData] = useState([
    { id: 'pat_501', name: 'أحمد ياسين', email: 'ahmad.y@gmail.com' },
    { id: 'pat_502', name: 'سارة العلي', email: 'sara.ali@outlook.com' },
  ]);

  // بيانات الطلبات
  const [requestsData] = useState([
    { id: 'req_01', name: 'جامعة القلمون', email: 'admin@uok.edu.sy', date: '2024-05-28' }
  ]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 relative overflow-hidden" dir="rtl">
      <DecorativeBlobs />

      <div className="max-w-7xl mx-auto relative z-10 text-right">
        
        {/* هيدر الصفحة */}
        <div className="mb-10 flex items-center justify-between">
           <div>
              <h1 className="text-2xl font-black text-primary-dark italic leading-none">لوحة التحكم المركزية</h1>
              <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-2">إدارة المؤسسات والمستخدمين</p>
           </div>
           <div className="hidden md:flex gap-4">
              <div className="text-left">
                <p className="text-[10px] font-black text-textSecondary uppercase">الحالة العامة</p>
                <p className="text-xs font-black text-green-500">النظام يعمل بشكل ممتاز</p>
              </div>
           </div>
        </div>

        {/* الإحصائيات السريعة */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
           <div className="bg-white p-5 rounded-[2rem] border border-primary/5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"><School size={20}/></div>
              <div><p className="text-lg font-black text-primary-dark leading-none">12</p><p className="text-[8px] text-textSecondary font-bold">جامعة</p></div>
           </div>
           <div className="bg-white p-5 rounded-[2rem] border border-primary/5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center"><Users size={20}/></div>
              <div><p className="text-lg font-black text-primary-dark leading-none">450</p><p className="text-[8px] text-textSecondary font-bold">مريض</p></div>
           </div>
           <div className="col-span-2 md:col-span-1 bg-white p-5 rounded-[2rem] border border-primary/5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center"><MailWarning size={20}/></div>
              <div><p className="text-lg font-black text-primary-dark leading-none">3</p><p className="text-[8px] text-textSecondary font-bold">طلبات معلقة</p></div>
           </div>
        </div>

        {/* البحث والتبويبات */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
           <div className="flex-1 relative group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="ابحث بالاسم أو البريد الإلكتروني..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-primary/5 rounded-[1.5rem] py-4 pr-12 text-xs font-bold outline-none shadow-sm focus:ring-2 focus:ring-primary/10 text-right" 
              />
           </div>
           <div className="flex bg-white p-1.5 rounded-2xl border border-primary/5 shadow-sm overflow-x-auto no-scrollbar">
              {['universities', 'patients', 'requests'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-textSecondary hover:bg-slate-50'}`}
                >
                  {tab === 'universities' ? 'إدارة الجامعات' : tab === 'patients' ? 'إدارة المرضى' : 'طلبات الانضمام'}
                </button>
              ))}
           </div>
        </div>

        {/* المحتوى */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* قسم الجامعات */}
          {activeTab === 'universities' && universitiesData.map((uni) => (
            <div key={uni.id} className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
               <div className="cursor-pointer" onClick={() => navigate(`/university-profile/${uni.id}`)}>
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-12 h-12 bg-slate-50 text-primary rounded-2xl flex items-center justify-center font-black border border-primary/5">{uni.logo}</div>
                     <div className={`px-3 py-1 rounded-lg text-[8px] font-black ${uni.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {uni.status === 'Active' ? 'نشط' : 'منتهي'}
                     </div>
                  </div>
                  <h3 className="text-sm font-black text-primary-dark group-hover:text-primary mb-4">{uni.name}</h3>
                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 text-[9px] font-bold">
                     <div className="flex justify-between text-textSecondary"><span>تاريخ البدء:</span> <span className="text-primary-dark">{uni.startDate}</span></div>
                     <div className="flex justify-between text-textSecondary"><span>تاريخ الانتهاء:</span> <span className={`font-black ${uni.status === 'Inactive' ? 'text-red-500' : 'text-primary-dark'}`}>{uni.endDate}</span></div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl text-[9px] font-black hover:brightness-110 active:scale-95 transition-all"><RefreshCw size={12}/> تجديد</button>
                  <button className="flex items-center justify-center gap-2 bg-red-50 text-red-500 py-3 rounded-xl text-[9px] font-black hover:bg-red-100 active:scale-95 transition-all"><XCircle size={12}/> إلغاء</button>
               </div>
            </div>
          ))}

          {/* قسم المرضى */}
          {activeTab === 'patients' && patientsData.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded-[2.5rem] border border-primary/5 shadow-sm hover:shadow-md transition-all">
               <div className="flex items-center gap-4 cursor-pointer mb-5" onClick={() => navigate(`/profile/${p.id}`)}>
                  <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center font-black">
                     <UserRound size={22}/>
                  </div>
                  <div className="flex-1 overflow-hidden">
                     <h4 className="text-xs font-black text-primary-dark truncate">{p.name}</h4>
                     <p className="text-[9px] text-textSecondary font-bold truncate italic">{p.email}</p>
                  </div>
                  <ChevronLeft size={16} className="text-primary/20" />
               </div>
               <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 py-3 rounded-2xl text-[9px] font-black hover:bg-red-100 active:scale-95 transition-all border border-red-100">
                  <UserX size={14}/> حذف حساب المستخدم
               </button>
            </div>
          ))}

          {/* قسم الطلبات */}
          {activeTab === 'requests' && requestsData.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-[2.5rem] border-2 border-dashed border-primary/10">
               <div className="flex justify-between items-center mb-4 text-[9px] font-black text-textSecondary italic"><span>طلب جديد</span> <span>{req.date}</span></div>
               <h4 className="text-sm font-black text-primary-dark mb-1">{req.name}</h4>
               <p className="text-[9px] text-textSecondary font-bold mb-6">{req.email}</p>
               <div className="flex gap-2">
                  <button className="flex-1 bg-primary text-white py-3 rounded-xl text-[9px] font-black">قبول</button>
                  <button className="flex-1 bg-slate-50 text-textSecondary py-3 rounded-xl text-[9px] font-black">تجاهل</button>
               </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;