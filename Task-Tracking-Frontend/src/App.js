import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import Loader from "./Components/Loader"
import ProtectedRoute from "./Helper/ProtectedRoute"

const Login = lazy(() => import('./Pages/Login'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Signup = lazy(() => import('./Pages/Signup'));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: ProtectedRoute,
      children: [
        {
          path: "/",
          Component: Dashboard,
        },
      ],
    },
    { path: "login", Component: Login },
    { path: "signup", Component: Signup },
  ]);
  return (
    <div>
           <ToastContainer />
           <Suspense fallback={<Loader />}>
       <RouterProvider router={router} />
       </Suspense>
    </div>
  );
}

export default App;
