import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Calendar, ChevronLeft, School, 
  User, Mail, Phone, Hash, FileSpreadsheet, 
  Download, X, GraduationCap, Activity, Stethoscope, ClipboardList, MapPin, Globe
} from 'lucide-react';
import * as XLSX from 'xlsx';

const UniversityAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("students"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("الكل");
  const [filterCaseType, setFilterCaseType] = useState("الكل");
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [exportType, setExportType] = useState("سحب عصب");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const years = ["الكل", "سنة رابعة", "سنة خامسة", "دراسات"];
  const caseTypes = ["الكل", "حشوات", "سحب عصب", "قلع", "جراحة"];

  // بيانات الجامعة التفصيلية
  const universityDetails = {
    name: "جامعة الرشيد الدولية",
    faculty: "كلية طب الأسنان",
    location: "طريق دمشق - درعا الدولي",
    website: "www.ru.edu.sy",
    contact: "+963 11 6111111",
    totalStudents: 450,
    activeCases: 128
  };

  const [studentsData] = useState([
    { id: "202110500", name: "محمد الحموي", year: "سنة رابعة", phone: "093123456", email: "m@edu.sy", casesCount: 15 },
    { id: "202010200", name: "ليلى الأحمد", year: "سنة خامسة", phone: "094455667", email: "l@edu.sy", casesCount: 22 },
  ]);

  const [casesData] = useState([
    { id: "C101", studentName: "محمد الحموي", studentId: "202110500", type: "سحب عصب", date: "2025-07-10", status: "بانتظار الإشراف" },
    { id: "C102", studentName: "ليلى الأحمد", studentId: "202010200", type: "حشوات", date: "2025-08-15", status: "تمت المراجعة" },
  ]);

  const exportToExcel = () => {
    if (!startDate || !endDate) return alert("يرجى تحديد النطاق الزمني");
    const dataToExport = casesData.filter(c => c.type === exportType && c.date >= startDate && c.date <= endDate);
    if (dataToExport.length === 0) return alert("لا يوجد بيانات");
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    XLSX.writeFile(workbook, `تقرير_${exportType}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-[#FBFDFF] pb-24 px-4 pt-10 font-sans" dir="rtl">
      
      {/* CSS لإخفاء شريط التمرير برمجياً */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* هيدر ومعلومات الجامعة (المطور) */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary text-white rounded-[1.8rem] shadow-xl shadow-primary/20">
                <School size={32}/>
              </div>
              <div className="text-right">
                <h1 className="text-xl font-black text-slate-800 italic">{universityDetails.name}</h1>
                <p className="text-xs font-bold text-primary">{universityDetails.faculty}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
               <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-500">
                  <MapPin size={12} className="text-primary"/> {universityDetails.location}
               </div>
               <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-500">
                  <Globe size={12} className="text-primary"/> {universityDetails.website}
               </div>
            </div>
          </div>
          
          {/* إحصائيات سريعة للجامعة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-50 text-right">
             <div>
                <p className="text-[9px] font-black text-slate-400 uppercase">إجمالي الطلاب</p>
                <p className="text-lg font-black text-slate-700">{universityDetails.totalStudents}</p>
             </div>
             <div>
                <p className="text-[9px] font-black text-slate-400 uppercase">حالات قيد المعالجة</p>
                <p className="text-lg font-black text-primary">{universityDetails.activeCases}</p>
             </div>
          </div>
        </div>

        {/* قسم استخراج الأكسل */}
        <div className="bg-emerald-50/50 p-6 rounded-[2.5rem] border border-emerald-100 shadow-sm">
          <h3 className="text-xs font-black text-emerald-800 mb-4 flex items-center gap-2 text-right">
            <FileSpreadsheet size={16}/> وحدة تقارير العلامات (XLSX)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select value={exportType} onChange={(e) => setExportType(e.target.value)} className="bg-white rounded-xl p-3 text-[11px] font-bold border-none shadow-sm outline-none cursor-pointer">
              {caseTypes.filter(t => t !== "الكل").map(t => <option key={t}>{t}</option>)}
            </select>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-white rounded-xl p-3 text-[11px] font-bold border-none shadow-sm outline-none"/>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-white rounded-xl p-3 text-[11px] font-bold border-none shadow-sm outline-none"/>
            <button onClick={exportToExcel} className="bg-emerald-600 text-white rounded-xl font-black text-[11px] p-3 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 active:scale-95">
              <Download size={14}/> استخراج التقرير
            </button>
          </div>
        </div>

        {/* التبويبات */}
        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl gap-2">
          <button onClick={() => setActiveTab("students")} className={`flex-1 py-3 rounded-xl text-[11px] font-black transition-all ${activeTab === 'students' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:bg-white/40'}`}>
            دليل الطلاب
          </button>
          <button onClick={() => setActiveTab("cases")} className={`flex-1 py-3 rounded-xl text-[11px] font-black transition-all ${activeTab === 'cases' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:bg-white/40'}`}>
            طلبات الإشراف
          </button>
        </div>

        {/* البحث والفلترة */}
        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" placeholder="ابحث بالاسم أو الرقم الجامعي..." 
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pr-12 text-[11px] font-bold outline-none text-right shadow-inner"
            />
          </div>
          
          {/* فلتر بدون شريط تمرير بشع */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {(activeTab === "students" ? years : caseTypes).map(item => (
              <button 
                key={item} 
                onClick={() => activeTab === "students" ? setFilterYear(item) : setFilterCaseType(item)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all shadow-sm active:scale-90 ${(activeTab === "students" ? filterYear : filterCaseType) === item ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* عرض الكروت */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-right">
          {activeTab === "students" ? (
            studentsData.filter(s => (s.name.includes(searchTerm) || s.id.includes(searchTerm)) && (filterYear === "الكل" || s.year === filterYear)).map(student => (
              <div key={student.id} onClick={() => setSelectedStudent(student)} className="bg-white p-5 rounded-[2.2rem] border border-slate-100 flex items-center justify-between hover:border-primary/30 transition-all cursor-pointer group shadow-sm active:scale-95">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center font-black group-hover:bg-primary group-hover:text-white transition-colors text-sm">{student.name[0]}</div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{student.name}</h4>
                    <p className="text-[9px] font-bold text-slate-400 italic">ID: {student.id}</p>
                  </div>
                </div>
                <ChevronLeft size={16} className="text-slate-300 group-hover:text-primary transition-all" />
              </div>
            ))
          ) : (
            casesData.filter(c => (c.studentName.includes(searchTerm) || c.studentId.includes(searchTerm)) && (filterCaseType === "الكل" || c.type === filterCaseType)).map(c => (
              <div 
                key={c.id} 
                onClick={() => navigate(`/instructor-review/${c.studentId}`)}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer group active:scale-95"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-secondary/10 text-secondary-dark rounded-2xl group-hover:bg-secondary group-hover:text-primary transition-all"><Stethoscope size={20}/></div>
                  <span className={`text-[8px] font-black px-3 py-1 rounded-full ${c.status === 'تمت المراجعة' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{c.status}</span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 group-hover:text-primary transition-colors">{c.studentName}</h4>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-lg">{c.type}</span>
                    <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1"><Calendar size={12}/> {c.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* نافذة الطالب (Modal) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md bg-black/30 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-8 shadow-2xl relative text-right">
            <button onClick={() => setSelectedStudent(null)} className="absolute left-6 top-6 p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-red-500 transition-colors"><X size={20}/></button>
            
            <div className="flex flex-col items-center mb-8 pt-4">
               <div className="w-20 h-20 bg-primary/5 text-primary rounded-[2.2rem] flex items-center justify-center mb-4 border-2 border-primary/10 shadow-inner"><User size={40}/></div>
               <h3 className="text-lg font-black text-slate-800">{selectedStudent.name}</h3>
               <p className="text-[10px] font-black text-secondary uppercase tracking-widest">{selectedStudent.year}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                <Hash className="text-primary/40" size={18}/>
                <p className="text-xs font-black text-slate-600 tracking-widest">{selectedStudent.id}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                <Phone className="text-primary/40" size={18}/>
                <p className="text-xs font-black text-slate-600">{selectedStudent.phone}</p>
              </div>
              
              <div className="flex justify-between items-center px-2 pt-2 border-t border-slate-100">
                 <span className="text-xs font-bold text-slate-500">إجمالي الحالات المسجلة:</span>
                 <span className="text-xl font-black text-emerald-600">{selectedStudent.casesCount} حالة</span>
              </div>

              {/*<button 
                onClick={() => navigate(`/instructor-review/${selectedStudent.id}`)}
                className="w-full mt-4 bg-primary text-white py-4 rounded-2xl font-black text-[11px] shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <ClipboardList size={16}/> دخول إلى سجل حالات الطالب
              </button>*/}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityAdminDashboard;