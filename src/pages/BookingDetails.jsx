// src/pages/BookingDetails.jsx
import React, { useState } from 'react';
import { Calendar, Clock, ShieldCheck, MapPin, Star, ChevronLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingDetails = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // بيانات تجريبية للأيام المتاحة
  const availableDays = [
    { id: 1, name: "الأحد", date: "14 مايو" },
    { id: 2, name: "الاثنين", date: "15 مايو" },
    { id: 3, name: "الأربعاء", date: "17 مايو" },
  ];

  // أوقات الدوام في العيادات الجامعية
  const timeSlots = ["09:00 ص", "10:30 ص", "12:00 م", "01:30 م"];

  const handleConfirmBooking = () => {
    if (selectedDay && selectedTime) {
      alert(`تم طلب الموعد بنجاح يوم ${selectedDay.name} الساعة ${selectedTime}. بانتظار تأكيد الطالب.`);
      navigate('/my-bookings');
    } else {
      alert("يرجى اختيار اليوم والوقت أولاً");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-12 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* العمود الأول: بطاقة تعريف الطالب */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-primary/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full -mr-12 -mt-12"></div>
            
            <div className="w-24 h-24 bg-primary/10 rounded-3xl mx-auto flex items-center justify-center text-primary text-3xl font-black mb-4">
              A
            </div>
            <h2 className="text-2xl font-black text-primary-dark mb-1">أحمد المحمد</h2>
            <p className="text-secondary font-bold text-sm mb-4 flex items-center justify-center gap-1">
              <ShieldCheck size={16} /> طالب سنة رابعة - جامعة دمشق
            </p>
            
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-6">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
              <span className="text-textSecondary text-xs mr-2">(42 تقييم)</span>
            </div>

            <div className="space-y-4 text-right bg-background p-4 rounded-2xl border border-primary/5">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-xs text-textSecondary">مكان العلاج</p>
                  <p className="text-sm font-bold text-primary-dark">عيادات كلية طب الأسنان - المزة</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Info size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-xs text-textSecondary">نوع الحالات التي يستقبلها</p>
                  <p className="text-sm font-bold text-primary-dark">حشوات تجميلية، تنظيف لثة، قلع بسيط</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* العمود الثاني والثالث: اختيار الموعد */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-primary/5">
            <h3 className="text-xl font-black text-primary-dark mb-8 flex items-center gap-3">
              <Calendar className="text-secondary" /> تحديد موعد الزيارة
            </h3>

            {/* اختيار اليوم */}
            <div className="mb-10">
              <p className="text-sm font-bold text-textSecondary mb-4">الأيام المتاحة هذا الأسبوع:</p>
              <div className="grid grid-cols-3 gap-4">
                {availableDays.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day)}
                    className={`p-4 rounded-2xl border-2 transition-all text-center ${
                      selectedDay?.id === day.id 
                      ? 'border-secondary bg-secondary/5 shadow-inner' 
                      : 'border-background hover:border-primary/20'
                    }`}
                  >
                    <p className={`text-sm font-black ${selectedDay?.id === day.id ? 'text-secondary-dark' : 'text-primary-dark'}`}>{day.name}</p>
                    <p className="text-xs text-textSecondary">{day.date}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* اختيار الوقت */}
            <div className="mb-10">
              <p className="text-sm font-bold text-textSecondary mb-4 flex items-center gap-2">
                <Clock size={16} /> الأوقات المتاحة:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all ${
                      selectedTime === time 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-background text-primary-dark hover:bg-primary/10'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* زر الحجز النهائي */}
            <div className="pt-6 border-t border-primary/5">
              <button 
                onClick={handleConfirmBooking}
                className="w-full bg-secondary hover:bg-secondary-dark text-primary-dark font-black py-5 rounded-[2rem] shadow-xl shadow-secondary/20 flex items-center justify-center gap-3 transition-all"
              >
                تأكيد طلب الموعد
                <ChevronLeft size={20} />
              </button>
              <p className="text-center text-[10px] text-textSecondary mt-4 uppercase tracking-widest font-bold italic">
                * ملاحظة: الموعد يحتاج موافقة الطالب لتأكيده نهائياً
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingDetails;