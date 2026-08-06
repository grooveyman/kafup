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
import Categories from "../pages/Shop";
import Checkout from "../pages/Checkout";
import Success from "../pages/Success";
import Explore from "../pages/Explore";
import Collections from "../pages/Collections";
import Profile from "../pages/Profile";
import Collection from "../pages/DesignerProfile.tsx";
import Brands from "../pages/Brands";
import { BuyNowProvider } from "../context/BuyNowContext.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {index: true, element: <Home/>},
      // {path: "/addproducts", element: <AddProducts/>},
      {path: "/dashboard", element: <Dashboard/>},
      {path: "/details/:id", element:<BuyNowProvider><Details/></BuyNowProvider>},
      {path: "/cart", element: <Cart/>},
      {path: "/categories/:catalias", element: <Categories/>},
      {path: "/checkout", element: <BuyNowProvider><Checkout/></BuyNowProvider>},
      {path: "/success/:ref", element: <Success/>},
      {path: "/explore", element: <Explore/>},
      {path: "/brands", element: <Brands/>},
      {path: "/collections", element: <Collections/>},
      {path: "/brands/:username", element: <Profile />},
      {path: "/collections/:username/:collection_id", element: <Collection/>},
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
