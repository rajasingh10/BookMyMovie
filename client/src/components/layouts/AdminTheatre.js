import React, { useState, useEffect } from "react";
import "../styles/AdminTheatre.css";
import axios from "axios";

const AdminTheatre = () => {
  const [state, setState] = useState({});
  const [theatreList, setTheatreList] = useState([]);

  const addTheatre = async (e) => {
    if (state.theatreName && state.location && state.nos) {
      axios
        .post("http://localhost:3002/api/addtheatre", {
          theatreName: state.theatreName,
          location: state.location,
          nos: state.nos,
        })
        .then((response) => {
          // alert(response.data.message);
          if (response.data.message === "theatre added") {
            alert(response.data.message);
            getTheatreList();
          } else {
            console.log("error");
          }
        });
    }
  };

  const getTheatreList = () => {
    axios.get("http://localhost:3002/api/getTheatre").then((response) => {
      //   console.log(response.data);
      setTheatreList(response.data);
    });
  };

  const deleteTheatre = (tid) => {
    axios
      .delete(`http://localhost:3002/api/TheatreDelete/${tid}`)
      .then((response) => {
        console.log(response);
        if (response.data.message === "theatre deleted") {
          alert(response.data.message);
          getTheatreList();
        } else {
          console.log("error");
        }
      });
  };

  useEffect(() => {
    getTheatreList();
  }, []);

  return (
    <div className="adminTheatre">
      <form class="w-50">
        <div class="form-group row my-3">
          <label for="theatreName" class="col-sm-2 col-form-label">
            Theatre Name
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="theatreName"
              required
              onChange={(e) => {
                setState({ ...state, theatreName: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="location" class="col-sm-2 col-form-label">
            Location
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="location"
              required
              onChange={(e) => {
                setState({ ...state, location: e.target.value });
              }}
            />
          </div>
        </div>
        <div class="form-group row my-3">
          <label for="NOS" class="col-sm-2 col-form-label">
            Number Of Seats
          </label>
          <div class="col-sm-10">
            <input
              type="number"
              min="20"
              max="100"
              step="1"
              class="form-control"
              id="NOS"
              required
              onChange={(e) => {
                setState({ ...state, nos: e.target.value });
              }}
            />
          </div>
        </div>

        <div class="form-group row ">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary" onClick={addTheatre}>
              ADD THEATRE
            </button>
          </div>
        </div>
      </form>

      <div className="theatreList">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Theatre Name</th>
              <th scope="col">Location</th>
              <th scope="col">Number Of Seats</th>
            </tr>
          </thead>
          <tbody>
            {theatreList.map((theatre) => (
              <tr>
                <td>{theatre.t_name}</td>
                <td>{theatre.location}</td>
                <td>{theatre.no_of_seat}</td>
                <td>
                  <div class="form-group row ">
                    <div class="col-sm-10">
                      <button type="submit" class="btn btn-warning">
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
                          deleteTheatre(theatre.t_id);
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
    </div>
  );
};

export default AdminTheatre;
