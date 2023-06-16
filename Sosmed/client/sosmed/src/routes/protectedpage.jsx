import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedPage({
  children,
  redirect = false,
  guestOnly = false,
  needLogin = false,
  needLoginAdmin = false,
  noFooter = false,
}) {
  const userSelector = useSelector((state) => state.login.auth);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 500);
  //   }, [isLoading]);
  useEffect(() => {
    // alert("hello");
    setIsLoading(true);

    setTimeout(() => {
      //   alert(isLoading);
      setIsLoading(false);
    }, 500);
    if (redirect) {
      return nav("/login");
    } else if (guestOnly && userSelector?.email) {
      return nav("/homepage");
    } else if (needLogin && !userSelector?.email) {
      console.log(userSelector.email);
      return nav("/login");
    }
  }, [children]);
  return (
    <>
      <>{isLoading ? <Loading /> : children}</>
    </>
  );
}
