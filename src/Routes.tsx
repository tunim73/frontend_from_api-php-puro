import { Course, MyCourses } from "pages/private";
import { ErrorPage, Home, Login, Register } from "pages/public";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { BasicLayout, LayoutWithAuth } from "shared/Layouts";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/home"} />,
  },
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutWithAuth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "meus-cursos",
        element: <MyCourses />,
      },
      {
        path: "curso/:id",
        element: <Course />,
      },
    ],
  },
]);
