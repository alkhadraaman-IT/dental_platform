import React, { useState } from 'react';
import { Calendar, Clock, Edit2, Trash2, Plus, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const ManageSchedule = () => {
  const navigate = useNavigate();
  const { buttons } = theme;

  const [mySlots, setMySlots] = useState([
    { id: 1, day: "الأحد", start: "13:00", end: "14:00", active: true },
    { id: 2, day: "الاثنين", start: "10:00", end: "12:00", active: true },
  ]);

  const deleteSlot = (id) => {
    if(window.confirm("هل أنت متأكد من حذف هذا الوقت؟")) {
      setMySlots(mySlots.filter(s => s.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setMySlots(mySlots.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        
              <DecorativeBlobs />

        {/* رأس الصفحة مع زر الرجوع */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 bg-white rounded-2xl shadow-sm text-primary hover:bg-primary hover:text-white transition-all shrink-0"
            >
              <ChevronRight size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-black text-primary-dark flex items-center gap-2">
                <Clock className="text-secondary" size={24} /> جدول أوقاتي الحالية
              </h2>
              <p className="text-[10px] text-textSecondary font-bold mt-1 mr-1">تفعيل أو تعطيل الأوقات بضغطة واحدة</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/add-availability')}
            className={`${buttons.primary} py-3 px-6 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-primary/20 self-start md:self-center mr-auto md:mr-0 ml-0`}
          >
            <Plus size={18} /> إضافة موعد جديد
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mySlots.length > 0 ? (
            mySlots.map((slot) => (
              <div 
                key={slot.id}
                className={`bg-white rounded-[2rem] p-5 border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-6 ${
                  slot.active ? 'border-primary/5 shadow-xl shadow-primary/5' : 'border-dashed border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className={`w-14 h-14 rounded-2xl ${slot.active ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'} flex items-center justify-center`}>
                    <Calendar size={24} />
                  </div>
                  <div className="text-right">
                    <h4 className="font-black text-primary-dark text-lg">{slot.day}</h4>
                    <p className="text-xs font-bold text-textSecondary flex items-center gap-1">
                      <Clock size={12} /> من {slot.start} إلى {slot.end}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
                  <button 
                    onClick={() => toggleStatus(slot.id)}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-xl font-bold text-[10px] transition-all flex items-center justify-center gap-2 ${
                      slot.active ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {slot.active ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    {slot.active ? 'متاح' : 'معطل'}
                  </button>

                  <button onClick={() => navigate('/add-availability')} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                    <Edit2 size={16} />
                  </button>

                  <button onClick={() => deleteSlot(slot.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <Calendar size={40} className="mx-auto mb-4 text-slate-300" />
              <h3 className="font-black text-slate-400">لا يوجد مواعيد</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSchedule;