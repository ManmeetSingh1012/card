import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddVariant({ mode }) {
  const [productAttributes, setProductAttributes] = useState([]);
  const [productQualities, setProductQualities] = useState([]);
  const [file, setfile] = useState(null);
  const [attribute_id, setAttribute_id] = useState(null);
  const navigate = useNavigate();
  const { id, variant_id } = useParams();

  const fetchProductAttribute = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_LINK}/api/getAttributes`
      );
      const data = await response.json();

      console.log(`This is my Attributes data ${data}`);
      setProductAttributes(data);
    } catch (error) {
      console.error("Error fetching product categories:", error);
    }
  };

  const fetchAttributeValues = async (id) => {
    console.log("fetching data for attribute id:", id);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_LINK}/api/getAttributeValues/${id}`
      );
      const data = response.data;
      console.log(`These are Attribute values:`, data);
      setProductQualities(data);
    } catch (error) {
      console.error("Error fetching product qualities:", error);
    }
  };

  const fetchVariantDetails = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_LOCAL_LINK
        }/api/getProductVariantById/${variant_id}`
      );
      const data = await response.json();
      console.log("This is my Product data", data);
      setFormData({
        name: data.name,
        description: data.description,
        product_image: `${import.meta.env.VITE_LOCAL_LINK}/uploads/${
          data.product_image
        }`,
        extra_price: Math.round(parseFloat(data.extra_price)),
        product_id: id,
        product_attribute_value_id: data.product_attribute_value_id,
      });

      setAttribute_id(data.Product_Attribute_Value.product_attribute_id);
      // Fetch attribute values for the selected product attribute
      await fetchAttributeValues(
        data.Product_Attribute_Value.product_attribute_id
      );

      console.log(`This is my Product data ${data}`);
    } catch (error) {
      console.error("Error fetching product categories:", error);
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    product_image: "",
    extra_price: "",

    product_id: id,
    product_attribute_value_id: "",
  });
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    console.log("value", value);
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "product_attribute") {
      setAttribute_id(value);
      await fetchAttributeValues(value);
    }
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

  mode == "edit"
    ? useEffect(() => {
        // Fetch product categories and qualities from the API
        fetchProductAttribute();

        fetchVariantDetails();
      }, [])
    : null;

  useEffect(() => {
    fetchProductAttribute();
    if (variant_id) {
      fetchVariantDetails();
    }
  }, [variant_id]);

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
      const response =
        mode == "edit"
          ? await axios.put(
              `${
                import.meta.env.VITE_LOCAL_LINK
              }/api/updateProductVariant/${variant_id}`,
              form,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
          : await axios.post(
              `${import.meta.env.VITE_LOCAL_LINK}/api/addProductVariant`,
              form,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
      console.log("Response:", response.data);
      navigate(`/products/${id}/variants`);
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
              htmlFor="extra_price"
              className="block text-sm font-medium text-gray-700"
            >
              Extra Price
            </label>
            <input
              type="number"
              name="extra_price"
              id="extra_price"
              value={formData.extra_price}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="product_attribute"
              className="block text-sm font-medium text-gray-700"
            >
              Product Attribute
            </label>
            <select
              name="product_attribute"
              id="product_attribute"
              value={attribute_id}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {productAttributes.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="product_attribute_value"
              className="block text-sm font-medium text-gray-700"
            >
              Attribute Value
            </label>
            <select
              name="product_attribute_value_id"
              id="productQuality"
              value={formData.product_attribute_value_id}
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
                  extra_price: "",

                  product_id: "",
                  product_attribute_value_id: "",
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
