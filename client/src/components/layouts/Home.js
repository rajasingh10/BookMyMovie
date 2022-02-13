import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import AdminCard from "./AdminCard";
import HomeCarousel from "./Slider";
import { Link } from "react-router-dom";
import Movie from "./Movie";
import allActions from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";



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
