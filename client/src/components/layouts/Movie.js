import React from "react";
import "../styles/Movie.css";
import { Link } from "react-router-dom";
import allActions from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const countvote = (rating) => {
  var rating = parseInt(rating);
  if (rating >= 8) {
    return "green";
  } else if (rating >= 6) {
    return "orange";
  } else {
    return "red";
  }
};

const Movie = ({ mid, title, overview, poster_path, vote_average }) => {
  const dispatch = useDispatch();

  const handleBooking = () => {
    dispatch(allActions.movieActions.setMovie(mid));
  };

  return (
    <div className="movie">
      <img src={poster_path} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`vote ${countvote(vote_average)}`}>
          {vote_average}
        </span>
      </div>
      <div className="movie-overview">
        <Link to="/theatre">
          <button className="book_btn" onClick={handleBooking}>
            Book
          </button>
        </Link>
        <h2>Overview:</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default Movie;
