// src/components/Partners.jsx
import React from 'react';
import theme from '../styles/theme';

const Partners = () => {
  const { helpers } = theme;

  const universities = [
    { name: "جامعة دمشق", code: "UOD" },
    { name: "الجامعة السورية", code: "SPU" },
    { name: "جامعة القلمون", code: "UOK" },
    { name: "جامعة الرشيد", code: "RU" },
    { name: "الدولية AIU", code: "AIU" },
    { name: "جامعة الحواش", code: "HPU" },
  ];

  return (
    <section className="py-10 bg-white border-y border-primary/5 shadow-sm" dir="rtl">
      <div className={helpers.container}>
        {/* عنوان واضح وبسيط */}
        <p className="text-center text-textPrimary mb-10 font-bold text-lg md:text-xl">
          شركاؤنا من الجامعات المعتمدة
        </p>
        
        {/* شبكة الشعارات: 2 في الجوال، 3 في التابلت، 6 في الكمبيوتر */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {universities.map((uni, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-3 group">
              
              {/* الشعار الدائري: جعلت الحدود أوضح واللون الذهبي أمتن */}
              <div className="w-20 h-20 md:w-24 md:h-24 bg-background rounded-full border-2 border-secondary/40 flex items-center justify-center shadow-md relative overflow-hidden transition-all duration-300 md:group-hover:scale-110 md:group-hover:border-secondary">
                {/* خلفية ذهبية خفيفة جداً وثابتة لضمان الوضوح */}
                <div className="absolute inset-0 bg-secondary/5"></div>
                
                {/* رمز الجامعة بالذهبي الغامق ليقرأه كبار السن بسهولة */}
                <span className="relative text-xl md:text-2xl font-black text-secondary">
                  {uni.code}
                </span>
              </div>
              
              {/* اسم الجامعة: لونه الآن رمادي غامق/ذهبي ليكون مقروءاً دائماً */}
              <span className="text-sm md:text-base font-bold text-textPrimary text-center leading-tight">
                {uni.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;