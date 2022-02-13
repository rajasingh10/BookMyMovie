import React, { useState, useEffect } from "react";
import "../styles/BuyTickets.css";
// import allActions from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyTickets = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [theatreDetails, setTheatreDetails] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTheatre, setSelectedTheatre] = useState();
  const [selectedShow, setSelectedshow] = useState();
  const [selectedTheatreDetails, setSelectedTheatreDetails] = useState();
  const [selectedShowDetails, setSelectedShowDetails] = useState();
  const [nos, setNos] = useState();
  const [price, setPrice] = useState();

  const notify = (type, msg) => {
    if (type == "error") {
      toast.error(msg, {
        position: "top-center",
      });
    }
    if (type == "success") {
      toast.success(msg, {
        position: "top-center",
      });
    }
  };

  const currentUser = useSelector((state) => state.currentUser);

  const selectedMovie = useSelector((state) => state.selectedMovie);

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const getMovieDetails = () => {
    axios
      .get(`http://localhost:3002/api/getMovieDetails/${selectedMovie.mid}`)
      .then((response) => {
        console.log(response.data[0]);
        setMovieDetails(response.data[0]);
      });
  };
  const getTheatreDetails = () => {
    axios
      .get(`http://localhost:3002/api/getTheatreDetails/${selectedMovie.mid}`)
      .then((response) => {
        console.log(response.data);
        response.data.map((tid, index) =>
          axios
            .get(`http://localhost:3002/api/getTheatre/${tid.t_id}`)
            .then((response) => {
              console.log(response.data[0]);
              setTheatreDetails((oldArray) => [...oldArray, response.data[0]]);
            })
        );
      });
  };

  const getShowDetails = () => {
    if (selectedTheatre) {
      axios
        .get(`http://localhost:3002/api/getShowDetails/${selectedTheatre}`)
        .then((response) => {
          console.log(response.data);
          response.data.map((sid, index) =>
            axios
              .get(`http://localhost:3002/api/getShow/${sid.s_id}`)
              .then((response) => {
                console.log(response.data[0]);
                setShowDetails((oldArray) => [...oldArray, response.data[0]]);
              })
          );
        });
    }
  };

  const getSelectedTheatreDetails = () => {
    if (selectedTheatre) {
      var obj = theatreDetails.find(
        (theatre) => theatre.t_id == selectedTheatre
      );
    }
    setSelectedTheatreDetails(obj);
  };
  const getSelectedShowDetails = () => {
    if (selectedShow) {
      var obj = showDetails.find((show) => show.s_id == selectedShow);
    }
    setSelectedShowDetails(obj);
  };

  const calculatePrice = () => {
    if (nos) {
      setPrice(parseInt(nos) * 150);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [nos]);

  useEffect(() => {
    getSelectedShowDetails();
  }, [selectedShow]);

  useEffect(() => {
    setSelectedshow();
    setShowDetails([]);
    getShowDetails();
    getSelectedTheatreDetails();
  }, [selectedTheatre]);

  useEffect(() => {
    getMovieDetails();
    getTheatreDetails();
  }, []);

  const bookMyMovie = async (e) => {
    e.preventDefault();
    if (
      currentUser?.cid &&
      selectedMovie &&
      selectedShow &&
      selectedTheatre &&
      nos
    ) {
      axios
        .post("http://localhost:3002/api/bookMovie", {
          cid: currentUser.cid,
          mid: selectedMovie.mid,
          date: startDate.toISOString().slice(0, 10),
          m_name: movieDetails.m_name,
          t_name: selectedTheatreDetails.t_name,
          s_time: selectedShowDetails.s_time,
          nos: nos,
          t_price: price,
          image_url: movieDetails.image_url,
        })
        .then((response) => {
          // alert(response.data.message);
          if (response.data.message === "movie booked") {
            // alert(response.data.message);
            notify("success", response.data.message);
          } else {
            notify("error", response.data.message);
          }
        });
    }
  };

  return (
    <div className="buytickets">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        closeOnScroll={true}
        minDate={new Date()}
        maxDate={addDays(new Date(), 5)}
      />
      <div className="poster">
        <img
          src={movieDetails.image_url}
          alt={movieDetails.m_name}
          className="movie_poster"
        />
        <h3 className="movie_heading">{movieDetails.m_name}</h3>
      </div>

      <form>
        <h4>{selectedTheatreDetails?.t_name}</h4>
        <div class="form-group my-4">
          <select
            class="form-control"
            required
            onChange={(e) => {
              setSelectedTheatre(e.target.value);
            }}
          >
            <option selected value="">
              Select Theatre
            </option>
            {theatreDetails.map((theatre) => (
              <option key={theatre.t_id} value={theatre.t_id}>
                {theatre.t_name}
              </option>
            ))}
          </select>
        </div>
        <h4>{selectedShowDetails?.s_time}</h4>
        <div class="form-group my-4">
          <select
            class="form-control"
            required
            onChange={(e) => {
              setSelectedshow(e.target.value);
            }}
          >
            {console.log("show", showDetails[0])}
            <option selected value="">
              Select Show Time
            </option>
            {showDetails.map((show) => (
              <option key={show.s_id} value={show.s_id}>
                {show.s_time}
              </option>
            ))}
          </select>
        </div>
        <div class="form-group row my-3">
          <div class="col-sm-10">
            {/* <h4>{nos}</h4> */}
            <input
              placeholder="Select number of seat"
              type="number"
              step="1"
              min="0"
              max={selectedTheatreDetails?.no_of_seat}
              class="form-control"
              id="rating"
              value={nos || ""}
              required
              onChange={(e) => {
                setNos(e.target.value);
              }}
            />
          </div>
        </div>
      </form>
      <h3>
        Total Price: <span>{price}</span>
      </h3>
      <button type="submit" class="btn btn-primary my-5" onClick={bookMyMovie}>
        Book Movie
      </button>
    </div>
  );
};

export default BuyTickets;
