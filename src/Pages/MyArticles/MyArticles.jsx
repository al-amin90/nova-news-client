import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader";
import { Helmet } from "react-helmet-async";
import BannerHead from "../../Components/Shared/BannerHead";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const MyArticles = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [modal2Open, setModal2Open] = useState(false);
  const [declineSms, setDeclineSms] = useState("");

  const openModal = (sms) => {
    setModal2Open(true);
    setDeclineSms(sms);
  };

  const closeModal = () => {
    setModal2Open(false);
    setDeclineSms("");
  };

  // -------------------

  const {
    data: articles = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myArticles"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/articles/${user?.email}`);
      return data;
    },
  });

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

  // handle delted
  const handleDelete = (id) => {
    deletedArticle(id);
  };

  // -------------

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="pb-28">
      <Helmet>
        <title> novaNews || My Articles</title>
      </Helmet>

      {/* top banner component */}
      <BannerHead
        label={"My Articles"}
        image={
          "https://i.ibb.co/0jqMbc5/hunters-race-MYbh-N8-Kaa-Ec-unsplash.jpg"
        }
      ></BannerHead>

      {/* cards */}
      <div className="flex flex-col max-w-7xl w-[90%] mt-28 mx-auto">
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
                        <span>Serial No</span>
                      </div>
                    </th>
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
                      <span>Status</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Is Premium</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    ></th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-normal text-left rtl:text-right text-gray-500"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {articles?.map((art, idx) => (
                    <tr key={art._id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {art?.title.slice(0, 18)}...
                      </td>

                      <td className="px-4 py-4 flex gap-3 items-center text-sm font-medium text-gray-700 whitespace-nowrap">
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

                        {art?.status === "declined" ? (
                          <>
                            <button
                              title="Why Decline"
                              className="text-gray-500 bg-red-100/60 m-auto transition-colors duration-200 rounded-full  hover:text-red-500 focus:outline-none disabled:cursor-not-allowed"
                              onClick={() => openModal(art?.declineReason)}
                            >
                              <FaQuestionCircle className="text-2xl ml-3" />
                            </button>
                            <Modal
                              centered
                              open={modal2Open}
                              onCancel={() => closeModal(false)}
                            >
                              <div>
                                <h2 className="text-center text-xl font-semibold mt-2">
                                  Behind the action is?
                                </h2>
                                <p className="text-center mt-8 w-5/6 mx-auto">
                                  {declineSms}
                                </p>
                              </div>
                            </Modal>
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="px-4 md:pl-9 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {art?.isPremium === true ? (
                          <span className="text-orange-400">Yes</span>
                        ) : (
                          "No"
                        )}
                      </td>

                      {/* actions are here */}

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button
                          onClick={() =>
                            navigate(`/articlesDetails/${art._id}`)
                          }
                          title="See the details"
                          className=" text-white ml-4 px-3 py-1 transition-colors duration-200   bg-[#FF2602]/90 rounded-md focus:outline-none "
                        >
                          Details
                        </button>
                      </td>

                      <td className="px-4 py-4  whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/updateArticle/${art._id}`)}
                          title="Edit Article"
                          className="text-gray-500 m-auto transition-colors duration-200   hover:text-green-500 focus:outline-none disabled:cursor-not-allowed"
                        >
                          <FaRegEdit className="text-xl ml-3" />
                        </button>
                      </td>
                      <td className="px-4 py-4  whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(art._id)}
                          title="Delete Article"
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
    </div>
  );
};

export default MyArticles;
