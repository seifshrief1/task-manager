import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { handleLogOut } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="mt-20 flex justify-center items-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8 border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          الملف الشخصي
        </h2>
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <label className="text-lg font-semibold text-gray-700">
              اسم المستخدم
            </label>
            <p className="text-gray-900 text-lg font-bold">{user.name}</p>
          </div>
          <div className="flex justify-between items-center border-b pb-4">
            <label className="text-lg font-semibold text-gray-700">
              البريد الإلكتروني
            </label>
            <p className="text-gray-900 text-lg font-bold">{user.email}</p>
          </div>

          <button
            className="bg-red-600 text-white px-5 py-2 rounded text-sm hover:bg-red-500 transition duration-300 flex justify-center m-auto"
            onClick={handleLogOut}
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
