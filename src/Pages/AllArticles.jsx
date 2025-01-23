import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../Hoks/useAxiosPublic";

export default function AllArticles() {
  const axiosPublic = useAxiosPublic();

  const { data = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles");
      return res.data;
    },
  });

  const status = data.filter((article) => article.status === "approved");

  return (
    <div>
      <h2>This is all Articles: {status.length}</h2>
    </div>
  );
}
