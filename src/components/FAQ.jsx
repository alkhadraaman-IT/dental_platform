// src/components/layout/FAQ.jsx
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import DecorativeBlobs from './common/DecorativeBlobs';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(null);

  const faqs = [
    {
      q: "هل العلاج آمن كوني أتعامل مع طالب؟",
      a: "بالتأكيد، الطالب لا يقوم بأي خطوة علاجية إلا بعد موافقة وتدقيق مباشر من الأستاذ المشرف، مما يضمن دقة تتجاوز أحياناً العيادات الخاصة."
    },
    {
      q: "لماذا الأسعار رمزية أو مجانية في بعض الأحيان؟",
      a: "لأن الهدف الأساسي تعليمي وخدمي للجامعة، حيث يتم دعم تكلفة المواد الطبية لتسهيل وصول المرضى وتدريب الطلاب."
    },
    {
      q: "كيف يمكنني حجز موعد؟",
      a: "ببساطة، ابحث عن التخصص المطلوب، اختر الجامعة، وستظهر لك قائمة بالطلاب المتاحين ومواعيدهم."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background" dir="rtl">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto text-secondary mb-4" size={40} />
          <h2 className="text-3xl font-black text-primary-dark">الأسئلة الشائعة</h2>
        </div>

            <DecorativeBlobs />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
              <button 
                onClick={() => setActiveTab(activeTab === index ? null : index)}
                className="w-full p-6 text-right flex justify-between items-center hover:bg-primary/5 transition-colors"
              >
                <span className="font-bold text-textPrimary">{faq.q}</span>
                <ChevronDown className={`transition-transform ${activeTab === index ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === index && (
                <div className="p-6 pt-0 text-textSecondary leading-relaxed border-t border-primary/5 bg-primary/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;