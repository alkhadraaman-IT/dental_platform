import React, { useState, useRef } from 'react';
import { 
  ChevronRight, Save, User, Mail, Phone, 
  Camera, Hash, GraduationCap, Stethoscope, X, Lock, Search, ChevronDown 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ role }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // مرجع لحقل اختيار الملف الخفي
  const isStudent = role === 'student';

  // قائمة التخصصات المتاحة للاختيار (يمكن جلبها من API مستقبلاً)
  const availableSpecialties = [
    "حشوات تجميلية", "قلع أسنان بسيط", "قلع جراحي", 
    "معالجة لبية (سحب عصب)", "تنظيف لثة وتجريف", 
    "تعويضات ثابتة (يجسر)", "تعويضات متحركة", "طب أسنان أطفال"
  ];

  const [userData, setUserData] = useState({
    name: "أمان الإبداع",
    email: "aman@creative.studio",
    phone: "0930123456",
    university: "جامعة الرشيد الدولية",
    university_id: "202110543",
    year: "السنة الرابعة",
    specialties: ["حشوات تجميلية", "قلع أسنان بسيط"],
    profile_image: null, // لتخزين رابط الصورة المؤقت للمعايير
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // دالة التعامل مع اختيار الصورة
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profile_image: reader.result }); // تخزين الصورة كـ Base64 للعرض المؤقت
      };
      reader.readAsDataURL(file);
    }
  };

  // دالة إضافة تخصص من القائمة
  const handleSelectSpecialty = (spec) => {
    if (!userData.specialties.includes(spec)) {
      setUserData({
        ...userData,
        specialties: [...userData.specialties, spec]
      });
    }
    setIsDropdownOpen(false); // إغلاق القائمة بعد الاختيار
    setSearchTerm(""); // تصفير البحث
  };

  const handleSave = (e) => {
    e.preventDefault();
    // هنا يتم إرسال userData (بما فيها الصورة كـ Base64 أو الملف نفسه) إلى السيرفر
    console.log("البيانات الجاهزة للحفظ:", userData);
    navigate('/profile');
  };

  // تصفية التخصصات بناءً على البحث
  const filteredSpecialties = availableSpecialties.filter(spec => 
    spec.toLowerCase().includes(searchTerm.toLowerCase()) && !userData.specialties.includes(spec)
  );

  return (
    <div className="min-h-screen bg-background pt-28 pb-12 px-4 relative" dir="rtl">
      {/* إغلاق القائمة المنسدلة عند الضغط خارجها */}
      {isDropdownOpen && <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>}

      <div className="max-w-2xl mx-auto z-20 relative">
        
        {/* الهيدر */}
        <div className="flex items-center gap-4 mb-8 text-right">
          <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-2xl shadow-sm text-primary hover:bg-primary hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
          <h2 className="text-2xl font-black text-primary-dark">تعديل الملف الشخصي</h2>
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-primary/5 border border-primary/5 text-right relative z-20">
          
          {/* قسم الصورة الشخصية واختيارها */}
          <div className="flex justify-center mb-10 relative z-30">
            <div className="relative group">
              {/* عرض الصورة أو الأيقونة الافتراضية */}
              <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-primary border-4 border-white shadow-2xl overflow-hidden ring-4 ring-primary/5 active:scale-95 transition-all">
                {userData.profile_image ? (
                  <img src={userData.profile_image} className="w-full h-full object-cover" alt="profile" />
                ) : (
                  <User size={60} className="opacity-50" />
                )}
              </div>
              
              {/* زر الكاميرا العائم لاختيار الصورة */}
              <button 
                type="button"
                onClick={() => fileInputRef.current.click()} // تفعيل حقل الملف الخفي
                className="absolute -bottom-2 -left-2 p-3 bg-secondary text-primary-dark rounded-2xl shadow-lg border-2 border-white hover:bg-secondary-dark transition-colors hover:scale-110 active:scale-95"
                title="تغيير الصورة الشخصية"
              >
                <Camera size={20} />
              </button>

              {/* حقل اختيار الملف الخفي (Hidden Input) */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>

          {/* قسم الهوية الجامعية (للقراءة فقط) */}
          {isStudent && (
            <div className="mb-10 p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 relative overflow-hidden">
              <div className="absolute left-[-10px] top-[-10px] opacity-5 rotate-12">
                <GraduationCap size={120} />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                     <Lock size={10} /> بيانات أكاديمية موثقة
                   </span>
                   <span className="text-xs font-bold text-slate-400">{userData.university}</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 mb-1">الرقم الجامعي</p>
                    <p className="text-lg font-black text-primary-dark tracking-widest">{userData.university_id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 mb-1">المستوى الحالي</p>
                    <p className="text-lg font-black text-primary-dark">{userData.year}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6 relative z-20">
            {/* الحقول المسموح بتعديلها */}
            <div className="space-y-4 relative z-20">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary mr-2 italic">الاسم الكامل (كما يظهر للعامة)</label>
                <input 
                  type="text" 
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-secondary focus:bg-white outline-none transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary mr-2 italic">رقم التواصل</label>
                  <input 
                    type="text" 
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-secondary focus:bg-white outline-none transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-primary mr-2 italic">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-secondary focus:bg-white outline-none transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* قسم التخصصات (للطالب فقط) - القائمة المنسدلة الأنيقة */}
            {isStudent && (
              <div className="space-y-4 pt-4 relative z-[25]">
                <label className="text-[10px] font-black text-primary mr-2 italic flex items-center gap-1">
                  <Stethoscope size={12} /> تحديث مهاراتك السريرية
                </label>
                
                {/* الحقل الأساسي المنبثق (الذي يشبه الـ Select) */}
                <div className="relative z-[26]">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-500 flex items-center justify-between cursor-pointer hover:border-secondary/30 hover:bg-white transition-all shadow-inner"
                  >
                    <span>اختر التخصصات التي تتقنها...</span>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-secondary' : 'text-slate-400'}`} />
                  </div>

                  {/* القائمة المنسدلة الفعلية (Modal/Dropdown) */}
                  {isDropdownOpen && (
                    <div className="absolute top-[110%] left-0 right-0 bg-white shadow-2xl rounded-2xl border border-primary/5 z-[30] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                      {/* حقل البحث داخل القائمة */}
                      <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                        <Search size={16} className="text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="ابحث عن تخصص..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="flex-1 bg-transparent border-none text-xs font-bold outline-none"
                        />
                      </div>
                      
                      {/* خيارات التخصصات */}
                      <div className="max-h-60 overflow-y-auto no-scrollbar py-2">
                        {filteredSpecialties.length > 0 ? filteredSpecialties.map((spec, index) => (
                          <div 
                            key={index}
                            onClick={() => handleSelectSpecialty(spec)}
                            className="px-5 py-3 text-xs font-bold text-primary-dark hover:bg-secondary/10 cursor-pointer transition-colors"
                          >
                            {spec}
                          </div>
                        )) : (
                          <div className="text-center py-4 text-xs font-medium text-slate-400">لا توجد تخصصات غير مختارة تطابق بحثك</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* عرض التخصصات المختارة كـ Tags تحت القائمة */}
                <div className="flex flex-wrap gap-2 mt-3 relative z-20">
                  {userData.specialties.map((s, i) => (
                    <span key={i} className="bg-primary hover:bg-primary-dark text-white text-[10px] font-black px-3.5 py-2 rounded-xl flex items-center gap-2 animate-in fade-in zoom-in duration-300 shadow-md shadow-primary/10">
                      {s}
                      <X size={14} className="cursor-pointer hover:text-secondary-light transition-colors" onClick={() => setUserData({...userData, specialties: userData.specialties.filter((_, idx) => idx !== i)})} />
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-primary text-white font-black py-5 rounded-[2.5rem] shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all mt-8 relative z-20 hover:bg-primary-dark">
              <Save size={20} /> حفظ وتحديث الملف
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;