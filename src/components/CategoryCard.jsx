import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

/*<img
        className="w-full"
        src={category.category_image}
        alt={category.name}
      />*/
const CategoryCard = ({
  category,
  id,
  flow,
  setChange,
  change,
  handleEdit,
}) => {
  const navigate = useNavigate();

  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "" });

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_LOCAL_LINK}/api/deleteCategory/${id}`)
        .then((response) => {
          setError("");
          setchange(!change);
          console.log(response.data.msg);
          //setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleView = (child_id) => {
    console.log("View:", id);
    navigate(`/categories/${flow.id}/${child_id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sr No
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.values(category).map((item, i) => (
            <tr key={item.id}>
              <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                {i + 1}
              </td>

              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-900">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </button>
                  {flow ? (
                    <button
                      onClick={() => handleView(item.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <svg
                        className="w-6 h-6 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryCard;
