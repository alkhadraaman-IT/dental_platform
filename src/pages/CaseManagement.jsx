// src/pages/CaseManagement.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, Clock, Camera, Phone, Info,
  Save, Trash2, Edit3, Image as ImageIcon, Send, Sparkles, MessageCircle, Star
} from 'lucide-react';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const CaseManagement = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activeStageId, setActiveStageId] = useState(null);

  // بيانات الحالة المدمجة (معلومات المريض + مراحل العمل)
  const [caseData, setCaseData] = useState({
    patientName: "سامر المصري",
    phone: "0933123456",
    caseName: "سحب عصب ثنايا علوية",
    agreement: "نص بنص (المواد على الطالب)",
    status: "active",
    stages: [
      { id: 1, title: "فتح الحجرة اللبية", completed: true, image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400" },
      { id: 2, title: "استئصال اللب وتنظيف القنوات", completed: false, image: null },
      { id: 3, title: "الحشو النهائي والختم", completed: false, image: null },
    ]
  });

const handlePrint = () => {
  window.print();
};

const toggleStage = (id) => {
    setCaseData(prev => ({
      ...prev,
      stages: prev.stages.map(s => s.id === id ? { ...s, completed: !s.completed } : s)
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && activeStageId) {
      const url = URL.createObjectURL(file);
      setCaseData(prev => ({
        ...prev,
        stages: prev.stages.map(s => s.id === activeStageId ? { ...s, image: url } : s)
      }));
    }
  };

  const triggerUpload = (id) => {
    setActiveStageId(id);
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 relative overflow-hidden" dir="rtl">
      <DecorativeBlobs />
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* الهيدر المطور */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/5 active:scale-90 transition-all">
            <ArrowRight size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-black text-primary-dark italic">إدارة الحالة</h1>
            <p className="text-[9px] text-secondary font-bold uppercase tracking-widest mt-1">تحديث ملف العمل السريري</p>
          </div>
          <button 
  onClick={handlePrint}
  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-500 shadow-sm border border-green-50 active:scale-90 hover:bg-green-50 transition-all print:hidden"
  title="طباعة الحالة PDF"
>
  <Save size={20} />
</button>
        </div>

        {/* كرت المريض (مأخوذ من جمالية CaseDetails) */}
        <div className="bg-white/90 p-6 rounded-[2.5rem] shadow-sm border border-primary/5 mb-8">
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-primary/5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary font-black text-xl">{caseData.patientName[0]}</div>
              <div className="text-right">
                <h2 className="text-lg font-black text-primary-dark">{caseData.patientName}</h2>
                <p className="text-xs text-secondary font-bold flex items-center gap-1"><Phone size={12}/> {caseData.phone}</p>
              </div>
            </div>
            <div className="bg-green-50 text-green-600 px-4 py-1.5 rounded-xl text-[10px] font-black border border-green-100 shadow-sm">حالة نشطة</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             <div className="flex items-center gap-3 bg-background/50 p-3 rounded-2xl text-[11px] font-bold text-primary-dark border border-primary/5">
                <Info size={14} className="text-primary"/> {caseData.caseName}
             </div>
             <div className="bg-secondary/5 p-3 rounded-2xl border border-secondary/10 text-[11px] font-bold text-primary-dark flex items-center gap-2">
                <Sparkles size={14} className="text-secondary"/>
                <span>{caseData.agreement}</span>
             </div>
          </div>
        </div>

        {/* قائمة المراحل التفاعلية (قوة CaseManagement) */}
        <div className="space-y-6">
          <h3 className="text-sm font-black text-primary-dark mr-2 flex items-center gap-2">
            <Edit3 size={16} className="text-primary"/> تسجيل مراحل الإنجاز
          </h3>
          
          {caseData.stages.map((stage, idx) => (
            <div key={stage.id} className={`bg-white rounded-[2.5rem] p-6 border-2 transition-all ${stage.completed ? 'border-green-500 shadow-lg shadow-green-50' : 'border-transparent shadow-sm opacity-90'}`}>
              <div className="flex flex-col gap-5">
                
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black ${stage.completed ? 'bg-green-500 text-white' : 'bg-primary/5 text-primary'}`}>
                        {stage.completed ? <CheckCircle size={16}/> : `0${idx+1}`}
                      </span>
                      <h4 className="font-black text-primary-dark text-sm leading-none">{stage.title}</h4>
                   </div>
                   <button 
                    onClick={() => toggleStage(stage.id)}
                    className={`px-4 py-2 rounded-xl font-black text-[10px] transition-all border ${stage.completed ? 'bg-green-500 text-white border-green-600' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'}`}
                   >
                      {stage.completed ? 'تم الإنجاز' : 'اعتماد الخطوة'}
                   </button>
                </div>

                <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                  {stage.image ? (
                    <div className="relative group min-w-[120px]">
                      <img src={stage.image} className="w-32 h-32 object-cover rounded-3xl border border-primary/5 shadow-sm" alt="clinical" />
                      <button 
                        onClick={() => triggerUpload(stage.id)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white rounded-3xl transition-opacity backdrop-blur-sm"
                      >
                        <Camera size={20} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => triggerUpload(stage.id)}
                      className="w-32 h-32 rounded-3xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary/40 bg-primary/5 active:scale-95 transition-all"
                    >
                      <Camera size={24} />
                      <span className="text-[9px] mt-2 font-black uppercase">التقاط صورة</span>
                    </button>
                  )}
                  {/* تلميح بصري للمكان المخصص للصورة التالية */}
                  {!stage.image && (
                    <div className="w-32 h-32 rounded-3xl border border-dashed border-slate-100 flex items-center justify-center text-slate-200">
                      <ImageIcon size={20} opacity={0.2} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>


{/* قسم ملاحظات الأستاذ (يظهر للطالب فقط إذا كتب الأستاذ شيئاً) */}
<div className="mt-8 bg-secondary/10 p-6 rounded-[2.5rem] border-2 border-secondary/20 relative overflow-hidden group">
  <div className="absolute top-0 left-0 w-20 h-20 bg-secondary/5 rounded-full -ml-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
  
  <div className="flex items-center gap-3 mb-4 relative z-10">
    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm">
      <MessageCircle size={20} />
    </div>
    <div className="text-right">
      <h4 className="text-[11px] font-black text-primary-dark leading-none">توجيهات الأستاذ المشرف</h4>
      <p className="text-[8px] text-secondary font-bold uppercase mt-1 tracking-tighter">آخر تحديث: منذ ساعة</p>
    </div>
  </div>

  <div className="bg-white/60 p-4 rounded-2xl border border-white relative z-10">
     <p className="text-xs font-bold text-primary-dark leading-relaxed text-right">
        {/* هنا تظهر الملاحظة القادمة من Firestore (Instructor_Note) */}
        "يرجى الانتباه إلى زاوية التصوير الشعاعي في المرحلة القادمة، وتأكد من جفاف السن تماماً قبل وضع الحشوة."
     </p>
  </div>

  <div className="mt-4 flex justify-end gap-2 relative z-10">
    <div className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-lg font-black text-[9px]">
      <Star size={12} fill="white"/>
      تقييم الأستاذ: 8 / 10
    </div>
  </div>
</div>

        {/* أزرار الإجراءات النهائية */}
        <div className="mt-12 grid grid-cols-2 gap-4 print:hidden">
   <button 
     onClick={() => {
       alert("تم إرسال الحالة للأرشيف بنجاح!");
       navigate('/student-dashboard'); // التوجيه للوحة التحكم
     }}
     className="bg-primary text-white py-5 rounded-[2rem] font-black text-[11px] shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
   >
      <Send size={16} /> إنهاء الحالة وأرشفة
   </button>
   
   <button 
     onClick={() => {
       if(window.confirm("هل أنت متأكد من إلغاء هذه الحالة؟ سيتم حذف البيانات.")) {
         navigate('/student-dashboard'); // التوجيه للوحة التحكم
       }
     }}
     className="bg-red-50 text-red-500 py-5 rounded-[2rem] font-black text-[11px] border border-red-100 active:scale-95 transition-all flex items-center justify-center gap-2"
   >
      <Trash2 size={16} /> إلغاء هذه الحالة
   </button>
</div>
      </div>
    </div>
  );
};

export default CaseManagement;