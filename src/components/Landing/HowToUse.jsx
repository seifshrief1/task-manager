import React from "react";

const HowToUse = () => {
  return (
    <div class="bg-gray-50 mt-10 p-6 rounded-lg mb-10 shadow-md text-right flex md:flex-row flex-col-reverse justify-around items-center">
      <div>
        <h2 class="text-2xl font-bold text-black mb-4">
          كيف تستخدم تطبيق إدارة المهام؟
        </h2>
        <ol class="list-decimal list-inside space-y-3">
          <li class="text-gray-700">
            <span class="font-semibold">إنشاء حساب جديد:</span>
            ابدأ بإنشاء حسابك عن طريق إدخال بريدك الإلكتروني وكلمة المرور. إذا
            كنت تمتلك حسابًا بالفعل، قم بتسجيل الدخول.
          </li>
          <li class="text-gray-700">
            <span class="font-semibold">إضافة مهام جديدة:</span>
            اضغط على زر{" "}
            <span class="text-blue-500 font-medium">"إضافة مهمة"</span> وحدد اسم
            المهمة، وصفها، وموعدها النهائي.
          </li>
          <li class="text-gray-700">
            <span class="font-semibold">تنظيم المهام:</span>
            قم بتصنيف المهام باستخدام علامات مثل
            <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">
              عمل
            </span>
            ,
            <span class="bg-green-100 text-green-600 px-2 py-1 rounded-lg">
              شخصي
            </span>
            , أو
            <span class="bg-red-100 text-red-600 px-2 py-1 rounded-lg">
              اولوية
            </span>
            لتسهيل البحث عنها لاحقًا.
          </li>
          <li class="text-gray-700">
            <span class="font-semibold">تحديث الحالة:</span>
            عندما تنتهي من مهمة، قم بتحديث حالتها إلى
            <span class="text-green-500 font-medium">"منجز"</span> أو قم
            بتعديلها عند الحاجة.
          </li>
          <li class="text-gray-700">
            <span class="font-semibold">إدارة الوقت:</span>
            استخدم أداة تقويم التطبيق لتخطيط مهامك اليومية والأسبوعية بكفاءة.
          </li>
        </ol>
      </div>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/task-manager-5491584-4607140.png"
        className="lg:w-[500px] md:w-[400px] w-[350px]"
      />
    </div>
  );
};

export default HowToUse;
