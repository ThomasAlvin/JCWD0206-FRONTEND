import { Route } from "react-router-dom";
import LoginPage from "../pages/loginpage";
import RegisterPage from "../pages/registerpage";
import HomePage from "../pages/homepage";
import ProfilePage from "../pages/profilepage";
import ProtectedPage from "./protectedpage";
import EditProfile from "../pages/editprofile";
import ForgotPassword, { RequestForgotPassword } from "../pages/forgotpassword";
import VerifyEmail from "../pages/verifypage";

const routes = [
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/Register"
    element={
      <ProtectedPage guestOnly={true}>
        <RegisterPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/HomePage"
    element={
      <ProtectedPage needLogin={true}>
        <HomePage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/profilepage"
    element={
      <ProtectedPage needLogin={true}>
        <ProfilePage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/editprofile"
    element={
      <ProtectedPage needLogin={true}>
        <EditProfile />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/forgot-password/request"
    element={
      <ProtectedPage guestOnly={true}>
        <RequestForgotPassword />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/forgot-password/:token"
    element={
      <ProtectedPage guestOnly={true}>
        <ForgotPassword />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/verify/:token"
    element={
      <ProtectedPage needLogin={true}>
        <VerifyEmail />
      </ProtectedPage>
    }
  ></Route>,
];
export default routes;
