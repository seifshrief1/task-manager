import React from "react";
import { Link } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { handleLogOut } = useAuth();
  return (
    <div className="flex items-center justify-between p-5 shadow sticky top-0 z-50 bg-white">
      <Link to="/">
        <h1 className="text-5xl font-bold">
          T<span className="text-orange-500">M</span>
        </h1>
      </Link>
      <ul className="lg:flex gap-5 items-center hidden">
        <li className="hover:text-orange-500 transition duration-300">
          <Link to="/">الرئيسية</Link>
        </li>
        <li className="hover:text-orange-500 transition duration-300">
          <Link to="/mytasks">مهماتي</Link>
        </li>
        <li className="hover:text-orange-500 transition duration-300">
          <Link to="/profile">الملف الشخصي</Link>
        </li>
      </ul>
      {user ? (
        <button
          className="bg-red-600 text-white px-5 py-2 rounded text-sm hover:bg-red-500 transition duration-300 lg:block hidden"
          onClick={handleLogOut}
        >
          تسجيل الخروج
        </button>
      ) : (
        <div className="lg:flex hidden gap-1 items-center">
          <Link to={"/signup"}>
            <button className="bg-white shadow-lg px-5 py-2 rounded text-sm hover:bg-gray-100 transition duration-300">
              انشاء حساب
            </button>
          </Link>
          <Link to={"/signin"}>
            <button className="bg-orange-500 text-white px-5 py-2 rounded text-sm hover:bg-red-500 transition duration-300">
              تسجيل الدخول
            </button>
          </Link>
        </div>
      )}

      <span
        className="text-3xl cursor-pointer lg:hidden block"
        onClick={() => setIsOpen(true)}
      >
        <RiMenu2Fill />
      </span>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-white h-screen w-fit p-5">
            <h1 className="text-xl font-bold">القائمة</h1>
            <hr />
            <ul className="flex flex-col gap-5 items-start mt-10">
              <li className="hover:text-orange-500 transition duration-300">
                <Link to="/">الرئيسية</Link>
              </li>
              <li className="hover:text-orange-500 transition duration-300">
                <Link to="/mytasks">مهماتي</Link>
              </li>
              <li className="hover:text-orange-500 transition duration-300">
                <Link to="/profile">الملف الشخصي</Link>
              </li>
            </ul>
            {user ? (
              <button
                className="bg-red-600 text-white px-5 py-2 rounded text-sm hover:bg-red-500 transition duration-300 mt-10"
                onClick={handleLogOut}
              >
                تسجيل الخروج
              </button>
            ) : (
              <div className="flex gap-1 items-start mt-20">
                <Link to={"/signup"}>
                  <button className="bg-white shadow-lg px-5 py-2 rounded text-sm hover:bg-gray-100 transition duration-300">
                    انشاء حساب
                  </button>
                </Link>
                <Link to={"/signin"}>
                  <button className="bg-orange-500 text-white px-5 py-2 rounded text-sm hover:bg-red-500 transition duration-300">
                    تسجيل الدخول
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
