import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [card, setcardata] = useState([]);
  const [newcard, setnewcard] = useState([]);
  const [error, setError] = useState("");
  const [cardcount, setcardcount] = useState(0);
  const navigate = useNavigate();
  const [change, setchange] = useState(false);
  const [updatecardid, setupdatecardid] = useState(null);
  const [page, setpage] = useState(1);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    // Changed default to checkbox
  });

  const [count, setCount] = useState(null);
  const [currentpage, setcurrentpage] = useState(1);

  // this will be the index of the first element on the page.
  const [startindex, setstartindex] = useState(0);

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
        .get(`${import.meta.env.VITE_LOCAL_LINK}/api/getProducts`)
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
    navigate("/products/addproduct");
  };

  const handleEdit = (item) => {
    navigate(`/products/editproduct/${item.id}`);
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
        .delete(`${import.meta.env.VITE_LOCAL_LINK}/api/deleteProduct/${id}`)
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
    navigate(`/products/viewproduct/${id}`);
  };

  const handleVariant = (id) => {
    console.log("View Variant:", id);
    navigate(`/products/${id}/variants`);
  };

  const calculatepage = () => {
    const length = card.length;
    const pages = Math.ceil(length / 2);
    setpage(pages);

    console.log("Pages:", pages);
  };

  useEffect(() => {
    calculatepage();
  }, [card]);

  const prev = () => {
    if (currentpage > 1) {
      setcurrentpage(currentpage - 1);
      setstartindex(startindex - 2);
    }
  };

  const next = () => {
    if (currentpage < page) {
      setcurrentpage(currentpage + 1);
      setstartindex((currentpage + 1 - 1) * 2);
      console.log("page", currentpage);
    }
  };

  return (
    <div className="bg-slate-100 w-full   pt-10">
      <div className="w-11/12 mx-auto">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center">
            <li className="inline-flex items-center">
              <Link
                to="/products"
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
                Products
              </Link>
            </li>
          </ol>
        </nav>
      </div>

      <div className="w-11/12 rounded-lg overflow-hidden mx-auto shadow-lg p-3 bg-white border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr No
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>

              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>

              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.values(card)
              .slice(startindex, startindex + 2)
              .map((item, i) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                    {startindex + 1 + i}
                  </td>

                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {item.name}
                  </td>

                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    <div className="mb-4">
                      <div className="mt-1 flex flex-col items-center">
                        <div className="w-40 h-40 border-2 border-gray-300 border-dashed rounded-lg p-2 flex items-center justify-center">
                          {item.product_image ? (
                            <img
                              src={`${
                                import.meta.env.VITE_LOCAL_LINK
                              }/uploads/${item.product_image}`}
                              alt={item.name}
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
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">
                    {item.description}
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

                      <button
                        onClick={() => handleVariant(item.id)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6 text-gray-800"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
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

      <div className="w-11/12 mx-auto py-5">
        <div className="flex justify-end">
          <nav aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px text-sm">
              {currentpage > 1 ? (
                <li onClick={prev}>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 shadow-lg"
                  >
                    Previous
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 shadow-lg"
                  >
                    Previous
                  </a>
                </li>
              )}

              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 shadow-lg"
                >
                  {currentpage}
                </a>
              </li>

              {currentpage < page ? (
                <li onClick={next}>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700  shadow-lg"
                  >
                    Next
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href="#"
                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 shadow-lg"
                  >
                    Next
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      <div className="w-11/12 mx-auto py-5">
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
