import customFetch from "../utils/customFetch";

export async function getStats() {
  const response = await customFetch.get("/jobs/stats");
  console.log(response.data);
  return response.data;
}
export async function getCurrentUser() {
  const response = await customFetch.get("/user/current-user");
  return response.data;
}
export async function getjobs(params) {
  const response = await customFetch.get("/jobs/get", {
    params,
  });
  return response.data;
}
export async function Editjb(id) {
  const {data} = await customFetch.get(`/jobs/get/${id}`)

  return data;
}
