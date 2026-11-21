// src/pages/PatientCaseView.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, User, Sparkles, ChevronLeft } from 'lucide-react';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const PatientCaseView = () => {
  const navigate = useNavigate();

  const caseData = {
    studentName: "أحمد المحمد",
    university: "جامعة دمشق - كلية طب الأسنان",
    caseName: "حشوة تجميلية للثنايا",
    stages: [
      { 
        id: 1, 
        title: "تحضير السن وتنظيف النخر", 
        completed: true, 
        date: "14 مايو",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400" // صورة المرحلة 1
      },
      { 
        id: 2, 
        title: "تطبيق المادة اللاصقة والحشوة", 
        completed: true, 
        date: "16 مايو",
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400" // صورة المرحلة 2
      },
      { 
        id: 3, 
        title: "إنهاء وتلميع الحشوة", 
        completed: false, 
        date: "الجلسة القادمة",
        image: null // لم تنجز بعد فلا توجد صورة
      },
    ]
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 relative overflow-hidden" dir="rtl">
      <DecorativeBlobs />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* هيدر */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/5 active:scale-90 transition-all">
            <ArrowRight size={24} />
          </button>
          <h1 className="text-xl font-black text-primary-dark italic text-right flex-1">تفاصيل رحلة علاجي</h1>
        </div>

        {/* كرت الطبيب */}
        <div className="bg-white/90 p-6 rounded-[2.5rem] shadow-sm border border-primary/5 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary font-black text-xl">
               {caseData.studentName[0]}
            </div>
            <div>
              <h2 className="text-lg font-black text-primary-dark text-right">د. {caseData.studentName}</h2>
              <p className="text-[10px] text-textSecondary font-bold text-right">{caseData.university}</p>
            </div>
          </div>
          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/5 flex items-center justify-between">
             <div className="text-right">
                <p className="text-[9px] text-primary font-black uppercase mb-0.5">المعالجة الحالية:</p>
                <p className="text-xs font-bold text-primary-dark">{caseData.caseName}</p>
             </div>
             <Sparkles className="text-secondary" size={20} />
          </div>
        </div>

        {/* مراحل الإنجاز مع الصور */}
        <h3 className="text-md font-black text-primary-dark mb-6 mr-2 text-right">خطوات العلاج المنجزة</h3>
        
        <div className="space-y-6 relative before:absolute before:right-[20px] before:top-0 before:bottom-0 before:w-0.5 before:bg-primary/5">
          {caseData.stages.map((stage) => (
            <div key={stage.id} className="relative pr-12 text-right">
              {/* نقطة المرحلة على الخط الزمني */}
              <div className={`absolute right-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center z-10 border-4 border-background ${stage.completed ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {stage.completed ? <CheckCircle size={20}/> : <Clock size={20}/>}
              </div>

              <div className={`bg-white rounded-[2rem] p-5 shadow-sm border-t-4 transition-all ${stage.completed ? 'border-green-500' : 'border-slate-200 opacity-70'}`}>
                <div className="flex flex-col md:flex-row gap-5">
                  
                  {/* قسم الصورة */}
                  {stage.image ? (
                    <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/5 shadow-inner flex-shrink-0">
                      <img src={stage.image} className="w-full h-full object-cover" alt="عمل الطبيب" />
                    </div>
                  ) : (
                    <div className="w-full md:w-32 h-32 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 flex-shrink-0">
                      <Clock size={24} />
                      <span className="text-[8px] mt-2 font-bold uppercase">قيد الانتظار</span>
                    </div>
                  )}

                  {/* قسم النص */}
                  <div className="flex-1 py-2">
                    <p className={`font-black text-sm mb-1 ${stage.completed ? 'text-green-700' : 'text-primary-dark'}`}>
                      {stage.title}
                    </p>
                    <p className="text-[10px] font-bold text-textSecondary bg-background px-2 py-1 rounded-lg inline-block">
                      {stage.date}
                    </p>
                    {stage.completed && (
                      <div className="mt-3 flex items-center gap-1 text-green-600 text-[10px] font-black italic">
                        <Sparkles size={12}/> تم الإنجاز بنجاح
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* رسالة أسفل الصفحة */}
        <div className="mt-12 text-center p-6 bg-white/50 rounded-[2.5rem] border border-dashed border-primary/10">
           <p className="text-xs font-black text-textSecondary italic">"ابتسامتك هي أولويتنا القصوى"</p>
        </div>
      </div>
    </div>
  );
};

export default PatientCaseView;