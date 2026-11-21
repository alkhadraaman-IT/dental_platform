import React, { useState } from 'react';
import { Calendar, Clock, Plus, Trash2, Save, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const AddAvailability = () => {
  const navigate = useNavigate();
  const { inputs } = theme;

  // أيام الأسبوع
  const daysOfWeek = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "السبت"];
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = ["00", "15", "30", "45"];

  const [availability, setAvailability] = useState([
    { 
      id: Date.now(), 
      day: "الأحد", 
      start: { h: "09", m: "00", p: "AM" }, 
      end: { h: "05", m: "00", p: "PM" }, 
      openStart: false, 
      openEnd: false,
      openDay: false // حالة لفتح قائمة الأيام
    }
  ]);

  // دالة لتبديل القوائم (سواء ساعة أو يوم) لسطر محدد
  const togglePicker = (id, type) => {
    setAvailability(availability.map(slot => {
      if (slot.id === id) {
        return {
          ...slot,
          openStart: type === 'start' ? !slot.openStart : false,
          openEnd: type === 'end' ? !slot.openEnd : false,
          openDay: type === 'day' ? !slot.openDay : false
        };
      }
      return { ...slot, openStart: false, openEnd: false, openDay: false };
    }));
  };

  // دالة لتحديث أي حقل في السطر
  const updateSlot = (id, field, value) => {
    setAvailability(availability.map(slot => 
      slot.id === id ? { ...slot, [field]: value, openDay: false } : slot
    ));
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        
        {/* الهيدر */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm text-primary hover:bg-primary hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
          <h2 className="text-2xl font-black text-primary-dark">إدارة أوقات تواجدك</h2>
        </div>
     
      <DecorativeBlobs />

        <div className="bg-white rounded-[3rem] p-8 shadow-xl shadow-primary/5 border border-primary/5">
          <div className="space-y-6">
            {availability.map((slot) => (
              <div key={slot.id} className="p-6 bg-slate-50/50 rounded-[2.5rem] border border-primary/5 grid grid-cols-1 md:grid-cols-7 gap-4 items-start relative">
                
                {/* اختيار اليوم (Custom Dropdown) لضمان التنسيق */}
                <div className="md:col-span-2 space-y-2 relative">
                  <label className="text-[10px] font-black text-primary mr-2 italic">اليوم</label>
                  <div 
                    onClick={() => togglePicker(slot.id, 'day')}
                    className={`${inputs.primary} bg-white flex items-center justify-between px-4 text-xs font-bold cursor-pointer hover:border-secondary transition-all`}
                  >
                    {slot.day} <ChevronDown size={14} className={`text-primary/30 transition-transform ${slot.openDay ? 'rotate-180' : ''}`} />
                  </div>

                  {slot.openDay && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white shadow-2xl rounded-2xl border border-primary/5 z-[60] overflow-hidden animate-in fade-in slide-in-from-top-1">
                      {daysOfWeek.map((d) => (
                        <div 
                          key={d} 
                          onClick={() => updateSlot(slot.id, 'day', d)}
                          className="px-4 py-3 text-xs font-bold text-primary-dark hover:bg-secondary/20 cursor-pointer transition-colors"
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* من الساعة */}
                <div className="md:col-span-2 space-y-2 relative">
                  <label className="text-[10px] font-black text-primary mr-2 italic">من الساعة</label>
                  <button 
                    onClick={() => togglePicker(slot.id, 'start')}
                    className={`${inputs.primary} w-full bg-white flex items-center gap-2 px-4 text-xs font-black text-primary-dark hover:border-secondary transition-all`}
                  >
                    <Clock size={16} className="text-secondary" />
                    {`${slot.start.h}:${slot.start.m} ${slot.start.p}`}
                  </button>

                  {slot.openStart && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white shadow-2xl rounded-[2rem] border border-primary/5 z-50 p-4 animate-in slide-in-from-top-2">
                      <div className="flex justify-around items-center h-32 overflow-hidden">
                        <div className="flex flex-col overflow-y-auto h-full no-scrollbar snap-y w-1/3 text-center">
                          {hours.map(h => (
                            <div key={h} onClick={() => { slot.start.h = h; setAvailability([...availability]); }} 
                                 className={`py-2 cursor-pointer snap-center font-black ${slot.start.h === h ? 'text-primary text-lg' : 'text-slate-300 text-sm'}`}>{h}</div>
                          ))}
                        </div>
                        <div className="font-black text-primary">:</div>
                        <div className="flex flex-col overflow-y-auto h-full no-scrollbar snap-y w-1/3 text-center">
                          {minutes.map(m => (
                            <div key={m} onClick={() => { slot.start.m = m; setAvailability([...availability]); }}
                                 className={`py-2 cursor-pointer snap-center font-black ${slot.start.m === m ? 'text-primary text-lg' : 'text-slate-300 text-sm'}`}>{m}</div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2">
                          {['AM', 'PM'].map(p => (
                            <button key={p} onClick={() => { slot.start.p = p; setAvailability([...availability]); }}
                                    className={`px-2 py-1 rounded-lg text-[9px] font-black ${slot.start.p === p ? 'bg-secondary text-primary-dark' : 'bg-slate-100 text-slate-400'}`}>{p}</button>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => togglePicker(slot.id, null)} className="w-full mt-3 py-2 bg-primary/5 text-primary text-[10px] font-black rounded-xl">تأكيد</button>
                    </div>
                  )}
                </div>

                {/* إلى الساعة */}
                <div className="md:col-span-2 space-y-2 relative">
                  <label className="text-[10px] font-black text-primary mr-2 italic">إلى الساعة</label>
                  <button 
                    onClick={() => togglePicker(slot.id, 'end')}
                    className={`${inputs.primary} w-full bg-white flex items-center gap-2 px-4 text-xs font-black text-primary-dark hover:border-secondary transition-all`}
                  >
                    <Clock size={16} className="text-secondary" />
                    {`${slot.end.h}:${slot.end.m} ${slot.end.p}`}
                  </button>

                  {slot.openEnd && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white shadow-2xl rounded-[2rem] border border-primary/5 z-50 p-4 animate-in slide-in-from-top-2">
                      <div className="flex justify-around items-center h-32 overflow-hidden">
                        <div className="flex flex-col overflow-y-auto h-full no-scrollbar snap-y w-1/3 text-center">
                          {hours.map(h => (
                            <div key={h} onClick={() => { slot.end.h = h; setAvailability([...availability]); }} 
                                 className={`py-2 cursor-pointer snap-center font-black ${slot.end.h === h ? 'text-primary text-lg' : 'text-slate-300 text-sm'}`}>{h}</div>
                          ))}
                        </div>
                        <div className="font-black text-primary">:</div>
                        <div className="flex flex-col overflow-y-auto h-full no-scrollbar snap-y w-1/3 text-center">
                          {minutes.map(m => (
                            <div key={m} onClick={() => { slot.end.m = m; setAvailability([...availability]); }}
                                 className={`py-2 cursor-pointer snap-center font-black ${slot.end.m === m ? 'text-primary text-lg' : 'text-slate-300 text-sm'}`}>{m}</div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2">
                          {['AM', 'PM'].map(p => (
                            <button key={p} onClick={() => { slot.end.p = p; setAvailability([...availability]); }}
                                    className={`px-2 py-1 rounded-lg text-[9px] font-black ${slot.end.p === p ? 'bg-secondary text-primary-dark' : 'bg-slate-100 text-slate-400'}`}>{p}</button>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => togglePicker(slot.id, null)} className="w-full mt-3 py-2 bg-primary/5 text-primary text-[10px] font-black rounded-xl">تأكيد</button>
                    </div>
                  )}
                </div>

                {/* حذف */}
                <div className="pt-6 flex justify-end">
                   <button onClick={() => setAvailability(availability.filter(s => s.id !== slot.id))}
                    className="p-3 bg-red-50 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                    <Trash2 size={16} />
                  </button>
                </div>

              </div>
            ))}

            <button onClick={() => setAvailability([...availability, { id: Date.now(), day: "الأحد", start: { h: "09", m: "00", p: "AM" }, end: { h: "05", m: "00", p: "PM" }, openDay: false }])}
              className="w-full py-4 border-2 border-dashed border-primary/10 rounded-[2rem] text-primary/40 font-bold text-sm flex items-center justify-center gap-2 hover:border-secondary transition-all">
              <Plus size={18} /> إضافة فترة زمنية
            </button>

            <button 
  onClick={() => navigate('/manage-schedule')} 
  className="w-full bg-primary text-white font-black py-5 rounded-[2rem] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
>
  <Save size={20} /> حفظ الجدول
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAvailability;