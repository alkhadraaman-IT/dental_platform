// src/styles/theme.js

export const colors = {
  // الألوان الأساسية الجديدة
  primary: '#80eea3',      // أخضر فاتح منعش - للأزرار والعناصر الرئيسية
  primaryDark: '#7ecc98',  // أخضر غامق قليلاً (للـ hover)
  secondary: '#fbdf55',    // ذهبي فاتح - للتبويبات والحواف
  secondaryDark: '#e0c448', // ذهبي غامق (للـ hover)
  
  // الخلفيات
  background: '#fafaf8',   // بيج كريمي فاتح - خلفية الموقع
  cardBg: '#FFFFFF',       // أبيض للبطاقات
  inputBg: '#fafaf8',      // نفس لون الخلفية لحقول الإدخال
  
  // الحالات
  success: '#4CAF50',      // أخضر غامق للنجاح
  error: '#E53935',        // أحمر للأخطاء
  warning: '#FF9800',      // برتقالي للتحذيرات
  
  // النصوص
  textPrimary: '#2C3E50',  // رمادي داكن
  textSecondary: '#6C757D', // رمادي فاتح
  textLight: '#2C3E50',     // غامق للتباين مع الخلفية الفاتحة
  
  // الحدود والظلال
  border: '#fbdf55',       // ذهبي للحواف
  shadow: 'rgba(0,0,0,0.08)',
  shadowGreen: 'rgba(76, 175, 80, 0.25)', // ظل أخضر للـ hover
}

// ========== أحجام الخطوط (متجاوبة) ==========
export const fontSizes = {
  // العنوان الرئيسي (Hero Title)
  heroTitle: {
    mobile: 'text-2xl',      // 24px
    tablet: 'md:text-3xl',   // 30px
    laptop: 'lg:text-4xl',   // 36px
    desktop: 'xl:text-5xl',  // 48px
  },
  // العنوان الثانوي (Subtitle)
  heroSubtitle: {
    mobile: 'text-sm',       // 14px
    tablet: 'md:text-base',  // 16px
    laptop: 'lg:text-lg',    // 18px
  },
  // النص الوصفي
  bodyText: {
    mobile: 'text-sm',       // 14px
    tablet: 'md:text-base',  // 16px
    laptop: 'lg:text-lg',    // 18px
  },
  // الأرقام في الإحصائيات
  statsNumber: {
    mobile: 'text-xl',       // 20px
    tablet: 'md:text-2xl',  // 24px
  },
  // نص الإحصائيات
  statsLabel: {
    mobile: 'text-xs',       // 12px
    tablet: 'md:text-sm',    // 14px
  },
  // الأزرار
  buttonText: {
    mobile: 'text-sm',       // 14px
    tablet: 'md:text-base',  // 16px
  },
}

// ========== المسافات (Padding, Margin, Gap) ==========
export const spacing = {
  xs: 'p-1 sm:p-1.5',
  sm: 'p-2 sm:p-2.5',
  md: 'p-3 sm:p-4',
  lg: 'p-4 sm:p-6',
  xl: 'p-6 sm:p-8',
  gap: {
    small: 'gap-2 sm:gap-3',
    medium: 'gap-4 sm:gap-6',
    large: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12',
  },
  margin: {
    small: 'mb-2 sm:mb-3',
    medium: 'mb-4 sm:mb-6',
    large: 'mb-6 sm:mb-8',
    xl: 'mb-8 sm:mb-10',
  },
}

// ========== الحواف (Border Radius) ==========
export const borderRadius = {
  sm: 'rounded-lg sm:rounded-xl',      // 8px -> 12px
  md: 'rounded-xl sm:rounded-2xl',     // 12px -> 16px
  lg: 'rounded-2xl sm:rounded-3xl',    // 16px -> 24px
  full: 'rounded-full',
}

// ========== الأزرار (كلاس جاهز) ==========
export const buttons = {
  primary: `
    bg-primary text-textPrimary 
    ${fontSizes.buttonText.mobile} ${fontSizes.buttonText.tablet}
    px-4 sm:px-6 py-2 sm:py-3 
    font-semibold 
    rounded-xl 
    transition-all duration-300 
    hover:shadow-green-hover hover:bg-primary-dark
  `,
  secondary: `
    border-2 border-secondary 
    text-textPrimary 
    ${fontSizes.buttonText.mobile} ${fontSizes.buttonText.tablet}
    px-4 sm:px-6 py-2 sm:py-3 
    font-semibold 
    rounded-xl 
    transition-all duration-300 
    hover:bg-secondary hover:text-textPrimary
  `,
}

// ========== حقول الإدخال ==========
export const inputs = {
  primary: `
    w-full 
    bg-background 
    border-2 border-secondary 
    rounded-xl 
    px-4 py-2 sm:py-3 
    ${fontSizes.bodyText.mobile} ${fontSizes.bodyText.tablet}
    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
    transition-all duration-300
  `,
}

// ========== البطاقات ==========
export const cards = {
  primary: `
    bg-card 
    rounded-xl 
    shadow-md 
    p-4 sm:p-6 
    hover:shadow-lg 
    transition-shadow duration-300
  `,
}

// ========== كلاسات مساعدة ==========
export const helpers = {
  container: 'container mx-auto px-4 max-w-7xl',
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  sectionPadding: 'py-10 sm:py-16 md:py-20',
}


// ========== الخطوط ==========
export const fonts = {
  // الخط الرئيسي - اختر واحداً
  primary: 'Amiri',           // أو 'Noto Naskh Arabic'
  
  // خط احتياطي
  fallback: 'Tajawal, system-ui, -apple-system, sans-serif',
  
  // أوزان الخطوط
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
}
// ========== تصدير كل شيء معاً ==========
export default {
  fonts,
  colors,
  fontSizes,
  spacing,
  borderRadius,
  buttons,
  inputs,
  cards,
  helpers,
}