import React, { Component } from "react";
import { FormattedDate } from "react-intl";
import { NavLink } from "react-router-dom";

import publishesApi from "../services/publishesApi";
import authorApi from "../services/authorApi";

export default class Publishes extends Component {
  state = {
    posts: [],
    authors: [],
    filterPublishes: [], 
    authorFilter: ''
  };

  componentDidMount() {
    this.loadProducts();

    this.setState({
      authors: this.state.authors,
      filteredAuthors: this.state.authors
    })
  }

  loadProducts = async () => {
    const response = await publishesApi.get();
    this.setState({ posts: response.data });
    
    const responses = await authorApi.get();
    this.setState({ authors: responses.data });

    this.setState({filterPublishes: this.state.posts});
  };

  ascendingSort = e => {
    const { posts } = this.state;
    this.setState({ posts: posts });
    posts.sort((a, b) => a.metadata.publishedAt - b.metadata.publishedAt);
    e.preventDefault();
  };

  descendingSort = e => {
    const { posts } = this.state;
    this.setState({ posts: posts });
    posts.sort((a, b) => b.metadata.publishedAt - a.metadata.publishedAt);
    e.preventDefault();
  };

  getAuthorName = post => {
    if (this.state.authors.length === 0) return "";
    return this.state.authors.filter(a => a.id === post.metadata.authorId)[0]
      .name;
  }

  render() {
		return (
			<div>

				<div>
					<button onClick={this.ascendingSort}>
						+ Antigos
					</button>

					<button onClick={this.descendingSort}>
						+ Novos
					</button>
       
          Autores: 
          {this.state.authors.map(author => (
            <div key={author.id}>
              <NavLink to={"/publishesbyauthor/" + author.id}>
                {author.name}
              </NavLink>
            </div>
          ))}
				</div>

				<div className="publications">
					{this.state.filterPublishes.map(publishe => (
            <div className="box-publication" key={publishe.title}>
              <h2 className="name">{publishe.title}</h2>

              <div className="author">
                {this.getAuthorName(publishe)}
              </div>

              <div classname="article">
                {publishe.body}
              </div>
              
              <div className="date">
                <FormattedDate
                  value={publishe.metadata.publishedAt}
                  day="numeric"
                  month="long"
                  year="numeric"
                />
              </div>              
            </div>
					))}
				</div>
			</div>
		);
  }
}
