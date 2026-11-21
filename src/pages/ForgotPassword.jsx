import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import theme from '../styles/theme';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { buttons, inputs, helpers, spacing, fontSizes } = theme;
  
  const [step, setStep] = useState(1);
  
  // التحكم في إظهار كلمة المرور لكل حقل بشكل مستقل
  const [showPass, setShowPass] = useState({ new: false, confirm: false });
  
  // تجميع كافة بيانات النموذج في مكان واحد
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
    otp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => {
    setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className={`min-h-screen ${helpers.flexCenter} bg-background p-4 relative overflow-hidden`} dir="rtl">
      
      <style>
        {`
          input::-ms-reveal, input::-ms-clear, 
          input[type="password"]::-webkit-contacts-auto-fill-button,
          input[type="password"]::-webkit-credentials-auto-fill-button {
            display: none !important;
          }
        `}
      </style>

      <DecorativeBlobs />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary relative z-10">
        
        {/* الهيدر الديناميكي */}
        <div className={`${helpers.flexCol} items-center ${spacing.margin.medium} text-center`}>
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 shadow-inner">
             {step === 1 && <Mail size={30} />}
             {step === 2 && <ShieldCheck size={30} />}
             {step === 3 && <Lock size={30} />}
             {step === 4 && <CheckCircle2 size={30} className="text-emerald-500" />}
          </div>
          <h2 className={`${fontSizes.heroTitle.mobile} text-text-primary font-bold`}>
             {step === 1 && "استعادة الحساب"}
             {step === 2 && "رمز التحقق"}
             {step === 3 && "كلمة مرور جديدة"}
             {step === 4 && "تم التغيير بنجاح"}
          </h2>
          <p className="text-[11px] text-text-secondary mt-2 px-4 italic font-bold">
             {step === 1 && "أدخل بريدك الجامعي لنرسل لك رمز التحقق."}
             {step === 2 && "يرجى إدخال الرمز المرسل إلى بريدك."}
             {step === 3 && "يرجى تعيين كلمة مرور قوية وتأكيدها."}
             {step === 4 && "تم تحديث بياناتك، يمكنك العودة الآن."}
          </p>
        </div>

        <form className="flex flex-col gap-4">
          
          {/* الخطوة 1: البريد */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  required name="email" type="email" placeholder="البريد الإلكتروني الجامعي" 
                  className={`${inputs.primary} pr-12`}
                  value={formData.email} onChange={handleChange}
                />
              </div>
              <button type="button" onClick={() => setStep(2)} className={`${buttons.primary} w-full mt-2`}>إرسال الرمز</button>
            </div>
          )}

          {/* الخطوة 2: الرمز */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex gap-2 justify-center" dir="ltr">
                {[1, 2, 3, 4].map((i) => (
                  <input key={i} type="text" maxLength="1" className="w-12 h-14 bg-slate-50 border-2 border-transparent rounded-xl text-center font-black text-primary text-xl focus:border-primary outline-none shadow-inner" />
                ))}
              </div>
              <button type="button" onClick={() => setStep(3)} className={`${buttons.primary} w-full`}>تحقق من الرمز</button>
            </div>
          )}

          {/* الخطوة 3: تعيين كلمة المرور (الحل الجذري لمشكلة العين والكلمتين) */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* الحقل الأول: كلمة المرور الجديدة */}
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  required name="newPassword" 
                  type={showPass.new ? "text" : "password"} 
                  placeholder="كلمة المرور الجديدة"
                  className={`${inputs.primary} pr-12 pl-12`} 
                  value={formData.newPassword} onChange={handleChange}
                />
                <button 
                  type="button" onClick={() => toggleVisibility('new')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary transition-all"
                >
                  {showPass.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* الحقل الثاني: تأكيد كلمة المرور */}
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  required name="confirmPassword" 
                  type={showPass.confirm ? "text" : "password"} 
                  placeholder="تأكيد كلمة المرور"
                  className={`${inputs.primary} pr-12 pl-12`} 
                  value={formData.confirmPassword} onChange={handleChange}
                />
                <button 
                  type="button" onClick={() => toggleVisibility('confirm')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary transition-all"
                >
                  {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button type="button" onClick={() => setStep(4)} className={`${buttons.primary} w-full mt-2`}>تحديث كلمة المرور</button>
            </div>
          )}

          {/* الخطوة 4: النجاح */}
          {step === 4 && (
            <div className="space-y-4 animate-in zoom-in duration-500">
              <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-[11px] font-bold border border-emerald-100 text-center">تم التغيير بنجاح، يمكنك تسجيل الدخول الآن.</div>
              <button onClick={() => navigate('/login')} className={`${buttons.primary} w-full bg-emerald-500 border-none shadow-lg shadow-emerald-100`}>تسجيل الدخول</button>
            </div>
          )}
        </form>

        {step < 4 && (
          <button 
            onClick={() => step === 1 ? navigate('/login') : setStep(step - 1)}
            className="mt-8 flex items-center gap-2 text-text-secondary font-bold text-[11px] mx-auto hover:text-primary transition-colors"
          >
            <ArrowRight size={14} /> العودة
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;