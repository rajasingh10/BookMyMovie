import React, { useState, useEffect } from "react";
import "../styles/AdminTheatre.css";
import axios from "axios";
import TimePicker from "react-time-picker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminTheatre = () => {
  const [state, setState] = useState({});
  const [theatreList, setTheatreList] = useState([]);
  const [editType, setEditType] = useState(false);
  const [value, onChange] = useState("10:00");
  const [showList, setShowList] = useState([]);
  const [showCheck, setShowCheck] = useState([]);

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
            // alert(response.data.message);
            notify("success", response.data.message);
            getTheatreList();
          } else {
            notify("error", response.data.message);
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
  const getShowList = () => {
    axios.get("http://localhost:3002/api/getShow").then((response) => {
      console.log(response.data);
      setShowList(response.data);
    });
  };

  const deleteTheatre = (tid) => {
    axios
      .delete(`http://localhost:3002/api/TheatreDelete/${tid}`)
      .then((response) => {
        // console.log(response);
        if (response.data.message === "theatre deleted") {
          // alert(response.data.message);
          notify("error", response.data.message);
          getTheatreList();
        } else {
          notify("error", response.data.message);
        }
      });
  };

  useEffect(() => {
    getTheatreList();
    getShowList();
  }, []);

  const updateTheatre = () => {
    if (state.theatreName && state.location && state.nos) {
      axios
        .put(`http://localhost:3002/api/updateTheatre/${state.tid}`, {
          theatreName: state.theatreName,
          location: state.location,
          nos: state.nos,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "theatre updated") {
            // alert(response.data.message);
            notify("success", response.data.message);
            getTheatreList();
            setEditType(false);
            setState({
              ...state,
              tid: "",
              theatreName: "",
              location: "",
              nos: "",
            });
          } else {
            console.log("error");
          }
        });
    }
  };

  const setEditValues = (theatre) => {
    setState({
      ...state,
      tid: theatre.t_id,
      theatreName: theatre.t_name,
      location: theatre.location,
      nos: theatre.no_of_seat,
    });
  };

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const addShow = () => {
    if (value) {
      axios
        .post("http://localhost:3002/api/addShow", {
          showTym: value,
        })
        .then((response) => {
          // alert(response.data.message);
          if (response.data.message === "show added") {
            // alert(response.data.message);
            notify("success", response.data.message);
          } else {
            console.log("error");
          }
        });
    }
  };

  const handleCheckBox = (sid, chk) => {
    if (!showCheck.includes(sid)) {
      setShowCheck([...showCheck, sid]);
    }
    if (!chk) {
      var array = [...showCheck];
      const index = array.indexOf(sid);
      if (index > -1) {
        array.splice(index, 1);
        setShowCheck(array);
      }
    }
  };

  const addShowToTheatre = (e) => {
    e.preventDefault();
    console.log(showCheck.length);
    if (state.selectedTheatre && showCheck?.length) {
      showCheck?.map((sid, index) =>
        axios
          .post("http://localhost:3002/api/addShowToTheatre", {
            selectedTheatre: state.selectedTheatre,
            showCheck: sid,
          })
          .then((response) => {
            // alert(response.data.message);
            if (
              response.data.message === "added ShowToTheatre" &&
              index == showCheck.length - 1
            ) {
              // alert(response.data.message);
              notify("success", response.data.message);
            } else {
              notify("error", response.data.message);
            }
          })
      );
    }
  };

  // useEffect(() => {
  //   setShowCheck([]);
  // }, [showCheck]);

  return (
    <div className="adminTheatre">
      <form
        class="w-50"
        style={{
          boxShadow: "0px 10px 10px -5px rgba(0,0,0,0.5)",
          padding: "10px",
          backgroundColor: "white",
          marginTop: "1rem",
        }}
      >
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
              value={state.theatreName || ""}
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
              value={state.location || ""}
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
              value={state.nos || ""}
              onChange={(e) => {
                setState({ ...state, nos: e.target.value });
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
                onClick={updateTheatre}
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                class="btn btn-primary"
                onClick={addTheatre}
              >
                ADD Theatre
              </button>
            )}
          </div>
        </div>
      </form>

      <div
        className="theatreList"
        style={{
          boxShadow: "0px 10px 10px -5px rgba(0,0,0,0.5)",
          padding: "10px",
          backgroundColor: "white",
          marginTop: "1rem",
        }}
      >
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
              <tr key={theatre.t_id}>
                <td>{theatre.t_name}</td>
                <td>{theatre.location}</td>
                <td>{theatre.no_of_seat}</td>
                <td>
                  <div class="form-group row ">
                    <div class="col-sm-10">
                      <button
                        type="submit"
                        class="btn btn-warning"
                        onClick={() => {
                          setEditType(true);
                          setEditValues(theatre);
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
      <form
        class="w-50 m-5"
        style={{
          boxShadow: "0px 10px 10px -5px rgba(0,0,0,0.5)",
          padding: "10px",
          backgroundColor: "white",
        }}
      >
        <TimePicker onChange={onChange} value={value} />

        <div class="form-group row ">
          <div class="col-sm-10 my-3">
            <button
              // type="submit"
              class="btn btn-primary"
              onClick={addShow}
            >
              ADD SHOW
            </button>
          </div>
        </div>
      </form>
      <form
        class="w-50 m-5"
        style={{
          boxShadow: "0px 10px 10px -5px rgba(0,0,0,0.5)",
          padding: "10px",
          backgroundColor: "white",
        }}
      >
        <div class="form-group my-4">
          <select
            class="form-control"
            required
            onChange={(e) => {
              setState({ ...state, selectedTheatre: e.target.value });
            }}
          >
            <option selected value="">
              Select Theatre
            </option>
            {theatreList.map((theatre) => (
              <option key={theatre.t_id} value={theatre.t_id}>
                {theatre.t_name}
              </option>
            ))}
          </select>
        </div>

        <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Show</legend>
            <div class="col-sm-10">
              {showList.map((show) => (
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={show.s_id}
                    onChange={(e) =>
                      handleCheckBox(e.target.value, e.target.checked)
                    }
                    id="defaultCheck1"
                  />

                  <label class="form-check-label" for="defaultCheck1">
                    {show.s_time}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <div class="form-group row ">
          <div class="col-sm-10 my-3">
            <button
              // type="submit"
              class="btn btn-primary"
              onClick={addShowToTheatre}
            >
              ADD SHOW TO THEATRE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminTheatre;
