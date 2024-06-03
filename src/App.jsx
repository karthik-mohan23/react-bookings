import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Error,
  ForgotPassword,
  Home,
  Landing,
  Offers,
  Profile,
  SignIn,
  SignUp,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "offers",
        element: <Offers />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
