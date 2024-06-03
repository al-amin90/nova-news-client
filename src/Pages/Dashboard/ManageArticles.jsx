import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../Shared/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import { toast } from "react-hot-toast";
import DeclineModal from "../../Components/Modal/DeclineModal";

const ManageArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [modal2Open, setModal2Open] = useState(false);
  const [article, setArticle] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState("");

  const closeModal = () => {
    setModal2Open(false);
    setArticle(null);
    setTextAreaValue("");
  };

  const {
    data: allArticles,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allArticles"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/allArticles");
      return data;
    },
  });

  // patch calls
  const { mutateAsync } = useMutation({
    mutationFn: async (value) => {
      const { data } = await axiosSecure.patch(`/article/${value?.id}`, value);
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      toast.success("Your Request is Successful! ");
    },
  });

  // delete article
  const { mutateAsync: deletedArticle } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/article/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      toast.success("Article Deleted is Successfully! ");
    },
  });

  console.log(allArticles);

  // handle update state isPremium & approved
  const handleState = (id, state) => {
    let value = {};
    if (state === "approved") {
      value = { id, status: "approved" };
      mutateAsync(value);
    }
    if (state === true) {
      value = { id, isPremium: true };
      mutateAsync(value);
    }
  };

  // handle delted
  const handleDelete = (id) => {
    deletedArticle(id);
  };

  // --------------------------------------------
  const openModal = (article) => {
    setModal2Open(true);
    setArticle(article);
  };

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const handleSubmitt = async () => {
    if (article) {
      const value = {
        id: article?._id,
        declineReason: textAreaValue,
        status: "declined",
      };
      console.log(value);

      await mutateAsync(value);
      closeModal();
    }
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <section className="container px-4 mx-auto pt-12">
      <Helmet>
        <title> novaNews || All Articles</title>
      </Helmet>

      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">All Articles</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {allArticles?.length} Articles
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Name</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Email</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Photo
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Publisher
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Premium
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Approve
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Decline
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {allArticles?.map((art) => (
                    <tr key={art._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {art?.title.slice(0, 18)}...
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {art?.author?.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {art?.author?.email.split("@")[0]}@
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={art?.author?.photo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {new Date(art?.timeStamp).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                                ${
                                  art?.status === "pending" &&
                                  "text-yellow-500 bg-yellow-100/60"
                                }
                                ${
                                  art?.status === "approved" &&
                                  "text-emerald-500 bg-emerald-100/60"
                                }
                                ${
                                  art?.status === "declined" &&
                                  "text-red-500 bg-red-100/60"
                                }
                                `}
                        >
                          <span
                            className={`rounded-full  ${
                              art?.status === "pending" && "bg-yellow-500"
                            } ${art?.status === "approved" && "bg-green-500"}
                            ${art?.status === "declined" && "bg-red-500"} `}
                          ></span>
                          <h2 className="text-sm capitalize font-normal ">
                            {art?.status}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {art?.publisher?.value}
                      </td>

                      {/* actions are here */}
                      <td className="px-4 py-4  whitespace-nowrap">
                        <button
                          onClick={() => handleState(art._id, true)}
                          disabled={art.isPremium === true}
                          title="Mark Premium"
                          className="text-gray-500 m-auto transition-colors duration-200   hover:text-green-500 focus:outline-none disabled:cursor-not-allowed"
                        >
                          <MdWorkspacePremium className="text-2xl ml-3" />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button
                          onClick={() => handleState(art._id, "approved")}
                          disabled={art.status !== "pending"}
                          title="Mark Approve"
                          className="text-gray-500 ml-4 transition-colors duration-200   hover:text-green-500 focus:outline-none disabled:cursor-not-allowed"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                            />
                          </svg>
                        </button>
                      </td>

                      <td className="px-4 py-4  whitespace-nowrap">
                        <button
                          disabled={art.status !== "pending"}
                          title="Mark Decline"
                          className="text-gray-500 m-auto transition-colors duration-200   hover:text-red-500 focus:outline-none disabled:cursor-not-allowed"
                          onClick={() => openModal(art)}
                        >
                          <MdCancel className="text-2xl ml-3" />
                        </button>
                        {modal2Open && (
                          <DeclineModal
                            textAreaValue={textAreaValue}
                            handleTextAreaChange={handleTextAreaChange}
                            modal2Open={modal2Open}
                            setModal2Open={setModal2Open}
                            handleSubmitt={handleSubmitt}
                          ></DeclineModal>
                        )}
                      </td>
                      <td className="px-4 py-4  whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(art._id)}
                          title="Mark Delete"
                          className="text-gray-500 m-auto transition-colors duration-200   hover:text-red-500 focus:outline-none disabled:cursor-not-allowed"
                        >
                          <MdDeleteForever className="text-2xl ml-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageArticles;
