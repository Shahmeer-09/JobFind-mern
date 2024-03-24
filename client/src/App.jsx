import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  DashboardLayout,
  Error,
  Landing,
  Login,
  EditJob,
  Register,
  AddJob,
  AllJobs,
  Stats,
  Profile,
  Admin,
} from "./pages/index";
import Errorelem from "./compnents/Errorelem"
import { action as regAction } from "./pages/Register";
import { action as logAction } from "./pages/Login";
import { action as addJobAction } from "./pages/AddJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deletejobAction } from "./pages/DeleteJOb";
import { action as profileAction } from "./pages/Profile";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as alljobsLoader } from "./pages/AllJobs";
import { loader as editjobsLoader } from "./pages/EditJob";
import { loader as adminLoader } from "./pages/Admin";
import { loader as StatsLoader } from "./pages/Stats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});
export const DefaultthemeCheker = () => {
  const currentTheme = localStorage.getItem("darktheme") === "true";
  document.body.classList.toggle("dark-theme", currentTheme);
  return currentTheme;
};
DefaultthemeCheker();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: logAction(queryClient),
      },
      {
        path: "register",
        element: <Register />,
        action: regAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: "stats",
            element: <Stats />,
            loader: StatsLoader(queryClient),
            errorElement : <Errorelem/>
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: alljobsLoader(queryClient),
            action: deletejobAction,
            errorElement : <Errorelem/>,

          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-jobs/:id",
            element: <EditJob />,
            loader: editjobsLoader(queryClient),
            action: editJobAction(queryClient),
            errorElement : <Errorelem/>,
          },
          {
            path: "delete-jobs/:id",
            action: deletejobAction(queryClient),
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />  
    </QueryClientProvider>
  );
}

export default App;
