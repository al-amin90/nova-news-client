import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin = "", isLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email || !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data.isAdmin;
    },
  });
  console.log(isAdmin);

  return [isAdmin, isLoading];
};

export default useRole;
