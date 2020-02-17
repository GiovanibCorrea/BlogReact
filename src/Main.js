import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./pages/Home";
import Publishes from "./pages/Publishes";
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1>Simple SPA</h1>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/publishes">Publishes</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/publishes" component={Publishes}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;