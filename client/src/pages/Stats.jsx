import { ChartContainer, StatsContainer } from "../compnents/index";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  console.log(monthlyApplications, defaultStats);
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications.length > 0 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
