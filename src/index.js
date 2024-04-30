import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Route } from "react-router-dom";
import "./index.css";

import Palletizer from './Palletizer/Palletizer'
import RoundCylinder from "./RoundCylinder/RoundCylinder";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div id="container">

    <Router>
        <Route path="/" exact component={Palletizer} />
        <Route path="/round-cylinder" component={RoundCylinder} />


    </Router>
  </div>
);

