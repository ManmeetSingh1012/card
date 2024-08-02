import { useParams } from "react-router-dom";
import CategoryCard from "../../../components/CategoryCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { set, useForm } from "react-hook-form";

export default function ChildCategory() {
  const { id, child_id } = useParams();
  console.log(child_id);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubCategories] = useState([]);
  const [change, setChange] = useState(false);
  const [flow, setFlow] = useState([]);
  const [parentName, setParentName] = useState("");

  const [card, setcardata] = useState([]);
  const [newcard, setnewcard] = useState([]);

  const [cardcount, setcardcount] = useState(0);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const fetchParentName = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_LINK}/api/childCategories/${id}`
      );

      setParentName(response.data[0].name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_LINK}/api/childCategories/${child_id}`
        );

        console.log(response.data);
        setSubCategories(response.data[1]);

        console.log(response.data[1].length);
        setFlow([response.data[0]]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchParentName();

    fetchCategories();
  }, [change]);

  const savedata = async (data) => {
    console.log("fetching data", data);
    data.sequence = cardcount + 1;
    data.parent_id = child_id;
    try {
      await axios
        .post(`${import.meta.env.VITE_LOCAL_LINK}/api/addCategory`, data)
        .then((response) => {
          const data = response.data;
          console.log(data);
          // setcardata(data);
          setcardcount(data.length);
          setChange(!change);

          setError("");
          setLoading(false);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useForm({});

  const addnewcards = () => {
    setnewcard([...newcard, { id: newcard.length + 1, name: newName }]);
    setNewName("");
  };

  const deletenewcardscount = () => {
    if (newcard.length > 0) {
      setnewcard([...newcard].slice(0, newcard.length - 1));
    }

    setNewName("");
  };

  const handleEdit = (item) => {
    console.log("Editing:", item);
    setEditingItem(item);
    console.log("Editing:", item);
    const image_url =
      `${import.meta.env.VITE_LOCAL_LINK}/uploads/` + item.category_image;
    setEditFormData({
      name: item.name,
      description: item.description,
      imageUrl: image_url,
    });
  };

  const handleSave = async () => {
    // Implement your save logic here
    const id = editingItem.id;
    console.log("This is my id", id);

    const form = new FormData();

    form.append("name", editFormData.name);
    form.append("description", editFormData.description);
    form.append("category_image", file);

    try {
      await axios
        .post(
          `${import.meta.env.VITE_LOCAL_LINK}/api/updateCategory/${id}`,
          form
        )
        .then((response) => {
          console.log(response.data.msg);
          setChange(!change);
          //setLoading(false);
        })
        .catch((error) => {
          console.log(error);

          //setLoading(false);
        });
    } catch (error) {
      console.log(error);
      //setLoading(false);
    }

    console.log("Saving:", editFormData);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const addcards = () => {
    const data = {
      name: newName,
      sequence: cardcount + 1,
      status: 1,
    };

    savedata(data);

    setNewName("");

    if (newcard.length > 0) {
      setnewcard([...newcard].slice(0, newcard.length - 1));
    }
  };

  const [file, setfile] = useState(null);

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
          setEditFormData({
            ...editFormData,
            imageUrl: e.target.result,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };
  return (
    <div className="App bg-slate-100 h-screen  pt-10">
      <div className="w-4/5 mx-auto">
        {Object.values(flow).map((item, i) => (
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/categories/categoriespage"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  <svg
                    className="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Categories
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    to={`/categories/childcategory/${id}`}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                  >
                    {parentName}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    {item.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        ))}
      </div>

      <div>
        <div className="w-4/5 rounded-lg overflow p-3 mx-auto shadow-lg  bg-white border border-gray-300">
          <CategoryCard
            category={subcategories}
            child_id={child_id}
            setChange={setChange}
            change={change}
            handleEdit={handleEdit}
          />
        </div>

        <div className="w-4/5 rounded-lg overflow-hidden mx-auto shadow-lg  bg-white border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {newcard.map((item, i) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subcategories.length + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={addcards}
                      >
                        Save
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={deletenewcardscount}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingItem && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-hidden h-full w-full flex items-center justify-center z-50">
            <div className="relative mx-auto p-5 border w-full max-w-md max-h-[90vh] shadow-lg rounded-md bg-white overflow-y-auto">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Edit Item
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <div className="mb-4">
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
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={editFormData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="mt-1 block w-full pl-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <div className="mt-1 flex flex-col items-center">
                    <div className="w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg p-2 flex items-center justify-center">
                      {editFormData.imageUrl ? (
                        <img
                          src={editFormData.imageUrl}
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
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="w-4/5 mx-auto pt-4">
        <div
          className="p-5 border-4 border-dotted border-gray-300 rounded-lg flex items-center justify-center h-2 w-full cursor-pointer hover:bg-gray-100"
          onClick={addnewcards}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.75v14.5m7.25-7.25H4.75"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
