import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://newspaper-fullstack-website-server.vercel.app/",
});

export default function useAxiosPublic() {
  return axiosPublic;
}
