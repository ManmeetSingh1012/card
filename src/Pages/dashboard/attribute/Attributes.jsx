import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Attributes() {
  const [loading, setLoading] = useState(false);
  const [card, setcardata] = useState([]);
  const [newcard, setnewcard] = useState([]);
  const [error, setError] = useState("");
  const [cardcount, setcardcount] = useState(0);
  const navigate = useNavigate();
  const [change, setchange] = useState(false);
  const [updatecardid, setupdatecardid] = useState(null);

  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    display_type: "", // Changed default to checkbox
  });

  useEffect(() => {
    if (editingItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editingItem]);

  const [file, setfile] = useState(null);

  const fetchdata = async () => {
    console.log("fetching data");
    try {
      await axios
        .get(`${import.meta.env.VITE_LOCAL_LINK}/api/getAttributes`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          setcardata(data);
          setcardcount(data.length);

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

  const savedata = async (data) => {
    console.log("fetching data");
    try {
      await axios
        .post(`${import.meta.env.VITE_LOCAL_LINK}/api/addAttribute`, data)
        .then((response) => {
          const data = response.data;
          console.log(data);
          // setcardata(data);
          setcardcount(data.length);
          setchange(!change);

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

  useEffect(() => {
    console.log("Fetching data", import.meta.env.VITE_LOCAL_LINK);
    fetchdata();
  }, [change]);

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

    setEditFormData({
      id: item.id,
      name: item.name,
      display_type: item.display_type,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_LOCAL_LINK}/api/deleteAttribute/${id}`)
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

  const handleView = (id) => {
    console.log("View:", id);
    navigate(`/attributes/attributesvalue/${id}`);
  };

  const handleSave = async () => {
    console.log("Saving:", editFormData);

    if (editFormData.display_type == "") {
      editFormData.display_type = "checkbox";
    }

    // Implement your save logic here
    console.log("Saving Before:", editFormData);

    try {
      await axios
        .post(
          `${import.meta.env.VITE_LOCAL_LINK}/api/updateAttribute/${
            editFormData.id
          }`,
          editFormData
        )
        .then((response) => {
          console.log(response.data.msg);
          setchange(!change);
          //setLoading(false);
          toast("Wow so easy!");
        })
        .catch((error) => {
          console.log(error);

          //setLoading(false);
        });
    } catch (error) {
      console.log(error);
      //setLoading(false);
    }

    console.log("Saving After:", editFormData);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
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
            {Object.values(card).map((item, i) => (
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
                    <button
                      onClick={() => handleView(item.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <svg
                        class="w-6 h-6 text-gray-800 "
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
              <div className="mb-4">
                <label
                  htmlFor="display_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Display Type
                </label>
                <select
                  name="display_type"
                  id="display_type"
                  value={editFormData.display_type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-1 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="checkbox">Checkbox</option>
                  <option value="radio">Radio</option>
                  <option value="select">Select</option>
                </select>
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
