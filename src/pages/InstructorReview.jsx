// src/pages/InstructorReview.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, GraduationCap, ClipboardCheck, MessageCircle } from 'lucide-react';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const InstructorReview = () => {
  const navigate = useNavigate();
  const [grade, setGrade] = useState("");

  const handleGradeChange = (e) => {
    const value = e.target.value;
    // منع كتابة أي رقم خارج نطاق 0-10
    if (value === "" || (Number(value) >= 0 && Number(value) <= 10)) {
      setGrade(value);
    }
  };

  const caseData = {
    studentName: "أحمد المحمد",
    patientName: "سامر المصري",
    treatmentType: "سحب عصب - رحى أولى علوية",
    progress: [
      { id: 1, desc: "فتح الحجرة اللبية", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400", date: "2024-05-10" },
      { id: 2, desc: "تنظيف القنوات", img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400", date: "2024-05-12" }
    ]
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 relative overflow-hidden" dir="rtl">
      <DecorativeBlobs />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8 bg-white/40 p-4 rounded-3xl border border-primary/5">
          <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm"><ArrowRight size={24} /></button>
          <div className="text-center">
            <h1 className="text-xl font-black text-primary-dark italic">متابعة الحالة السريرية</h1>
            <p className="text-[9px] text-secondary font-bold uppercase tracking-widest mt-1">إشراف الأستاذ المباشر</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"><GraduationCap size={24} /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
             <div className="bg-white/90 p-6 rounded-[2.5rem] border border-primary/5 shadow-sm sticky top-24">
                <p className="text-[10px] font-black text-secondary uppercase mb-4 tracking-widest text-right">بيانات الملف</p>
                <div className="space-y-4 text-right">
                   <div>
                      <label className="text-[9px] text-textSecondary font-bold">الطالب المعالج</label>
                      <p className="text-sm font-black text-primary-dark leading-none mt-1">{caseData.studentName}</p>
                   </div>
                   <div>
                      <label className="text-[9px] text-textSecondary font-bold">المريض</label>
                      <p className="text-sm font-black text-primary-dark leading-none mt-1">{caseData.patientName}</p>
                   </div>
                   <div className="pt-4 border-t border-primary/5">
                      <label className="text-[9px] text-textSecondary font-bold">نوع المعالجة</label>
                      <p className="text-xs font-bold text-primary italic mt-1">{caseData.treatmentType}</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
               {caseData.progress.map((step, idx) => (
                 <div key={idx} className="bg-white rounded-[2rem] p-4 border border-primary/5 shadow-sm flex gap-4 text-right">
                    <img src={step.img} className="w-24 h-24 rounded-2xl object-cover border border-primary/5" alt="step" />
                    <div className="flex-1 py-1">
                       <span className="text-[9px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-md">مرحلة {idx + 1}</span>
                       <p className="text-xs font-black text-primary-dark mt-2">{step.desc}</p>
                       <p className="text-[9px] font-bold text-textSecondary mt-1">{step.date}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="bg-white/95 p-8 rounded-[3rem] border-2 border-secondary/20 shadow-xl text-right">
               <h3 className="text-md font-black text-primary-dark mb-6 flex items-center gap-2"><Star className="text-secondary fill-secondary" size={18}/> تقييم المشرف وتوجيهاته</h3>
               
               <label className="text-[10px] font-black text-textSecondary mb-2 block uppercase">ملاحظات طبية للطالب:</label>
               <textarea className="w-full h-28 bg-background border border-primary/5 rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-secondary/30 outline-none mb-6" placeholder="اكتب ملاحظتك هنا لتظهر للطالب فوراً..." />

               <div className="flex flex-wrap items-center justify-between gap-4 bg-background/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                     <span className="text-xs font-black text-primary-dark">العلامة الحالية:</span>
                     <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-primary/5">
                        <input 
                          type="number" 
                          value={grade}
                          onChange={handleGradeChange}
                          className="w-10 bg-transparent text-center font-black text-primary text-lg outline-none" 
                          placeholder="0"
                        />
                        <span className="text-xs font-bold text-textSecondary border-r pr-2">/ 10</span>
                     </div>
                  </div>
                  <button className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">إرسال الملاحظات</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorReview;