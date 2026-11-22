import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/portal/Dashboard.tsx";
import OrderDetails from "../pages/portal/OrderDetails.tsx";
import OrderList from "../pages/portal/products/OrderList.tsx";
import PortalProfile from "../pages/portal/Profile.tsx";
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
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";

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
      {path: "/register", element: <Register />},
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/portal", element: <Dashboard /> },
          { path: "/portal/orders", element: <OrderList /> },
          { path: "/portal/orders/:orderId", element: <OrderDetails />           },
          { path: "/portal/profile", element: <PortalProfile /> },
        ],
      },
    ],
  },
], {basename:"/kafup/"});
