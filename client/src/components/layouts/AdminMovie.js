import React, { useState, useEffect } from "react";
import "../styles/AdminMovie.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const AdminMovie = () => {
  const [state, setState] = useState({});
  const [movieList, setMovieList] = useState([]);
  const [editType, setEditType] = useState(false);
  const [theatreList, setTheatreList] = useState([]);

  const addMovie = async (e) => {
    if (state.movieName && state.overview && state.rating && state.imageUrl) {
      axios
        .post("http://localhost:3002/api/addmovie", {
          movieName: state.movieName,
          overview: state.overview,
          rating: state.rating,
          imageUrl: state.imageUrl,
        })
        .then((response) => {
          // alert(response.data.message);
          if (response.data.message === "movie added") {
            alert(response.data.message);
            getMovieList();
          } else {
            console.log("error");
          }
        });
    }
  };

  const deleteMovie = (mid) => {
    axios
      .delete(`http://localhost:3002/api/MovieDelete/${mid}`)
      .then((response) => {
        if (response.data.message === "movie deleted") {
          alert(response.data.message);
          getMovieList();
        } else {
          console.log("error");
        }
      });
  };

  const getMovieList = () => {
    axios.get("http://localhost:3002/api/getMovie").then((response) => {
      // console.log(response.data);
      setMovieList(response.data);
    });
  };

  useEffect(() => {
    getMovieList();
    getTheatreList();
  }, []);

  const updateMovie = () => {
    console.log("update", state.movieName);
    if (state.movieName && state.overview && state.rating && state.imageUrl) {
      axios
        .put(`http://localhost:3002/api/updateMovie/${state.mid}`, {
          movieName: state.movieName,
          overview: state.overview,
          rating: state.rating,
          imageUrl: state.imageUrl,
        })
        .then((response) => {
          // alert(response.data.message);
          console.log(response);
          if (response.data.message === "movie updated") {
            alert(response.data.message);
            getMovieList();
            setEditType(false);
            setState({
              ...state,
              mid: "",
              movieName: "",
              overview: "",
              rating: "",
              imageUrl: "",
            });
          } else {
            console.log("error");
          }
        });
    }
  };

  const setEditValues = (movie) => {
    setState({
      ...state,
      mid: movie.m_id,
      movieName: movie.m_name,
      overview: movie.m_desc,
      rating: movie.m_rating,
      imageUrl: movie.image_url,
    });
  };

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const getTheatreList = () => {
    axios.get("http://localhost:3002/api/getTheatre").then((response) => {
      //   console.log(response.data);
      setTheatreList(response.data);
    });
  };

  return (
    <div className="adminMovie">
      <form class="w-50">
        <div class="form-group row my-3">
          <label for="movieName" class="col-sm-2 col-form-label">
            Movie name
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="movieName"
              value={state.movieName || ""}
              required
              onChange={(e) => {
                setState({ ...state, movieName: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="overview" class="col-sm-2 col-form-label">
            Overview
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="overview"
              value={state.overview || ""}
              required
              onChange={(e) => {
                setState({ ...state, overview: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="rating" class="col-sm-2 col-form-label">
            Rating
          </label>
          <div class="col-sm-10">
            <input
              type="number"
              min="0"
              max="10"
              step="1"
              class="form-control"
              id="rating"
              value={state.rating || ""}
              required
              onChange={(e) => {
                setState({ ...state, rating: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="imageUrl" class="col-sm-2 col-form-label">
            Image Url
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="imageUrl"
              value={state.imageUrl || ""}
              required
              onChange={(e) => {
                setState({ ...state, imageUrl: e.target.value });
              }}
            />
          </div>
        </div>

        <div class="form-group row ">
          <div class="col-sm-10">
            {editType ? (
              <button
                type="submit"
                class="btn btn-primary"
                onClick={updateMovie}
              >
                Update
              </button>
            ) : (
              <button type="submit" class="btn btn-primary" onClick={addMovie}>
                ADD MOVIE
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="movieList">
        <h3>Movie List</h3>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Movie Image</th>
              <th scope="col">Movie name</th>
              <th scope="col">Overview</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {movieList.map((movie) => (
              <tr>
                <td>
                  {" "}
                  <img
                    src={movie.image_url}
                    alt=""
                    width="100px"
                    height="150px"
                  />
                </td>
                <td>{movie.m_name}</td>
                <td>{movie.m_desc}</td>
                <td>{movie.m_rating}</td>
                <td>
                  <div class="form-group row ">
                    <div class="col-sm-10">
                      <button
                        type="submit"
                        class="btn btn-warning"
                        onClick={() => {
                          setEditType(true);
                          setEditValues(movie);
                          topFunction();
                        }}
                      >
                        EDIT
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form-group row ">
                    <div class="col-sm-10">
                      <button
                        type="submit"
                        class="btn btn-danger"
                        onClick={() => {
                          deleteMovie(movie.m_id);
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form class="w-50 m-5">
        <div class="form-group my-4">
          <select
            class="form-control"
            required
            onChange={(e) => {
              setState({ ...state, selectedMovie: e.target.value });
            }}
          >
            {movieList.map((movie) => (
              <option key={movie.m_id} value={movie.m_name}>
                {movie.m_name}
              </option>
            ))}
          </select>
        </div>

        <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Theatres</legend>
            <div class="col-sm-10">
              {theatreList.map((theatre) => (
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />

                  <label class="form-check-label" for="defaultCheck1">
                    {theatre.t_name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>
        <div class="form-group row ">
          <div class="col-sm-10 my-3">
            <button type="submit" class="btn btn-primary">
              ADD THEATRE TO MOVIE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminMovie;
