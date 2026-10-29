import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/admin/Dashboard";
import Details from "../pages/Details";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import Checkout from "../pages/Checkout";
import Success from "../pages/Success";
import Explore from "../pages/Explore";
import Collections from "../pages/Collections";
import Profile from "../pages/Profile";
import Collection from "../pages/DesignerProfile.tsx";
import Brands from "../pages/Brands";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {index: true, element: <Home/>},
      // {path: "/addproducts", element: <AddProducts/>},
      {path: "/dashboard", element: <Dashboard/>},
      {path: "/details/:id", element: <Details/>},
      {path: "/cart", element: <Cart/>},
      {path: "/shop", element: <Shop/>},
      {path: "/checkout", element: <Checkout/>},
      {path: "/success/:ref", element: <Success/>},
      {path: "/explore", element: <Explore/>},
      {path: "/brands", element: <Brands/>},
      {path: "/collections", element: <Collections/>},
      {path: "/brands/:username", element: <Profile />},
      {path: "/profile/:username", element: <Collection/>},
    ]
  },
], {basename:"/kafup/"});
