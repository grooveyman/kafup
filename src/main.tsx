import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { LoginModalProvider } from "./context/LoginModalContext.tsx";
import LoginModal from "./components/LoginModal.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginModalProvider>
        <CartProvider>
          <App />
          <LoginModal />
        </CartProvider>
      </LoginModalProvider>
    </QueryClientProvider>
  </StrictMode>
);
