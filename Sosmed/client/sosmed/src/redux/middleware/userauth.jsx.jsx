const init = {
  id: "",
  email: "",
  fullname: "",
  username: "",
  gender: "",
  avatar_url: "",
  role: "",
  bio: "",
};

function userReducer(state = init, action) {
  //action adalah event yang terjadi
  if (action.type === "login") {
    return {
      ...state,
      id: action.payload.id,
      email: action.payload.email,
      fullname: action.payload.fullname,
      username: action.payload.username,
      gender: action.payload.gender,
      avatar_url: action.payload.avatar_url,
      role: action.payload.role,
      bio: action.payload.bio,
    };
  } else if (action.type === "logout") {
    return init;
  }

  return state;
}

export default userReducer;
