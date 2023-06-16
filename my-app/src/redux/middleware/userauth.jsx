import { auth_types } from "../types";
import axios from "axios";
function userLogin(account) {
  return async function (dispatch) {
    console.log(dispatch);
    try {
      const userData = await axios
        .get("http://localhost:2000/user", {
          params: {
            email: account.email.toLowerCase(),
            password: account.password,
          },
        })
        .then((res) => {
          console.log(res.data);
          return res.data[0];
        });

      dispatch({
        type: auth_types.login,
        payload: userData,
      });
      localStorage.setItem("user", JSON.stringify(userData));

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
}
export { userLogin };
