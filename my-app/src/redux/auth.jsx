import { auth_types } from "./types";
const init = {
  email: "",
  password: "",
  name: "",
  birthdate: "",
  gender: "",
};
function userReducer(state = init, action) {
  if (action.type == auth_types.login) {
    return {
      state,
      email: action.payload.email,
      password: action.payload.password,
      username: action.payload.username,
      birthdate: action.payload.birthdate,
      gender: action.payload.gender,
    };
  } else if (action.type == auth_types.logout) {
    return { ...init };
  }
  return state;
}
export default userReducer;
