const currentUser = (state = { user: "", userType: "" }, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.cname,
        userType: action.payload.email,
        loggedIn: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        user: "",
        userType: "",
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default currentUser;
