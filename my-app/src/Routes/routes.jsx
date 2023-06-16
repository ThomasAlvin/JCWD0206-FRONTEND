import { Route } from "react-router-dom";
import LoginPage from "../Page/loginpage";
import HomePage from "../Page/Homepage";
import RegisterPage from "../Page/register";
import ProtectedPage from "./protectedpage";
const routes = [
  <Route
    path="/"
    element={
      <ProtectedPage guestOnly={false} needLogin={true}>
        <HomePage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true} needLogin={false}>
        <LoginPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true} needLogin={false}>
        <RegisterPage />
      </ProtectedPage>
    }
  />,
];
export default routes;
