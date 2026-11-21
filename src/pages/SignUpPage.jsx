import React, { useState } from 'react';
import { 
  User, Mail, Lock, Eye, EyeOff, Phone, 
  GraduationCap, Building, Sparkles, MapPin, Globe, ChevronDown 
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import theme from '../styles/theme';
import DecorativeBlobs from '../components/common/DecorativeBlobs';
import { signUpUser } from '../firebase/authService'; // تأكدي من المسار الصحيح للملف

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userRole, setUserRole] = useState('patient');
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isUniOpen, setIsUniOpen] = useState(false);
  const [selectedUni, setSelectedUni] = useState("");

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    website: '',
    studentID: ''
  });

  const navigate = useNavigate();
  const { buttons, inputs, helpers, fontSizes } = theme;

  const roles = [
    { id: 'patient', label: 'مريض' },
    { id: 'student', label: 'طالب أسنان' },
    { id: 'university', label: 'جامعة / كلية طب أسنان' }
  ];

  const universities = ["جامعة دمشق", "الجامعة الدولية", "جامعة القلمون", "جامعة تشرين"];

  // دالة التحكم بالإدخال مع منع الحروف فوراً
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // منع إدخال أي شيء غير الأرقام لحقول معينة
    if (name === "phone" || name === "studentID") {
      const onlyNums = value.replace(/[^0-9]/g, ''); 
      setFormData(prev => ({ ...prev, [name]: onlyNums }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async (e) => {
  e.preventDefault(); // منع الصفحة من التحديث

  // التأكد من تطابق كلمة المرور
  if (formData.password !== formData.confirmPassword) {
    alert("كلمات المرور غير متطابقة!");
    return;
  }

  // تجهيز البيانات بناءً على "الدستور" الذي وضعناه
  const data = {
    email: formData.email,
    password: formData.password,
    name: formData.fullName,
    role: userRole,
    phone: formData.phone,
    universityName: selectedUni, // من القائمة المنسدلة
    studentUniversityId: formData.studentID, // الرقم الجامعي
    uniId: "UNI_" + selectedUni, // معرف مؤقت للجامعة
    year: 4 // يمكن إضافة حقل اختيار السنة لاحقاً
  };

  const result = await signUpUser(data);
  
  if (result.success) {
    alert("تم إنشاء الحساب بنجاح! جاري تحويلك...");
    navigate('/dashboard'); // أو الصفحة الرئيسية
  } else {
    // عرض رسالة خطأ واضحة للمستخدم
    alert("حدث خطأ أثناء التسجيل: " + result.error);
  }
};

  return (
    <div className={`min-h-screen ${helpers.flexCenter} bg-background p-4 relative overflow-hidden`} dir="rtl">
      <style>{`
        input::-ms-reveal, input::-ms-clear { display: none; }
        input::-webkit-contacts-auto-fill-button { visibility: hidden; display: none !important; }
      `}</style>
      
      <DecorativeBlobs />

      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border-t-8 border-primary relative z-10 my-10">
        
        <div className="text-center mb-10">
          <h2 className={`${fontSizes.heroTitle.mobile} text-primary-dark font-black mb-2`}>انضم إلينا اليوم</h2>
          <p className="text-[10px] text-textSecondary font-bold uppercase tracking-widest">قم بإنشاء حسابك للبدء في رحلتك الطبية</p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          
          {/* نوع الحساب */}
          <div className="relative md:col-span-2">
            <label className="text-[9px] font-black text-primary mb-1 mr-2 block italic text-right">أنا أريد التسجيل كـ:</label>
            <button type="button" onClick={() => setIsRoleOpen(!isRoleOpen)} className={`${inputs.primary} w-full pr-12 pl-10 text-right font-bold text-[11px] flex items-center justify-between relative`}>
              <User className="absolute right-4 text-primary/40" size={18} />
              <span>{roles.find(r => r.id === userRole).label}</span>
              <ChevronDown size={16} className={`transition-all ${isRoleOpen ? 'rotate-180' : ''}`} />
            </button>
            {isRoleOpen && (
              <div className="absolute top-[110%] right-0 w-full bg-white border border-primary/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                {roles.map((r) => (
                  <button key={r.id} type="button" onClick={() => { setUserRole(r.id); setIsRoleOpen(false); }} className={`w-full p-4 text-right text-[11px] font-bold hover:bg-primary/5 ${userRole === r.id ? 'bg-primary/5 text-primary' : ''}`}>{r.label}</button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <User className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input required name="fullName" type="text" value={formData.fullName} onChange={handleChange} placeholder={userRole === 'university' ? "اسم الجامعة" : "الاسم الكامل"} className={`${inputs.primary} pr-12 w-full text-[11px] font-bold`} />
          </div>

          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input required name="email" type="email" value={formData.email} onChange={handleChange} placeholder="البريد الإلكتروني" className={`${inputs.primary} pr-12 w-full text-[11px] font-bold`} />
          </div>

          <div className="relative">
            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input 
              required 
              name="phone" 
              type="text" // نستخدم text لنتحكم بالإدخال برمجياً
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="رقم الجوال (أرقام فقط)" 
              className={`${inputs.primary} pr-12 w-full text-[11px] font-bold text-right`} 
            />
          </div>

          {userRole === 'student' && (
            <>
              <div className="relative">
                <button type="button" onClick={() => setIsUniOpen(!isUniOpen)} className={`${inputs.primary} w-full pr-12 pl-10 text-right font-bold text-[11px] flex items-center justify-between relative`}>
                  <Building className="absolute right-4 text-primary/40" size={18} />
                  <span>{selectedUni || "اختر جامعتك"}</span>
                  <ChevronDown size={16} />
                </button>
                {isUniOpen && (
                  <div className="absolute top-[110%] right-0 w-full bg-white border border-primary/10 rounded-2xl shadow-2xl z-50 max-h-40 overflow-y-auto">
                    {universities.map((uni) => (
                      <button key={uni} type="button" onClick={() => { setSelectedUni(uni); setIsUniOpen(false); }} className="w-full p-3 text-right text-[10px] font-bold hover:bg-primary/5">{uni}</button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <GraduationCap className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                <input required name="studentID" type="text" value={formData.studentID} onChange={handleChange} placeholder="الرقم الجامعي" className={`${inputs.primary} pr-12 w-full text-[11px] font-bold`} />
              </div>
            </>
          )}

          {userRole === 'university' && (
            <div className="relative">
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
              <input required name="location" type="text" value={formData.location} onChange={handleChange} placeholder="الموقع (المدينة)" className={`${inputs.primary} pr-12 w-full text-[11px] font-bold`} />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input required name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="كلمة المرور" className={`${inputs.primary} pr-12 pl-12 w-full text-[11px] font-bold outline-none`} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input required name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} placeholder="تأكيد كلمة المرور" className={`${inputs.primary} pr-12 pl-12 w-full text-[11px] font-bold outline-none`} />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30">
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="md:col-span-2 mt-4">
            <button type="submit" className={`${buttons.primary} w-full py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all`}>
              <Sparkles size={20} />
              <span className="font-black">إنشاء الحساب</span>
            </button>
          </div>

          <div className="text-right">
            <Link to="/login" className="text-[11px] font-bold text-primary hover:underline">
             لدي حساب :تسجيل دخول
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUpPage;