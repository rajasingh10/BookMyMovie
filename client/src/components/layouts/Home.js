import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import AdminCard from "./AdminCard";
import HomeCarousel from "./Slider";
import { Link } from "react-router-dom";
import Movie from "./Movie";
import allActions from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const moviesdetail = [
  {
    mid: 1,
    title: "Spider-Man: No Way Home",
    overview:
      "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    poster_path:
      "https://image.tmdb.org/t/p/w1280/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    vote_average: 8.4,
  },
  {
    mid: 2,
    title: "The Matrix Resurrections",
    overview:
      "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
    poster_path:
      "https://image.tmdb.org/t/p/w1280/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
    vote_average: 8.4,
  },
  {
    mid: 3,
    title: "Spider-Man: No Way Home",
    overview:
      "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    poster_path:
      "https://image.tmdb.org/t/p/w1280/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    vote_average: 8.4,
  },
  {
    mid: 4,
    title: "The Matrix Resurrections",
    overview:
      "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
    poster_path:
      "https://image.tmdb.org/t/p/w1280/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
    vote_average: 8.4,
  },
  {
    mid: 5,
    title: "Spider-Man: No Way Home",
    overview:
      "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    poster_path:
      "https://image.tmdb.org/t/p/w1280/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    vote_average: 8.4,
  },
  {
    mid: 6,
    title: "The Matrix Resurrections",
    overview:
      "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
    poster_path:
      "https://image.tmdb.org/t/p/w1280/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
    vote_average: 8.4,
  },
  {
    mid: 7,
    title: "Spider-Man: No Way Home",
    overview:
      "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    poster_path:
      "https://image.tmdb.org/t/p/w1280/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    vote_average: 8.4,
  },
];

const Home = () => {
  const [userType, setUserType] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const getMovieList = () => {
    axios.get("http://localhost:3002/api/getMovie").then((response) => {
      console.log(response.data);
      setMovieList(response.data);
    });
  };

  useEffect(() => {
    getMovieList();
  }, []);

  useEffect(() => {
    if (currentUser.userType == "rajasingh8889@gmail.com") {
      setUserType(false);
    } else {
      setUserType(true);
    }
  }, []);

  return (
    <div className="home">
      <div className="header">
        <div className="header_left">
          <img
            src="https://see.fontimg.com/api/renderfont4/x3ZaK/eyJyIjoiZnMiLCJoIjoyMSwidyI6MTI1MCwiZnMiOjE3LCJmZ2MiOiIjQkQxMjEyIiwiYmdjIjoiIzg3ODdDQSIsInQiOjF9/Qm9vayBNeSBNb3ZpZXM/beef-3-personal-use-bold.png"
            alt=""
          />
        </div>

        {userType && currentUser.loggedIn && (
          <h4 className="header_center">Hello, {currentUser.user}</h4>
        )}

        <div className="header_right">
          {userType && (
            <Link to="/myBooking" className="myBooking">
              <p>My Booking</p>
            </Link>
          )}
          <Link to="/login">
            <button
              className="logout_btn"
              onClick={() => dispatch(allActions.userActions.logOut())}
            >
              {currentUser.loggedIn ? "Logout" : "Login"}
            </button>
          </Link>
        </div>
      </div>
      {userType ? (
        <>
          <HomeCarousel />
          <div className="moviecontainer">
            {movieList.map((movie) => (
              <Movie
                key={movie.m_id}
                mid={movie.m_id}
                title={movie.m_name}
                overview={movie.m_desc}
                poster_path={movie.image_url}
                vote_average={movie.m_rating}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="adminHome">
          <AdminCard name="MOVIE" route="/adminMovie" />
          <AdminCard name="THEATRE" route="/adminTheatre" />
          <AdminCard name="USERS" route="/adminuUsers" />
        </div>
      )}
    </div>
  );
};

export default Home;
