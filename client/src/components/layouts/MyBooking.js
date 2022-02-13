import React, { useEffect, useState } from "react";
import "../styles/MyBooking.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const MyBooking = () => {
  const [bookingList, setBookingList] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);

  const getBookingList = () => {
    axios.get("http://localhost:3002/api/getBookingList").then((response) => {
      // console.log(response.data);
      setBookingList(response.data);
    });
  };

  useEffect(() => {
    getBookingList();
  }, []);

  return (
    <div className="myBooking">
      <div
        className="movieList"
        style={{
          boxShadow: "0px 10px 10px -5px rgba(0,0,0,0.5)",
          padding: "10px",
          backgroundColor: "white",
        }}
      >
        {/* <h3>Movie List</h3> */}
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Movie Image</th>
              <th scope="col">Movie</th>
              <th scope="col">Theatre</th>
              <th scope="col">Show Time</th>
              <th scope="col">Number of seat</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map((book) => {
              if (currentUser.cid == book.c_id) {
                return (
                  <tr>
                    <td>
                      {" "}
                      <img
                        src={book.image_url}
                        alt=""
                        width="100px"
                        height="150px"
                      />
                    </td>
                    <td>{book.m_name}</td>
                    <td>{book.t_name}</td>
                    <td>{book.s_time}</td>
                    <td>{book.nos}</td>
                    <td>{book.date}</td>
                    <td>{book.t_price}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
