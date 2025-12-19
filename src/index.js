import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Booking from "./Pages/Booking";
import BookingHistory from "./Pages/BookingHistory";
import VehicleListing from "./Pages/VehicleListing";
import VehicleForm from "./Pages/VehicleForm";
import Login from "./Pages/Login";
import AdminProtectedRoute from "./Pages/AdminProtectedRoute";
import AdminLogin from "./Pages/AdminLogin";
import Contact from "./Pages/Contact";
import Signup from "./Pages/Signup";
import UserProtectedRoute from "./Pages/UserProtectedRoute";

const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <UserProtectedRoute>
          <Home></Home>
        </UserProtectedRoute>
      },
      {
        path: "/about",
        element: <UserProtectedRoute>
          <About></About>
        </UserProtectedRoute>
      },
      {
        path: "/vehiclelisting",
        element: <UserProtectedRoute>
          <VehicleListing></VehicleListing>
        </UserProtectedRoute>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      },
      {
        path: "/booking/:bid",
        element: <Booking></Booking>,
      },
      {
        path: "/bookinghistory",
        element: <UserProtectedRoute><BookingHistory></BookingHistory></UserProtectedRoute>
      },
      {
        path: "/addVehicle",
        element:(
          <AdminProtectedRoute>
            <VehicleForm />
          </AdminProtectedRoute>
        )
      },
      {
        path: "/adminlogin",
        element: <AdminLogin></AdminLogin>
      },
      {
        path: "/contact",
        element: <UserProtectedRoute><Contact></Contact></UserProtectedRoute>
      },
      {
        path: "*",
        element: <h1>Page not found Please check your URL</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerVariables}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
