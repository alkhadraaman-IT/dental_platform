import React from 'react';

const DecorativeBlobs = () => {
  return (
    // نستخدم z-0 للتأكد أن الفقاعات خلف المحتوى و pointer-events-none لكي لا تعيق النقر
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* فقاعة علوية يمين - لون ذهبي (Secondary) */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-40"></div>
      
      {/* فقاعة سفلية يسار - لون أخضر (Primary) */}
      <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-primary rounded-full blur-3xl opacity-30"></div>

      {/* لمسة إضافية: فقاعة صغيرة في المنتصف لإعطاء عمق */}
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary-dark rounded-full blur-[100px] opacity-20"></div>
    </div>
  );
};

export default DecorativeBlobs;