import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Phone, Info, Image as ImageIcon, ArrowRight, CheckCircle } from 'lucide-react';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const CaseDetails = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [currentStageId, setCurrentStageId] = useState(null);

  const [caseData, setCaseData] = useState({
    patientName: "سامر المصري",
    phone: "0933123456",
    caseName: "سحب عصب ثنايا علوية",
    agreement: "نص بنص (المواد على الطالب)",
    stages: [
      { id: 1, title: "فتح الحجرة اللبية", completed: true, image: null },
      { id: 2, title: "استئصال اللب", completed: false, image: null },
      { id: 3, title: "الحشو النهائي", completed: false, image: null },
    ]
  });

  // دالة التعامل مع اختيار الصورة
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && currentStageId) {
      const imageUrl = URL.createObjectURL(file);
      setCaseData(prev => ({
        ...prev,
        stages: prev.stages.map(s => 
          s.id === currentStageId ? { ...s, image: imageUrl } : s
        )
      }));
    }
  };

  const triggerUpload = (id) => {
    setCurrentStageId(id);
    fileInputRef.current.click(); // يفتح نافذة الملفات برمجياً
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 relative overflow-hidden" dir="rtl">
      <DecorativeBlobs />

      {/* Input مخفي لفتح الكاميرا أو الاستوديو */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* الهيدر وزر الرجوع */}
        <div className="flex items-center justify-between mb-8 px-2">
          <button onClick={() => navigate(-1)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-dark shadow-sm border border-primary/5 active:scale-90 transition-all">
            <ArrowRight size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-black text-primary-dark italic">ملف الحالة</h1>
            <p className="text-[9px] text-secondary font-bold uppercase tracking-widest">تحديثات العمل السريري</p>
          </div>
          <div className="w-12"></div>
        </div>

        {/* معلومات المريض الأساسية */}
        <div className="bg-white/90 p-6 rounded-[2.5rem] shadow-sm border border-primary/5 mb-6">
          <div className="flex items-center gap-4 mb-5 pb-5 border-b border-primary/5">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary font-black text-xl">{caseData.patientName[0]}</div>
            <div>
              <h2 className="text-lg font-black text-primary-dark">{caseData.patientName}</h2>
              <p className="text-xs text-secondary font-bold flex items-center gap-1"><Phone size={12}/> {caseData.phone}</p>
            </div>
          </div>
          <div className="space-y-2">
             <div className="flex items-center gap-3 bg-background/50 p-3 rounded-xl text-[11px] font-bold text-primary-dark">
                <Info size={14} className="text-primary"/> {caseData.caseName}
             </div>
             <div className="bg-green-50/50 p-3 rounded-xl border border-green-100 text-[11px] font-bold text-green-800">
                <span className="opacity-60 block text-[8px]">الاتفاق المالي:</span> {caseData.agreement}
             </div>
          </div>
        </div>

        {/* مراحل العمل */}
        <div className="space-y-4">
          {caseData.stages.map((stage, idx) => (
            <div key={stage.id} className={`bg-white rounded-[2rem] p-5 border-2 transition-all ${!stage.completed && idx === caseData.stages.findIndex(s => !s.completed) ? 'border-secondary shadow-lg' : 'border-transparent opacity-90'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${stage.completed ? 'bg-green-500 text-white' : 'bg-primary/10 text-primary'}`}>
                    {stage.completed ? <CheckCircle size={16}/> : idx + 1}
                  </span>
                  <p className="font-black text-sm text-primary-dark">{stage.title}</p>
                </div>
              </div>

              <div className="flex gap-3">
                {/* عرض الصورة إذا وُجدت */}
                {stage.image ? (
                  <div className="relative group">
                    <img src={stage.image} className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/10 shadow-sm" alt="stage" />
                    <button onClick={() => triggerUpload(stage.id)} className="absolute bottom-1 right-1 bg-white/90 p-1.5 rounded-lg text-primary shadow-sm border border-primary/10">
                      <Camera size={14} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => triggerUpload(stage.id)}
                    className="w-24 h-24 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary/40 active:bg-primary/5 transition-colors bg-background/30"
                  >
                    <Camera size={24} />
                    <span className="text-[9px] mt-1 font-bold">إضافة صورة</span>
                  </button>
                )}
                <div className="w-24 h-24 rounded-2xl bg-slate-50/50 border border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                  <ImageIcon size={20} opacity={0.3} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-10 bg-primary text-white py-5 rounded-[2rem] font-black shadow-xl shadow-primary/20 active:scale-95 transition-all text-sm uppercase tracking-wider">
          إرسال الحالة للأرشيف
        </button>
      </div>
    </div>
  );
};

export default CaseDetails;