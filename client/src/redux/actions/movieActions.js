const setMovie = (data) => {
  return {
    type: "SET_MOVIE",
    payload: data,
  };
};

export default {
  setMovie,
};
