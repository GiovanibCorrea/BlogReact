import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Publishes from "./pages/Publishes";
import PublishesByAuthor from "./pages/PublishesByAuthor";
import './App.scss';

class Main extends Component {

  componentDidMount() {
  }

  render() {
    return (
        <HashRouter>
            <div>
                <ul className="header">
                    <h1>Blog React Axur</h1>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/publishes">Publicações</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/publishes" component={Publishes}/>
                    <Route path="/publishesbyauthor/:id?" component={PublishesByAuthor}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;