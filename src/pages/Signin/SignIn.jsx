import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SignIn = () => {
  const { handleLogin, handleAuthWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    await handleLogin(email, password);
    setLoading(false);
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: "url(https://wallpaperaccess.com/full/5137774.jpg)",
        }}
        className="bg-cover bg-center h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 p-8 rounded-lg shadow-lg bg-white bg-opacity-80 max-w-md w-full">
          <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-2">
            T<span className="text-orange-500">M</span>
          </h1>
          <p className="text-sm text-center text-gray-600 mb-6">
            مرحبا مرة اخري ! ادخل بياناتك لتسجيل الدخول
          </p>

          <input
            type="email"
            placeholder="البريد الالكتروني"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded-md px-4 py-3 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded-md px-4 py-3 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
          />

          <button
            onClick={handleSignIn}
            className="bg-orange-500 text-white px-6 py-3 rounded-md mt-4 w-full hover:bg-red-500 transition duration-300"
          >
            {loading ? (
              <div class="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin flex justify-center m-auto"></div>
            ) : (
              "تسجيل الدخول"
            )}
          </button>

          <button
            onClick={handleAuthWithGoogle}
            className="bg-gray-500 text-white px-6 py-3 rounded-md mt-6 w-full hover:bg-gray-600 transition duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            المتابعة باستخدام Google
            <FaGoogle className="mr-3 text-white" />{" "}
          </button>

          <div className="mt-6 text-center text-gray-700">
            <span>ليس لديك حساب؟</span>
            <Link to="/signup" className="text-orange-500 hover:underline">
              انشاء حساب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
