import { ChartContainer, StatsContainer } from "../compnents/index";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "../api/Jobs";
const statquery={
  queryKey: ["stats"],
  queryFn: getStats,
}
export const loader = (querClient) => async() => {
  const data = await querClient.ensureQueryData(statquery)
  return null;
};
const Stats = () => {
  // const { defaultStats, monthlyApplications } = useLoaderData();
  
  const {data} = useQuery(statquery)
  const { defaultStats, monthlyApplications } = data
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
