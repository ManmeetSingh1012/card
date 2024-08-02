import { useParams } from "react-router-dom";
import CategoryCard from "../../../components/CategoryCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../../../Redux/authslice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AttributesValue() {
  const { id } = useParams();
  console.log(id);

  const notify = () => toast("Data Updated Successfully !");

  const getParent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_LINK}/api/getAttributeById/${id}`
      );
      const data = response.data;
      console.log(data);
      setFlow(data.name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(
          `${import.meta.env.VITE_LOCAL_LINK}/api/deleteAttributeValue/${id}`
        )
        .then((response) => {
          setError("");
          setChange(!change);
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

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubCategories] = useState([]);
  const [change, setChange] = useState(false);
  const [flow, setFlow] = useState(null);
  const [cardcount, setcardcount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    getParent();

    const fetchAttributeValues = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_LINK}/api/getAttributeValue/${id}`
        );
        const data = response.data;
        setSubCategories(data);
        console.log(data);

        setcardcount(data.length);
        //dispatch(add(response.data[0]));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAttributeValues();
  }, [change]);

  const [newName, setNewName] = useState("");

  const [card, setcardata] = useState([]);
  const [newcard, setnewcard] = useState([]);

  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
  });
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
    setEditFormData({
      name: item.name,
    });
  };

  const handleSave = async () => {
    // Implement your save logic here
    const id = editingItem.id;
    console.log("This is my id", id);

    try {
      await axios
        .put(
          `${import.meta.env.VITE_LOCAL_LINK}/api/updateAttributeValue/${id}`,
          editFormData
        )
        .then((response) => {
          console.log(response.data);
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
    notify();
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const savedata = async (data) => {
    console.log("fetching data");

    data.parent_id = id;

    try {
      await axios
        .post(
          `${import.meta.env.VITE_LOCAL_LINK}/api/addAttributeValue/${id}`,
          data
        )
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
  const [isAdding, setIsAdding] = useState(false);

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

  const addnewcards = () => {
    setnewcard([...newcard, { id: newcard.length + 1, name: newName }]);
    setNewName("");
    console.log("new card");
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

  const handleView = (id) => {
    console.log("View:", id);
    navigate(`/attributes/attributesvalue/${id}`);
  };

  return (
    <div className="bg-slate-100 w-full h-screen  pt-10">
      <div className="w-4/5 mx-auto">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center">
            <li className="inline-flex items-center">
              <Link
                to="/attributes"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Attributes
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
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  {flow}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="w-4/5 rounded-lg overflow-hidden mx-auto shadow-lg p-3 bg-white border border-gray-300">
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
            {Object.values(subcategories).map((item, i) => (
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
                        class="w-6 h-6 text-gray-800 "
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
                        class="w-6 h-6 text-gray-800 "
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-4/5 rounded-lg overflow-hidden mx-auto shadow-lg  bg-white border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {newcard.map((item, i) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cardcount + 1}
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

      <div className="w-4/5 mx-auto py-5">
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
