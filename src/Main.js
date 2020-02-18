import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Publishes from "./pages/Publishes";
import PublishesByAuthor from "./pages/PublishesByAuthor";
import authorApi from "./services/authorApi";
import './App.scss';

class Main extends Component {
  state = {
    authors: [],
  };

  componentDidMount() {
    this.loadProducts();

    this.setState({
      authors: this.state.authors,
      filteredAuthors: this.state.authors
    })
  }

  loadProducts = async () => {
    const responses = await authorApi.get();
    this.setState({ authors: responses.data });
  };

  render() {
    return (
        <HashRouter>
            <div>
                <ul className="header">
                    <h1>Simple SPA</h1>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/publishes">Publishes</NavLink></li>
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