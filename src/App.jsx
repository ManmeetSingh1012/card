import { Suspense, lazy, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utility/PrivateRoute.jsx";

const Login = lazy(() => import("./Pages/Login.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard.jsx"));
const Home = lazy(() => import("./Pages/dashboard/Home.jsx"));
const SubChildCategory = lazy(() =>
  import("./Pages/dashboard/SubChildCategory.jsx")
);

const ChildCategory = lazy(() => import("./Pages/dashboard/ChildCategory.jsx"));

const Landing = lazy(() => import("./Pages/Landing.jsx"));
const DefaultPage = lazy(() => import("./Pages/dashboard/Default.jsx"));
//
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="/dashboard" element={<DefaultPage />} />

              <Route path="/categories/categoriespage" element={<Home />} />

              <Route
                path="/categories/childcategory/:id"
                element={<ChildCategory />}
              />
              <Route
                path="/categories/:id/:child_id"
                element={<SubChildCategory />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
