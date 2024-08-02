import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// import http from "../services/axiosintercepters";
import { useSelector } from "react-redux";
import { Outlet, Link, Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { id, child_id } = useParams();
  const { variant_id } = useParams();

  const token = useSelector((state) => state.user.token);
  console.log(token);

  const location = useLocation();
  console.log(location.pathname);

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-100 dark:bg-gray-700" : "";
  };

  //const token = localStorage.getItem('token')

  /*const fetchUsers = () => {
    const url = "/get-user";

    http.get(url)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.data);  // Set the users state with the retrieved data
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }*/

  return (
    <div className="w-full">
      <aside
        id="logo-sidebar"
        className="md:visible fixed top-0 left-0 z-40 w-52 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link to="/" className="flex items-center ps-2.5 mb-5">
            <span className="self-center text-lg font-semibold whitespace-nowrap">
              {""}
            </span>
          </Link>
          <ul className="space-y-2 font-normal text-xs">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
                  "/dashboard"
                )}`}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                  />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/categories/categoriespage"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group 
                  ${isActive("/categories/categoriespage")}
                  ${isActive(`/categories/childcategory/${id}`)}
                  ${isActive(`/categories/${id}/${child_id}`)}
          
                `}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                  />
                </svg>
                <span className="ms-3">Categories</span>
              </Link>
            </li>

            <li>
              <Link
                to="/attributes"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group
                   ${isActive("/attributes")}
                   ${isActive(`/attributes/attributesvalue/${id}`)}
                `}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                  />
                </svg>
                <span className="ms-3">Attributes</span>
              </Link>
            </li>

            <li>
              <Link
                to="/qualities"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
                  "/qualities"
                )}
                
               `}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                  />
                </svg>
                <span className="ms-3">Qualities</span>
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group 
                  ${isActive("/products")}
                  ${isActive(`/products/editproduct/${id}`)}
                  ${isActive(`/products/viewproduct/${id}`)}
                  ${isActive(`/products/${id}/variants`)}
                  ${isActive(`/products/${id}/variants/addvariant`)}
                  ${isActive(`/products/${id}/variants/${variant_id}`)}
                `}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                  />
                </svg>
                <span className="ms-3">Products</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="ml-52">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

/*

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={fetchUsers}>Fetch Users</button>
    <ul>
      {users.map(user => (
        <li key={user.id} className="text-gray-800">{user.name}</li>
      ))}
    </ul>


  */
