import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "#0A0A0A",
            border: "1px solid #27272A",
            color: "#fff",
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
