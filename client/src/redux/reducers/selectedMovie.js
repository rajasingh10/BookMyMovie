const selectedMovie = (state = { mid: "" }, action) => {
  switch (action.type) {
    case "SET_MOVIE":
      return {
        ...state,
        mid: action.payload,
      };

    default:
      return state;
  }
};

export default selectedMovie;
