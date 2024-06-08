import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UserDataRow from "../../Components/Dashboard/Tablerows/UserDataRow";
import Loader from "../Shared/Loader";
import { useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  const { data: usersCount = 0 } = useQuery({
    queryKey: ["usersCount"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/usersCount");
      setCount(data?.count);
      return data?.count;
    },
  });

  console.log(usersCount);

  const numbersOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numbersOfPages).keys()].map((e) => e + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
    refetch();
    console.log(value);
  };

  if (isLoading) return <Loader></Loader>;
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <Helmet>
          <title> novaNews || All Users</title>
        </Helmet>

        <div className="flex items-center relative -left-4 pt-12 gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">All Users</h2>

          <span className="px-3 py-1 text-xs text-[#FF5537] bg-[#ff553710]  rounded-full ">
            {count} Users
          </span>
        </div>

        <div className="pb-8">
          <div className="-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Profile Photo
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-5 text-center py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* User data table row */}
                  {users?.map((user) => (
                    <UserDataRow
                      key={user?._id}
                      user={user}
                      refetch={refetch}
                    ></UserDataRow>
                  ))}
                </tbody>
              </table>
            </div>
            {/* pagination */}
            <div className="mb-16">
              <div className="flex justify-center mt-12">
                {/* previous */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePaginationButton(currentPage - 1)}
                  className="px-4 py-2 mx-1  disabled:text-gray-500 capitalize rounded-full disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#FF5537]/80 bg-[#FF5537] text-white"
                >
                  <div className="flex items-center -mx-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-1 rtl:-scale-x-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>

                    <span className="mx-1">previous</span>
                  </div>
                </button>

                {/* numbers */}
                {pages.map((btnNum) => (
                  <button
                    onClick={() => handlePaginationButton(btnNum)}
                    key={btnNum}
                    className={`hidden px-4 py-2 mx-1 ${
                      currentPage === btnNum ? "bg-[#FF5537] text-white" : ""
                    } transition-colors duration-300 transform  rounded-full  sm:inline hover:bg-[#FF5537]/80  hover:text-white`}
                  >
                    {btnNum}
                  </button>
                ))}

                {/* NEXT */}
                <button
                  disabled={currentPage === numbersOfPages}
                  onClick={() => handlePaginationButton(currentPage + 1)}
                  className="px-4 py-2 mx-1 text-white disabled:text-gray-500 capitalize rounded-full disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#FF5537]/80 bg-[#FF5537] "
                >
                  <div className="flex items-center -mx-1">
                    <span className="mx-1">Next</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-1 rtl:-scale-x-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
