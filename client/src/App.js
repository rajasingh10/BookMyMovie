import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/layouts/Home";
import Login from "./components/layouts/Login";
import Register from "./components/layouts/Register";
import AdminMovie from "./components/layouts/AdminMovie";
import AdminTheatre from "./components/layouts/AdminTheatre";
import AdminUsers from "./components/layouts/AdminUsers";
import BuyTickets from "./components/layouts/BuyTickets";
import MyBooking from "./components/layouts/MyBooking";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />;
          <Route path="/login" component={Login} />;
          <Route path="/register" component={Register} />;
          <Route path="/adminMovie" component={AdminMovie} />;
          <Route path="/adminTheatre" component={AdminTheatre} />;
          <Route path="/adminuUsers" component={AdminUsers} />;
          <Route path="/buytickets" component={BuyTickets} />;
          <Route path="/myBooking" component={MyBooking} />;
        </Switch>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
