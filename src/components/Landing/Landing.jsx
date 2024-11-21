import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import HowToUse from "./HowToUse";

const Landing = () => {
  return (
    <div>
      <h1 className="text-center mt-20 lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
        قـــم بـــادراة مهامـــك و عمــــلك
        <br />
        <span className="text-orange-500 font-semibold">
          بطــــريــــقة سهلـــــة و مميـــــزة
        </span>
      </h1>
      <p className="text-center mt-5 text-sm text-gray-500">
        تطبيق إدارة المهام هو أداة مبتكرة مصممة لتنظيم يومك وتحقيق إنتاجيتك
        بأفضل طريقة ممكنة
      </p>
      <div className="flex justify-center gap-5">
        <button className="bg-orange-500 text-white px-5 py-2 rounded text-sm mt-10 hover:bg-red-500 transition duration-300 flex items-center gap-1">
          ابدء الان
          <span className="text-2xl">
            <IoIosArrowRoundBack />
          </span>
        </button>
        <button className="bg-white px-5 py-2 rounded text-sm mt-10 shadow-lg transition duration-300 flex items-center gap-1">
          <a href="https://www.youtube.com">شاهد فيديو</a>
          <span className="text-2xl">
            <CiVideoOn />
          </span>
        </button>
      </div>

      <HowToUse />
    </div>
  );
};

export default Landing;
