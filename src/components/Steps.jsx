import React from 'react';
import theme from '../styles/theme';
import { Search, CalendarDays, CheckCircle2 } from 'lucide-react';

const Steps = () => {
  const { helpers, fontSizes } = theme;

  const steps = [
    {
      id: 1,
      title: "ابحث عن التخصص",
      desc: "اختر نوع العلاج والجامعة التي تفضلها من قائمة شركائنا.",
      icon: <Search size={30} className="text-secondary" />,
    },
    {
      id: 2,
      title: "احجز موعدك",
      desc: "اختر التاريخ والوقت المناسبين لك ولجدول الطالب.",
      icon: <CalendarDays size={30} className="text-secondary" />,
    },
    {
      id: 3,
      title: "احصل على ابتسامتك",
      desc: "تلقَّ العلاج بجودة عالية وتحت إشراف نخبة من الأطباء.",
      icon: <CheckCircle2 size={30} className="text-secondary" />,
    },
  ];

  return (
    <section className={`${helpers.sectionPadding} bg-white`} dir="rtl">
      <div className={helpers.container}>
        <div className="text-center mb-16">
          <h2 className={`${fontSizes.heroTitle.mobile} text-primary-dark font-bold`}>
            كيف تبدأ رحلتك معنا؟
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
          {/* خط واصل بين الخطوات (يظهر في الشاشات الكبيرة) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-primary/10 -z-0"></div>

          {steps.map((step) => (
            <div key={step.id} className="flex-1 text-center relative z-10">
              <div className="w-20 h-20 bg-background border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:bg-primary transition-all">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-textPrimary mb-3">{step.title}</h3>
              <p className="text-textSecondary leading-relaxed px-4">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;