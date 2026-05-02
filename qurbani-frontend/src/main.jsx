// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
// import AuthProvider from "./Auth/AuthProvider";
import "./index.css";
import router from "./routes/Routes";

// const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProvider> */}
      {/* <QueryClientProvider client={queryClient}> */}
        {/* <HelmetProvider> */}
          <div className="max-w-[425px] md:max-w-[768px] lg:max-w-[1024px] mx-auto">
            <RouterProvider router={router} />
          </div>
        {/* </HelmetProvider> */}
      {/* </QueryClientProvider> */}
    {/* </AuthProvider> */}
  </StrictMode>
);