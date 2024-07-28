import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Landing() {
  //const token = localStorage.getItem('token')
  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();

  const navigateTo = () => {
    token ? navigate("/categories/categoriespage") : navigate("/login");
  };
  return (
    <div className="flex flex-wrap flex-col justify-center items-center mt-20">
      <h1 className="text-center text-3xl  text-gray-900">
        Welcome to Lawyer Admin Dashboard
      </h1>

      {token ? (
        <button
          onClick={navigateTo}
          className="bg-orange-500 text-white px-6 py-3 mt-5 w-fit rounded-lg  hover:bg-orange-600 transition-colors duration-300"
        >
          {"Dashboard"}{" "}
        </button>
      ) : (
        <button
          onClick={navigateTo}
          className="bg-orange-500 text-white px-6 w-fit mt-5 py-3 rounded-lg  hover:bg-orange-600 transition-colors duration-300"
        >
          {"Signin"}{" "}
        </button>
      )}
    </div>
  );
}
