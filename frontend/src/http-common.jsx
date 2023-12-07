import axios from "axios";

export default axios.create({
  baseURL: "http://172.201.242.16:8000",
  headers: {
    "Content-type": "application/json",
  },
});
