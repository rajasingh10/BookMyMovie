const currentUser = (state = { cid: "", user: "", userType: "" }, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        cid: action.payload.c_id,
        user: action.payload.cname,
        userType: action.payload.email,
        loggedIn: true,
      };
    case "LOG_OUT":
      return {
        ...state,
        cid: "",
        user: "",
        userType: "",
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default currentUser;
