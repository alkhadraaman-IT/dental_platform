// src/pages/UniversityProfile.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  School, Users, ClipboardList, MapPin, 
  ArrowRight, Phone, Mail, GraduationCap 
} from 'lucide-react';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const UniversityProfile = () => {
  const { id } = useParams(); // يجلب معرف الجامعة من الرابط
  const navigate = useNavigate();

  // بيانات افتراضية للجامعة (يمكن جلبها من Firestore باستخدام id)
  const universityInfo = {
    name: "جامعة دمشق - كلية طب الأسنان",
    location: "دمشق، البرامكة",
    email: "dentistry@damas.edu.sy",
    phone: "+963 11 2233445",
    studentsCount: 120,
    totalCases: 3450,
    students: [
      { id: '202110500', name: 'محمد الحموي', year: 'سنة رابعة', cases: 12 },
      { id: '202010200', name: 'ليلى الأحمد', year: 'سنة خامسة', cases: 25 },
    ]
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 relative overflow-hidden" dir="rtl">
      <DecorativeBlobs />

      <div className="max-w-5xl mx-auto relative z-10 text-right">
        
        {/* زر العودة */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary font-black text-[10px] mb-8 hover:translate-x-1 transition-transform">
           <ArrowRight size={16}/> عودة 
        </button>

        {/* كرت معلومات الجامعة الرئيسي */}
        <div className="bg-white rounded-[3rem] p-8 border border-primary/5 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-right">
              <div className="w-24 h-24 bg-secondary/10 rounded-[2rem] flex items-center justify-center text-secondary border border-secondary/10">
                 <School size={48} />
              </div>
              <div className="flex-1">
                 <h1 className="text-2xl font-black text-primary-dark italic mb-2">{universityInfo.name}</h1>
                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-textSecondary"><MapPin size={14}/> {universityInfo.location}</span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-textSecondary"><Mail size={14}/> {universityInfo.email}</span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <p className="text-[9px] text-textSecondary font-black uppercase mb-1">إجمالي الطلاب</p>
                       <p className="text-xl font-black text-primary">{universityInfo.studentsCount}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <p className="text-[9px] text-textSecondary font-black uppercase mb-1">الحالات المنجزة</p>
                       <p className="text-xl font-black text-primary-dark">{universityInfo.totalCases}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* قائمة الطلاب في هذه الجامعة */}
        <h2 className="text-lg font-black text-primary-dark mb-6 flex items-center gap-2 px-2">
           <GraduationCap className="text-secondary" /> قائمة الطلاب المسجلين
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {universityInfo.students.map((student) => (
             <div key={student.id} className="bg-white p-5 rounded-3xl border border-primary/5 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center font-black text-xs">{student.name[0]}</div>
                   <div>
                      <h4 className="text-xs font-black text-primary-dark">{student.name}</h4>
                      <p className="text-[9px] text-textSecondary font-bold">ID: {student.id} • {student.year}</p>
                   </div>
                </div>
                <div className="text-left">
                   <p className="text-[10px] font-black text-primary">{student.cases} حالة</p>
                   <button className="text-[8px] font-bold text-secondary underline mt-1">عرض التفاصيل</button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityProfile;