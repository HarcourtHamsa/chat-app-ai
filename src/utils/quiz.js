import axios from "../libs/axios";

export const submitQuizResponse = async (data) => {
  console.log(data);
  const res = await axios.post("/generate-insight", data);

  if (res.status === 200) {
    return res.data;
  }

  return res;
};
