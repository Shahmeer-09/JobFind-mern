import {
  RouterProvider,
  
  createBrowserRouter,
} from "react-router-dom";
import { HomeLayout, DashboardLayout, Error, Landing, Login , Register,AddJob, AllJobs, Stats, Profile, Admin } from "./pages";
const DefaultthemeCheker = ()=>{
  const currentTheme= localStorage.getItem('darktheme') === 'true'
  document.body.classList.toggle('dark-theme', currentTheme)
  return currentTheme;
}  
const themeSetter =  DefaultthemeCheker()
const router = createBrowserRouter(
  
[

  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index : true, 
        element:<Landing/>,
      },
      {
        path :"login",
        element:<Login/>
      },
      {
        path :"register",
        element:<Register/>
      },
      {
        path :"dashboard",
        element:<DashboardLayout themeSetter={themeSetter} />,
        children:[
          {
            index : true,
            element: <AddJob/>
          },
          {
            path :"stats",
            element: <Stats/>
          },
          {
            path :"all-jobs",
            element: <AllJobs/>
          },
          {
            path :"profile",
            element: <Profile/>
          },
          {
            path :"admin",
            element: <Admin/>
          }

        ]
      }
    ]
   }  

   
  ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
