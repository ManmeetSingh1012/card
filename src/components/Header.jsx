import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../Redux/authslice"; // Assuming you have an auth slice for Redux

const Header = () => {
  const [showUserDialog, setShowUserDialog] = useState(false);
  //const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signout());
    navigate("/login");
  };

  return (
    <header className="bg-white text-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Card Printer Text */}
        <div className="text-xl font-bold">Flora Graphics</div>

        <div className="flex items-center space-x-4">
          {/* User Icon */}
          <div className="relative">
            <svg
              className="w-6 h-6 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setShowUserDialog(!showUserDialog)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>

            {/* User Dialog */}
            {showUserDialog && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                <div className="px-4 py-2 text-sm text-gray-700">
                  {user.email}
                </div>
              </div>
            )}
          </div>

          {/* Logout Icon */}
          <svg
            className="w-6 h-6 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleLogout}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
