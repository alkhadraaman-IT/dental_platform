// src/components/Hero.jsx
import dentist3d from '../assets/images/dentist-3d.png'
import theme from '../styles/theme'
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  // استخراج الثوابت عشان نخفف الكتابة
  const { buttons, helpers, spacing, fontSizes, colors } = theme
  const navigate = useNavigate();

  return (
    // أضفت relative و overflow-hidden لضمان تموضع البقعة بشكل صحيح داخل القسم
    <section className={`${helpers.sectionPadding} ${helpers.flexCenter} min-h-screen relative overflow-hidden`}>
      
      {/* ========== البقعة العلوية المصمتة (Solid Blob) ========== */}
      {/* - bg-primary: اللون الفيروزي الأساسي المصمت (غير شفاف)
         - rounded-full: حواف دائرية ناعمة
         - w-[300px] h-[300px]: الحجم (يمكن تعديله)
         - absolute -top-20 -right-20: التموضع في الزاوية العلوية اليمنى (خارج الإطار قليلاً)
         - z-0: خلف المحتوى الرئيسي
      */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[200px] bg-primary rounded-full z-0 pointer-events-none"></div>
      
      {/* لمسة فنية خفيفة (اختيارية): بقعة ثانية أصغر في زاوية أخرى لإحداث توازن */}
      {/* <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-dark rounded-full z-0 pointer-events-none opacity-80"></div> */}
      
      {/* ========================================================== */}

      {/* أضفت relative z-10 لضمان ظهور المحتوى فوق البقعة */}
      <div className={`${helpers.container} relative z-10`}>
        <div className={`flex flex-col lg:flex-row items-center ${spacing.gap.xl}`}>
          
          {/* الجزء الأيمن: النصوص */}
          <div className="flex-1 text-center lg:text-right">
            {/* عنوان صغير فوق الرئيسي */}
            <p className={`text-secondary font-semibold ${spacing.margin.small} tracking-wide ${fontSizes.heroSubtitle.mobile} ${fontSizes.heroSubtitle.tablet} ${fontSizes.heroSubtitle.laptop}`}>
              ✨ مرحباً بك في منصتنا
            </p>
            
            {/* العنوان الرئيسي */}
            <h1 className={`font-bold ${spacing.margin.medium}`}>
              <span className={`text-primary-dark block ${fontSizes.heroTitle.mobile} ${fontSizes.heroTitle.tablet} ${fontSizes.heroTitle.laptop} ${fontSizes.heroTitle.desktop}`}>
                اجعل ابتسامتك
              </span>
              <span className={`text-textPrimary block mt-1 ${fontSizes.heroTitle.mobile} ${fontSizes.heroTitle.tablet} ${fontSizes.heroTitle.laptop} ${fontSizes.heroTitle.desktop}`}>
                أجمل من أي وقت مضى
              </span>
            </h1>
            
            {/* النص الوصفي */}
            <p className={`text-textSecondary ${spacing.margin.large} max-w-xl lg:mx-0 mx-auto leading-relaxed ${fontSizes.bodyText.mobile} ${fontSizes.bodyText.tablet} ${fontSizes.bodyText.laptop}`}>
              احجز موعدك مع طلاب طب الأسنان المتميزين تحت إشراف جامعي معتمد.
              علاجات بأسعار مناسبة وجودة عالية.
            </p>
            
            {/* الأزرار */}
            <div className={`flex gap-3 sm:gap-4 justify-center lg:justify-start ${spacing.margin.xl}`}>
              <button onClick={() => navigate('/bookings')} className={buttons.primary}>
                ابدأ الآن
              </button>
              <button className={buttons.secondary}>
               <a href="#about" className="...">تعرف علينا</a> 
              </button>
            </div>
            
            {/* إحصائيات سريعة */}
            <div className={`flex ${spacing.gap.medium} justify-center lg:justify-start`}>
              <div>
                <p className={`font-bold text-primary-dark ${fontSizes.statsNumber.mobile} ${fontSizes.statsNumber.tablet}`}>+٥٠٠</p>
                <p className={`text-textSecondary ${fontSizes.statsLabel.mobile} ${fontSizes.statsLabel.tablet}`}>طالب معتمد</p>
              </div>
              <div>
                <p className={`font-bold text-primary-dark ${fontSizes.statsNumber.mobile} ${fontSizes.statsNumber.tablet}`}>+١٠٠٠</p>
                <p className={`text-textSecondary ${fontSizes.statsLabel.mobile} ${fontSizes.statsLabel.tablet}`}>مريض سعيد</p>
              </div>
              <div>
                <p className={`font-bold text-primary-dark ${fontSizes.statsNumber.mobile} ${fontSizes.statsNumber.tablet}`}>+١٠</p>
                <p className={`text-textSecondary ${fontSizes.statsLabel.mobile} ${fontSizes.statsLabel.tablet}`}>جامعة شريكة</p>
              </div>
            </div>
          </div>
          
          {/* الجزء الأيسر: الصورة */}
          <div className="flex-1 flex justify-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-30"></div>
              
              <div className="relative bg-gradient-to-br from-primary to-secondary rounded-2xl sm:rounded-3xl p-2 shadow-2xl">
                <div className="bg-background rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <img 
                      src={dentist3d} 
                      alt="طبيب أسنان ثلاثي الأبعاد"
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-secondary rounded-full blur-xl opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary-dark rounded-full blur-xl opacity-40"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Hero