// src/components/Specialties.jsx
import React from 'react';
import theme from '../styles/theme';
import { Stethoscope, Scissors, Sparkles, ShieldPlus } from 'lucide-react';

const Specialties = () => {
  const { helpers, fontSizes } = theme;

  const services = [
    { title: "تنظيف وتبييض", icon: <Sparkles className="text-primary" /> },
    { title: "حشوات تجميلية", icon: <ShieldPlus className="text-primary" /> },
    { title: "جراحة وخلع", icon: <Scissors className="text-primary" /> },
    { title: "فحص عام", icon: <Stethoscope className="text-primary" /> },
  ];

  return (
      <section id="specialties" className="py-20 bg-background"> {/* أضفنا الـ id هنا */}
        <div className={helpers.container}>
        <div className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h2 className={`${fontSizes.heroTitle.mobile} font-bold text-primary-dark`}>خدماتنا العلاجية</h2>
            <p className="text-textSecondary mt-2">نقدم مجموعة متكاملة من علاجات الأسنان بإشراف مختصين</p>
          </div>
          <button className="text-primary font-bold hover:underline hidden md:block">عرض الكل</button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((ser, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary hover:shadow-md transition-all text-center group">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {ser.icon}
              </div>
              <h3 className="font-bold text-textPrimary">{ser.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;