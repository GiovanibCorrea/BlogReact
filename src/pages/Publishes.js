import React, { Component } from "react";
import { FormattedDate } from "react-intl";

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

  handleFilterAuthor = (query) => {
    this.setState({filterPublishes: this.state.posts.filter
      (p => this.getAuthorName(p).toLowerCase().startsWith(query.toLowerCase())
      )})
  }

  render() {
		return (
			<div>
				<div className="filter-author">
					<label htmlFor="filter">Busque um autor: </label>
					
          <input type="text" id="filter" placeholder="Nome"
						onChange={(e) => this.handleFilterAuthor(e.target.value)}
					/>
				</div>

				<div>
					<button onClick={this.ascendingSort}>
						+ Antigos
					</button>

					<button onClick={this.descendingSort}>
						+ Novos
					</button>
				</div>

				<div>
					{this.state.filterPublishes.map(publishe => (
            <div key={publishe.title}>
              <h3>{publishe.title}</h3>

              <div>
                {publishe.body}
              </div>
              
              <div>
                Publicado em:

                <FormattedDate
                  value={publishe.metadata.publishedAt}
                  day="numeric"
                  month="long"
                  year="numeric"
                />
              </div>

              <span>
                Por: {this.getAuthorName(publishe)}
              </span>
            </div>
					))}
				</div>
			</div>
		);
  }
}
