import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AddProducts from "../pages/admin/AddProduct";
import Dashboard from "../pages/admin/Dashboard";
import Details from "../pages/Details";
import Cart from "../pages/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {index: true, element: <Home/>},
      {path: "/addproducts", element: <AddProducts/>},
      {path: "/dashboard", element: <Dashboard/>},
      {path: "/details/:id", element:<Details/>},
      {path: "/cart", element: <Cart/>}
    ]
  },
]);
