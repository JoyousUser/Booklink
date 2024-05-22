import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);