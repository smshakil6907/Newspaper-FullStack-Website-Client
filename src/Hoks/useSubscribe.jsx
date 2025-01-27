import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

export default function useSubscribe() {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isSubscribe, isPending: isSubscribeLoading } = useQuery({
    queryKey: [user?.email, "isSubscribe"],
    enabled: !!user?.email && !!localStorage.getItem(`access-token`),
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/subscribe/${user.email}`);
      // console.log(res.data);
      return res.data?.subscribe;
    },
  });
  return [isSubscribe, isSubscribeLoading];
}
