import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./Profile/Profile.tsx";
import Portofolio from "./Template/Portofolio.tsx";
import LoginPage from "./Auth/LoginPage.tsx";
import RegisterPage from "./Auth/RegisterPage.tsx";
import ProtectedPage from "./Middleware/ProtectedPage.tsx";
// eslint-disable-next-line react-refresh/only-export-components
const Router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/registrasi",
        element: <RegisterPage />
    },
    {
        path: "/homepage",
        element: (
            <ProtectedPage>
                <App />
            </ProtectedPage>
        )
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/iframe/portofolio",
        element: <Portofolio />
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>
);
