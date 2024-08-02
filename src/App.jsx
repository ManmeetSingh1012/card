import { Suspense, lazy, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utility/PrivateRoute.jsx";

const Login = lazy(() => import("./Pages/Login.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard.jsx"));
const Home = lazy(() => import("./Pages/dashboard/Home.jsx"));

const SubChildCategory = lazy(() =>
  import("./Pages/dashboard/category/SubChildCategory.jsx")
);

const ChildCategory = lazy(() =>
  import("./Pages/dashboard/category/ChildCategory.jsx")
);

const Landing = lazy(() => import("./Pages/Landing.jsx"));
const DefaultPage = lazy(() => import("./Pages/dashboard/Default.jsx"));

const Variant = lazy(() => import("./Pages/dashboard/variants/Variant.jsx"));

const AddVariant = lazy(() =>
  import("./Pages/dashboard/variants/AddVariant.jsx")
);

const Attributes = lazy(() =>
  import("./Pages/dashboard/attribute/Attributes.jsx")
);

const AttributesValue = lazy(() =>
  import("./Pages/dashboard/attribute/AttributesValue.jsx")
);

const Qualities = lazy(() =>
  import("./Pages/dashboard/qualities/Qualities.jsx")
);

const Products = lazy(() => import("./Pages/dashboard/product/Products.jsx"));

const AddProduct = lazy(() => import("./components/AddProductComponent.jsx"));

const EditProduct = lazy(() => import("./components/EditProductComponent.jsx"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
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

              <Route path="/attributes" element={<Attributes />} />

              <Route
                path="/attributes/attributesvalue/:id"
                element={<AttributesValue />}
              />

              <Route path="/qualities" element={<Qualities />} />

              <Route path="/products" element={<Products />} />

              <Route path="/products/addproduct" element={<AddProduct />} />

              <Route
                path="/products/viewproduct/:id"
                element={<EditProduct mode="view" />}
              />

              <Route
                path="/products/editproduct/:id"
                element={<EditProduct mode="edit" />}
              />
              <Route path="/products/:id/variants" element={<Variant />} />

              <Route
                path="/products/:id/variants/:variant_id"
                element={<AddVariant mode="edit" />}
              />

              <Route
                path="/products/:id/variants/addvariant"
                element={<AddVariant mode="add" />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
