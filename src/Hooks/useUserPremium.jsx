import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useUserPremium = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: isUserPremium = false, refetch } = useQuery({
    queryKey: ["isUserPremium", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/isUserPremium/${user?.email}`);
      return data.isSubscription;
    },
  });

  return [isUserPremium, refetch];
};

export default useUserPremium;
