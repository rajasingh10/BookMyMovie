const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const { db } = require("./connections/dbConnection");

const app = express();
app.use(express.json());
app.use(cors());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "bookmymovie",
// });

app.post("/check-log", (req, res) => {
  // console.log("log");
  let query = `select * from customer where email = "${req.body.email}" and password = "${req.body.password}"`;

  db.query({ sql: query }, (error, results) => {
    // console.log(results.length);
    if (error) {
      res.send({ error, message: "Failed" });
    } else if (results?.length > 0) {
      res.send({ message: "LogedIn", data: results });
    } else {
      res.send({ message: "Wrong password" });
    }
  });
});

app.post("/check-reg", (req, res) => {
  // console.log("check");
  let query = `select email from customer where email = "${req.body.email}"`;

  db.query({ sql: query }, (error, results) => {
    if (error) {
      res.send({ error, message: "Failed" });
    } else if (results?.length > 0) {
      res.send({
        message: "Already",
        results,
      });
    } else {
      res.send({ message: "New Registration" });
    }
  });
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO customer (cname,email,password) VALUES (?,?,?)",
    [username, email, password],
    (err, result) => {
      if (!err) {
        res.send({ message: "register successful" });
      }
    }
  );
});

app.post("/api/addmovie", (req, res) => {
  const movieName = req.body.movieName;
  const overview = req.body.overview;
  const rating = req.body.rating;
  const imageUrl = req.body.imageUrl;
  // console.log(movieName);

  db.query(
    "INSERT INTO movie (m_name,m_desc,m_rating,image_url) VALUES (?,?,?,?)",
    [movieName, overview, rating, imageUrl],
    (err, result) => {
      // console.log(err);
      if (!err) {
        res.send({ message: "movie added" });
      }
    }
  );
});

app.get("/api/getMovie", (req, res) => {
  const sql = "SELECT * FROM movie";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/MovieDelete/:mid", (req, res) => {
  const mid = req.params.mid;
  // console.log(mid);
  const sql = "DELETE FROM movie where m_id = ?";
  db.query(sql, mid, (err, result) => {
    if (!err) {
      res.send({ message: "movie deleted" });
    }
  });
});

app.post("/api/addtheatre", (req, res) => {
  const theatreName = req.body.theatreName;
  const location = req.body.location;
  const nos = req.body.nos;

  db.query(
    "INSERT INTO theatre (t_name,location,no_of_seat) VALUES (?,?,?)",
    [theatreName, location, nos],
    (err, result) => {
      // console.log(err);
      if (!err) {
        res.send({ message: "theatre added" });
      }
    }
  );
});

app.get("/api/getTheatre", (req, res) => {
  const sql = "SELECT * FROM theatre";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/TheatreDelete/:tid", (req, res) => {
  const tid = req.params.tid;
  // console.log(tid);
  const sql = "DELETE FROM theatre where t_id = ?";
  db.query(sql, tid, (err, result) => {
    // console.log(err);
    if (!err) {
      res.send({ message: "theatre deleted" });
    }
  });
});

app.put("/api/updateMovie/:mid", (req, res) => {
  const movieName = req.body.movieName;
  const overview = req.body.overview;
  const rating = req.body.rating;
  const imageUrl = req.body.imageUrl;
  const mid = req.params.mid;
  // console.log(mid);
  const sql =
    "UPDATE movie SET m_name = ?,m_desc = ?,m_rating = ?,image_url =? WHERE m_id = ? ";
  db.query(sql, [movieName, overview, rating, imageUrl, mid], (err, result) => {
    // console.log(result);
    if (!err) {
      res.send({ message: "movie updated" });
    }
  });
});

app.post("/api/addTheatreToMovie", (req, res) => {
  const mid = req.body.selectedMovie;
  const tid = req.body.theatreCheck;

  const sql = "INSERT INTO mhast (m_id,t_id) VALUES (?,?)";
  db.query(sql, [mid, tid], (err, result) => {
    // console.log(result);
    if (!err) {
      res.send({ message: "added TheatreToMovie" });
    }
  });
});

app.put("/api/updateTheatre/:tid", (req, res) => {
  const theatreName = req.body.theatreName;
  const location = req.body.location;
  const nos = req.body.nos;
  const tid = req.params.tid;

  // console.log(tid);
  const sql =
    "UPDATE theatre SET t_name = ?,location = ?,no_of_seat = ? WHERE t_id = ?";
  db.query(sql, [theatreName, location, nos, tid], (err, result) => {
    // console.log(err);
    if (!err) {
      res.send({ message: "theatre updated" });
    }
  });
});

app.post("/api/addShow", (req, res) => {
  const showTym = req.body.showTym;

  // console.log(showTym);
  db.query("INSERT INTO shows (s_time) VALUES (?)", showTym, (err, result) => {
    // console.log(err);
    if (!err) {
      res.send({ message: "show added" });
    }
  });
});

app.get("/api/getShow", (req, res) => {
  const sql = "SELECT * FROM shows";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.post("/api/addShowToTheatre", (req, res) => {
  const tid = req.body.selectedTheatre;
  const sid = req.body.showCheck;

  const sql = "INSERT INTO thass (ts_id,s_id) VALUES (?,?)";
  db.query(sql, [tid, sid], (err, result) => {
    // console.log(err);
    if (!err) {
      res.send({ message: "added ShowToTheatre" });
    }
  });
});

app.get("/api/getMovieDetails/:mid", (req, res) => {
  const mid = req.params.mid;
  const sql = "SELECT * FROM movie Where m_id = ?";
  db.query(sql, mid, (err, result) => {
    res.send(result);
  });
});
app.get("/api/getTheatreDetails/:mid", (req, res) => {
  const mid = req.params.mid;
  const sql = "SELECT t_id FROM mhast Where m_id = ?";
  db.query(sql, mid, (err, result) => {
    // console.log(result);
    res.send(result);
  });
});

app.get("/api/getTheatre/:tid", (req, res) => {
  const tid = req.params.tid;
  const sql = "SELECT * FROM theatre Where t_id = ?";
  db.query(sql, tid, (err, result) => {
    res.send(result);
  });
});

app.get("/api/getShowDetails/:tid", (req, res) => {
  const tid = req.params.tid;
  const sql = "SELECT s_id FROM thass Where ts_id = ?";
  db.query(sql, tid, (err, result) => {
    // console.log(result);
    res.send(result);
  });
});

app.get("/api/getShow/:sid", (req, res) => {
  const sid = req.params.sid;
  // console.log(sid);
  const sql = "SELECT * FROM shows Where s_id = ?";
  db.query(sql, sid, (err, result) => {
    // console.log("getShow", result);
    res.send(result);
  });
});

app.post("/api/bookMovie", (req, res) => {
  const cid = req.body.cid;
  const mid = req.body.mid;
  const date = req.body.date;
  const m_name = req.body.m_name;
  const t_name = req.body.t_name;
  const s_time = req.body.s_time;
  const nos = req.body.nos;
  const t_price = req.body.t_price;
  const image_url = req.body.image_url;

  const sql =
    "INSERT INTO booking (c_id,bm_id,date,m_name,t_name,s_time,nos,t_price,image_url) VALUES (?,?,?,?,?,?,?,?,?)";
  db.query(
    sql,
    [cid, mid, date, m_name, t_name, s_time, nos, t_price, image_url],
    (err, result) => {
      // console.log(err);
      if (!err) {
        res.send({ message: "movie booked" });
      }
    }
  );
});

app.get("/api/getBookingList", (req, res) => {
  const sql = "SELECT * FROM booking";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

app.listen(3002, () => {
  console.log("server is running");
});
