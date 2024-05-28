import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookLink from "./pages/BookLink";
import Browse from "./pages/Browse";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Home />,
    
  },
  {
    path: "/home", 
    element: <Home />,
    
  },
  {
    path: "/login",
    element: <Login />,
    
  },
  {
    path: "/signup",
    element: <Signup />,
    
  },
  {
    path: "/booklink",
    element: <BookLink />,
    
  },
  {
    path: "/browse",
    element: <Browse />,
    
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);