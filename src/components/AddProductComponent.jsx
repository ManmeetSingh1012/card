import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductComponent() {
  const [productCategories, setProductCategories] = useState([]);
  const [productQualities, setProductQualities] = useState([]);
  const [file, setfile] = useState(null);
  const navigate = useNavigate();
  const fetchProductCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_LINK}/api/categories`
      );
      const data = await response.json();

      console.log(`This is my categories data ${data}`);
      setProductCategories(data);
    } catch (error) {
      console.error("Error fetching product categories:", error);
    }
  };

  const fetchProductQualities = async () => {
    console.log("fetching data");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_LINK}/api/getproductQuality`
      );
      const data = response.data;
      console.log(`These are Product Qualities:`, data);
      setProductQualities(data);
    } catch (error) {
      console.error("Error fetching product qualities:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    product_image: "",
    base_price: "",
    tax_percentage: "",
    product_category_id: "",
    product_quality_id: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setfile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData({
            ...formData,
            product_image: e.target.result,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  useEffect(() => {
    // Fetch product categories and qualities from the API
    fetchProductCategories();
    fetchProductQualities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data before submission:", formData);

    const form = new FormData();

    // Correctly append form data
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    // Append the file separately
    if (file) {
      form.append("product_image", file);
    }

    console.log("FormData contents:");
    for (let [key, value] of form.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_LINK}/api/addProduct`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      navigate("/products");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-slate-100 w-full py-5">
      <div className="w-4/5  bg-white shadow-md mx-auto p-5 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="mt-1 flex flex-col items-center">
                <div className="w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg p-2 flex items-center justify-center">
                  {formData.product_image ? (
                    <img
                      src={formData.product_image}
                      alt="Current"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleImageChange}
                  className="mt-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change Image
                </button>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="base_price"
              className="block text-sm font-medium text-gray-700"
            >
              Base Price
            </label>
            <input
              type="number"
              name="base_price"
              id="base_price"
              value={formData.base_price}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="tax_percentage"
              className="block text-sm font-medium text-gray-700"
            >
              Tax Percentage
            </label>
            <input
              type="number"
              name="tax_percentage"
              id="tax_percentage"
              value={formData.tax_percentage}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="product_category_id"
              className="block text-sm font-medium text-gray-700"
            >
              Product Category
            </label>
            <select
              name="product_category_id"
              id="product_category_id"
              value={formData.product_category_id}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {productCategories.map((category) => (
                <React.Fragment key={category.id}>
                  <option value={category.id}>{category.name}</option>
                  {category.sub_categories.map((subcategory) => (
                    <option
                      key={subcategory.id}
                      value={subcategory.id}
                      className="pl-6 text-gray-600"
                    >
                      &nbsp;&nbsp;{subcategory.name}
                    </option>
                  ))}
                </React.Fragment>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="product_quality_id"
              className="block text-sm font-medium text-gray-700"
            >
              Product Quality
            </label>
            <select
              name="product_quality_id" // Changed from "productQuality"
              id="productQuality"
              value={formData.product_quality_id}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a quality</option>
              {productQualities.map((quality) => (
                <option key={quality.id} value={quality.id}>
                  {quality.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: "",
                  description: "",
                  product_image: "",
                  base_price: "",
                  tax_percentage: "",
                  product_category_id: "",
                  product_quality_id: "",
                })
              }
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
