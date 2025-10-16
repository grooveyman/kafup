import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AddProducts from "../pages/admin/products/AddProduct";
import Dashboard from "../pages/admin/Dashboard";
import Details from "../pages/Details";
import Cart from "../pages/Cart";
import ProductList from "../pages/admin/products/ProductList";
import AdminLayout from "../layouts/AdminLayout";
import EditProduct from "../pages/admin/products/EditProduct";
import Categories from "../pages/Categories";
import Checkout from "../pages/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {index: true, element: <Home/>},
      // {path: "/addproducts", element: <AddProducts/>},
      {path: "/dashboard", element: <Dashboard/>},
      {path: "/details/:id", element:<Details/>},
      {path: "/cart", element: <Cart/>},
      {path: "/categories/:catalias", element: <Categories/>},
      {path: "/checkout", element: <Checkout/>},
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {path: "dashboard", element: <Dashboard/>},
          {path: "products", element: <ProductList />},
          {path: "addproducts", element: <AddProducts />},
          {path: "editproducts/:prodid", element: <EditProduct />}
        ],
      }
    ]
  },
], {basename:"/kafup/"});
