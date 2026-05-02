import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import router from "./routes/Routes";
import AuthProvider from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <div className="max-w-[425px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>
);