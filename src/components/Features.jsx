import React from 'react';
import { UserPlus, CalendarCheck, GraduationCap, BarChart3, Coins, Trophy } from 'lucide-react';
import theme from '../styles/theme';
import DecorativeBlobs from './common/DecorativeBlobs'; // ندخل لمجلد common الموجود بجانب الملف الحالي

const Features = () => {
  const { helpers, fontSizes } = theme;

  const featuresData = [
    {
      title: "ربط ذكي",
      desc: "نربط المريض بالطالب المناسب بسهولة تامة وبضغطة زر.",
      icon: <UserPlus size={28} />,
    },
    {
      title: "إدارة الحجوزات",
      desc: "نظام متكامل لإدارة المواعيد وتنظيم جدول الطلاب والمرضى.",
      icon: <CalendarCheck size={28} />,
    },
    {
      title: "إشراف أكاديمي",
      desc: "متابعة خطوة بخطوة من قبل الدكاترة لضمان دقة العلاج.",
      icon: <GraduationCap size={28} />,
    },
    {
      title: "أداء الطلاب",
      desc: "تقييم دقيق ومستمر لمستوى الطلاب (خاص للجامعات).",
      icon: <BarChart3 size={28} />,
    },
    {
      title: "أسعار رمزية",
      desc: "تكاليف علاجية تناسب الجميع مدعومة من الجامعات.",
      icon: <Coins size={28} />,
    },
    {
      title: "الأول من نوعه",
      desc: "المنصة الأولى والوحيدة التي تجمع كل هذه الخدمات بمكان واحد.",
      icon: <Trophy size={28} />,
    },
  ];

  return (
    // الخلفية باللون الأساسي (Primary)
    <section className="py-20 bg-primary relative overflow-hidden" dir="rtl">
      
      {/* استدعاء الفقاعات المتعرجة لتعطي جمالية فوق اللون الأساسي */}
      <DecorativeBlobs />

      <div className={`${helpers.container} relative z-10`}>
        {/* عنوان القسم - باللون الأبيض ليبرز فوق الفيروزي */}
        <div className="text-center mb-12">
          <h2 className={`${fontSizes.heroTitle.mobile} text-white font-bold`}>
            ميزات استثنائية لمنصتنا
          </h2>
          <p className="text-white/80 mt-2">نبتكر الحلول لتسهيل رحلتك العلاجية والتعليمية</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full shadow-lg"></div>
        </div>

        {/* شبكة الميزات - جعلناها 2 بجانب بعض في الجوال */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="p-5 md:p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg"
            >
              {/* أيقونة الميزة - باللون الذهبي لتباين جميل */}
              <div className="mb-4 inline-block p-3 bg-secondary/90 rounded-xl text-primary-dark group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              
              <p className="text-white/70 text-sm md:text-base leading-relaxed line-clamp-3">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;