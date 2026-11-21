import React, { useState } from 'react';
import { Search, Filter, MapPin, Stethoscope, Star, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // <--- هذا هو السطر الناقص الذي يسبب الخطأ

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // بيانات وهمية للطلاب (ستأتي من قاعدة البيانات لاحقاً)
  const students = [
    { id: 1, name: "أحمد المحمد", university: "جامعة دمشق", specialty: "جراحة فكية", rating: 4.9, cases: "قلع حكمة", image: "A" },
    { id: 2, name: "سارة العلي", university: "الجامعة الدولية", specialty: "مداواة لبيّة", rating: 4.8, cases: "سحب عصب", image: "S" },
    { id: 3, name: "ليلى حسن", university: "جامعة دمشق", specialty: "طبيب أسنان عام", rating: 4.7, cases: "تنظيف لثة", image: "L" },
    { id: 3, name: "ليل ان", university: "جامعة حلب", specialty: "طبيب أسنان عام", rating: 4.7, cases: "تنظيف لثة", image: "L" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20" dir="rtl">
      {/* هيدر الصفحة مع البحث */}
      <div className="bg-primary-dark pt-32 pb-20 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl font-black text-white mb-4 italic">ابحث عن طبيبك المناسب</h1>
          <p className="text-white/60 mb-10 font-medium">احجز موعدك الآن مع نخبة من طلاب كليات طب الأسنان المتميزين</p>
          
          {/* شريط البحث الاحترافي */}
          <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-secondary transition-colors" size={24} />
            <input 
              type="text"
              placeholder="ابحث عن حالة طبية (مثلاً: سحب عصب، تبييض...)"
              className="w-full bg-white py-5 pr-14 pl-6 rounded-2xl text-primary-dark font-bold shadow-2xl focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all border-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* قسم الفلترة والنتائج */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-primary/5 mb-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-xl border border-primary/10">
              <Filter size={18} className="text-secondary" />
              <span className="text-sm font-bold text-primary-dark">تصفية حسب:</span>
            </div>
            
            {/* فلتر الجامعة */}
            <select 
              className="bg-background border-none rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-secondary outline-none"
              onChange={(e) => setSelectedUniversity(e.target.value)}
            >
              <option value="all">كل الجامعات</option>
              <option value="damascus">جامعة دمشق</option>
              <option value="international">الجامعة الدولية</option>
            </select>

            {/* فلتر الحالة */}
            <select 
              className="bg-background border-none rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-secondary outline-none"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">كل الحالات</option>
              <option value="surgery">جراحة</option>
              <option value="orthodontics">تقويم</option>
              <option value="endodontics">سحب عصب</option>
            </select>
          </div>
          
          <div className="text-textSecondary text-sm font-medium">
            عرض <span className="text-primary font-black">3</span> أطباء متاحين
          </div>
        </div>

        {/* شبكة بطاقات الطلاب */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student) => (
            <div key={student.id} className="group bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-2xl transition-all border border-primary/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary transition-all group-hover:w-3"></div>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  {student.image}
                </div>
                <div>
                  <h3 className="text-lg font-black text-primary-dark">{student.name}</h3>
                  <p className="text-xs text-secondary font-bold flex items-center gap-1">
                    <MapPin size={12} /> {student.university}
                  </p>
                </div>
                <div className="mr-auto bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold border border-yellow-100">
                  <Star size={12} fill="currentColor" /> {student.rating}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-textSecondary bg-background p-3 rounded-xl">
                  <Stethoscope size={16} className="text-primary" />
                  <span>تخصص: <span className="font-bold text-primary-dark">{student.specialty}</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-textSecondary bg-background p-3 rounded-xl">
                  <Calendar size={16} className="text-primary" />
                  <span>متوفر لـ: <span className="font-bold text-primary-dark">{student.cases}</span></span>
                </div>
              </div>

              {/* زر الحجز المصلح - تم تحويله إلى Link كامل لضمان التنقل */}
<Link 
  to="/booking-details" 
  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group-hover:gap-4 shadow-lg shadow-primary/20"
>
  <span>حجز موعد الآن</span>
  <ChevronRight size={20} className="rotate-180" />
</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;