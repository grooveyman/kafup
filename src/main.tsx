import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { LoginModalProvider } from "./context/LoginModalContext.tsx";
import { CartProvider } from "./context/CartContext";
import { BuyNowProvider } from "./context/BuyNowContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import "sweetalert2/dist/sweetalert2.min.css";


const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginModalProvider>
        <CartProvider>
          <BuyNowProvider>
            <App />
          </BuyNowProvider>
        </CartProvider>
      </LoginModalProvider>
    </QueryClientProvider>
  </StrictMode>
);
