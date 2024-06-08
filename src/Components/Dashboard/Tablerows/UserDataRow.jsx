import PropTypes from "prop-types";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import useRole from "../../../Hooks/useRole";

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin, isLoading] = useRole();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const isAdmin = true;
      const { data } = await axiosSecure.patch(`/users/${user?.email}`, {
        isAdmin,
      });
      console.log(data);
      return data;
    },
    onSuccess: () => {
      refetch();
      console.log(user);
      toast.success(`Successfully made Admin!`);
    },
  });

  const handleAdmin = () => {
    console.log("make me admin");
    mutateAsync();
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={user?.photo} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>

      <td className="px-5 text-center py-5 border-b border-gray-200 bg-white text-sm">
        {user?.isAdmin === true ? (
          <span className="relative font-semibold text-base text-green-900">
            Admin
          </span>
        ) : (
          <span
            onClick={handleAdmin}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative ">Make Admin</span>
          </span>
        )}
      </td>
    </tr>
  );
};

export default UserDataRow;
