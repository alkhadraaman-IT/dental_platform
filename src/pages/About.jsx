import React from 'react';
import theme from '../styles/theme';
import { Target, Lightbulb, ShieldCheck, ArrowLeft } from 'lucide-react';
import DecorativeBlobs from '../components/common/DecorativeBlobs';

const About = () => {
  const { helpers } = theme;

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about" dir="rtl">
      {/* زخارف خلفية */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <DecorativeBlobs />

      <div className={`${helpers.container} relative z-10`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* === القسم النصي (الآن على اليمين) === */}
          <div className="text-right order-1">
            <span className="inline-block px-4 py-2 bg-secondary/20 text-primary-dark rounded-lg text-sm font-bold mb-6 border-r-4 border-secondary">
              من نحن؟
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-primary-dark leading-tight mb-8">
              نحن الجسر بين <span className="text-primary">التعليم الأكاديمي</span> <br/> والرعاية الصحية المتميزة
            </h2>
            <p className="text-textSecondary text-xl leading-relaxed mb-10">
              منصتنا ولدت من قلب كليات طب الأسنان، لتنظيم العلاقة بين الطالب الباحث عن الخبرة والمريض الباحث عن الجودة والتكلفة المناسبة. نحن نضمن أن كل خطوة علاجية تتم تحت إشراف نخبة من الأساتذة.
            </p>
            
            <div className="flex gap-4">
               <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all flex items-center gap-2">
                  <a href="#faq" className="...">اكتشف المزيد</a>
                 <ArrowLeft size={20} />
               </button>
            </div>
          </div>

          {/* === القسم البصري (الآن على اليسار) === */}
          <div className="relative order-2">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6">
                <div className="bg-primary p-6 md:p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20">
                  <h3 className="text-3xl md:text-4xl font-black mb-1">98%</h3>
                  <p className="text-xs md:text-sm opacity-80 font-medium">رضا المرضى عن النتائج</p>
                </div>
                <div className="bg-background p-6 md:p-8 rounded-[2.5rem] border-2 border-primary/5 shadow-inner">
                  <ShieldCheck className="text-secondary mb-4" size={32} />
                  <h4 className="font-bold text-primary-dark text-sm md:text-base">إشراف مباشر</h4>
                  <p className="text-[10px] md:text-xs text-textSecondary mt-2 leading-relaxed">رقابة أكاديمية دقيقة لكل حالة علاجية.</p>
                </div>
              </div>
              <div className="space-y-4 md:space-y-6 pt-10 md:pt-16">
                <div className="bg-secondary p-6 md:p-8 rounded-[2.5rem] text-primary-dark shadow-xl shadow-secondary/20">
                  <Lightbulb className="mb-4" size={32} />
                  <h4 className="font-bold text-sm md:text-base">ابتكار تعليمي</h4>
                  <p className="text-[10px] md:text-xs opacity-70 mt-2 leading-relaxed">أحدث التقنيات في إدارة السجلات الطبية.</p>
                </div>
                <div className="bg-primary-dark p-6 md:p-8 rounded-[2.5rem] text-white">
                  <h3 className="text-3xl md:text-4xl font-black mb-1">+10</h3>
                  <p className="text-xs md:text-sm opacity-80 font-medium">جامعات طبية شريكة</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;