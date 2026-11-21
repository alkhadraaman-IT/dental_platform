// src/pages/InstructorDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Calendar, ChevronLeft, 
  GraduationCap, Users, Stethoscope, ClipboardList, X
} from 'lucide-react';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("الكل");
  const [filterDate, setFilterDate] = useState("");

  const specialties = ["الكل", "حشوات", "تقويم", "سحب عصب", "قلع", "جراحة"];

  const [studentsData] = useState([
    { id: "202110500", name: "محمد الحموي", year: "سنة رابعة", caseName: "قلع", date: "2024-05-18", status: "Ongoing" },
    { id: "202010200", name: "ليلى الأحمد", year: "سنة خامسة", caseName: "حشوات", date: "2024-05-15", status: "Completed" },
    { id: "202110900", name: "باسل الخطيب", year: "سنة رابعة", caseName: "تقويم", date: "2024-05-10", status: "Ongoing" },
  ]);

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.includes(searchTerm) || student.id.includes(searchTerm);
    const matchesType = filterType === "الكل" || student.caseName === filterType;
    const matchesDate = filterDate === "" || student.date === filterDate;
    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 relative overflow-hidden" dir="rtl">
      <DecorativeBlobs />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* الهيدر */}
        <div className="mb-10 text-right flex items-center gap-4 bg-white/40 p-5 rounded-[2.5rem] border border-primary/5 backdrop-blur-md shadow-sm">
             <div className="p-3 bg-secondary rounded-2xl text-primary-dark shadow-lg shadow-secondary/20">
                <Users size={24}/>
             </div>
             <div>
               <h1 className="text-xl font-black text-primary-dark italic leading-none">إدارة الطلاب والعيادات</h1>
               <p className="text-[9px] text-secondary font-bold uppercase tracking-widest mt-1">مراقبة الأداء الأكاديمي والسريري</p>
             </div>
        </div>

        {/* أدوات التحكم (ألوان الفلترة الجديدة) */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[3rem] shadow-sm border border-primary/5 mb-8 space-y-6 text-right">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
              <input 
                type="text" 
                placeholder="ابحث بالاسم أو الرقم الجامعي..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-primary/5 rounded-[1.5rem] py-4 pr-12 pl-4 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-right"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
              <input 
                type="date" 
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full bg-background border border-primary/5 rounded-[1.5rem] py-4 pr-12 pl-4 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all text-right"
              />
            </div>
          </div>

          {/* الفلاتر بالألوان الجديدة المريحة (الأزرق والرمادي الفاتح) */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-primary/5">
             <span className="text-[10px] font-black text-textSecondary ml-2 flex items-center gap-1.5">
                <Filter size={14} className="text-primary"/> تصفية حسب القسم:
             </span>
             {specialties.map((type) => (
               <button
                 key={type}
                 onClick={() => setFilterType(type)}
                 className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all border ${
                   filterType === type 
                   ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105 border-primary' 
                   : 'bg-slate-50 text-textSecondary hover:bg-primary/5 border-slate-100 hover:border-primary/10'
                 }`}
               >
                 {type}
               </button>
             ))}
             
             {/* زر مسح الفلاتر المحسن */}
             {(filterType !== "الكل" || filterDate !== "") && (
               <button onClick={() => {setFilterType("الكل"); setFilterDate("");}} className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 mr-2 active:scale-95 transition-all">
                 <X size={14}/> مسح الفلاتر
               </button>
             )}
          </div>
        </div>

        {/* عرض الحالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div 
              key={student.id} 
              onClick={() => navigate(`/instructor-review/${student.id}`)}
              className="bg-white rounded-[2.5rem] p-6 border border-primary/5 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all group cursor-pointer relative overflow-hidden"
            >
              <Stethoscope className="absolute -left-4 -bottom-4 w-24 h-24 opacity-[0.03] -rotate-12 group-hover:scale-110 transition-transform" />

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center font-black text-sm shadow-inner">
                      {student.name[0]}
                   </div>
                   <div className="text-right">
                      <h3 className="text-sm font-black text-primary-dark leading-none group-hover:text-primary transition-colors">{student.name}</h3>
                      <p className="text-[9px] text-textSecondary font-bold mt-1">#{student.id}</p>
                   </div>
                </div>
                <ChevronLeft size={18} className="text-primary/20 group-hover:text-primary group-hover:translate-x-[-5px] transition-all" />
              </div>

              <div className="bg-background/50 rounded-2xl p-4 space-y-3 relative z-10 border border-primary/5 shadow-inner">
                 <div className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-1.5 text-textSecondary font-bold">
                       <ClipboardList size={14} className="text-primary/30"/> النوع:
                    </div>
                    <span className="font-black text-primary bg-primary/5 px-3 py-1 rounded-lg border border-primary/10 tracking-tighter">{student.caseName}</span>
                 </div>
                 
                 <div className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-1.5 text-textSecondary font-bold">
                       <Calendar size={14} className="text-primary/30"/> التاريخ:
                    </div>
                    <span className="font-black text-primary-dark opacity-80">{student.date}</span>
                 </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                 <div className="flex items-center gap-1.5 text-textSecondary opacity-70">
                    <GraduationCap size={14}/>
                    <span className="text-[9px] font-black">{student.year}</span>
                 </div>
                 <div className={`text-[8px] font-black px-3 py-1 rounded-full ${student.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                    {student.status === 'Completed' ? 'تمت المراجعة' : 'بانتظار الإشراف'}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;