import React, { Component } from "react";
import { FormattedDate } from "react-intl";
import publishesApi from "../services/publishesApi";
import authorApi from "../services/authorApi";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default class PublishesByAuthor extends Component {
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
    const { id } = this.props.match.params;

    const response = await publishesApi.get();
    this.setState({ posts: response.data });
    
    const responses = await authorApi.get();
    this.setState({ authors: responses.data });
    
    if(id){
      var newString = id;
      const Publish = this.state.posts;

      const result = Publish.filter(item => item.metadata.authorId == newString)
      this.setState({filterPublishes: result});
    }
    else{
      this.setState({filterPublishes: this.state.posts});
    }
  };

  ascendingSort = e => {
    const { filterPublishes } = this.state;
    this.setState({ filterPublishes: filterPublishes });
    filterPublishes.sort((a, b) => a.metadata.publishedAt - b.metadata.publishedAt);
    e.preventDefault();
  };

  descendingSort = e => {
    const { filterPublishes } = this.state;
    this.setState({ filterPublishes: filterPublishes });
    filterPublishes.sort((a, b) => b.metadata.publishedAt - a.metadata.publishedAt);
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
				<div className="publications publications-int">
          <div className="order-by">
            <button onClick={this.ascendingSort}>
              <FontAwesomeIcon icon={faAngleDown} /> Antigos
            </button>

            <button onClick={this.descendingSort}>
              <FontAwesomeIcon icon={faAngleUp} /> Novos
            </button>
          </div>

					{this.state.filterPublishes.map(publishe => (
            <div className="box-publication" key={publishe.title}>
              <h2 className="name">{publishe.title}</h2>

              <div className="author">
                <FontAwesomeIcon icon={faUser} />

                {this.getAuthorName(publishe)}
              </div>

              <div className="article">
                {publishe.body}
              </div>

              <div className="date">
                <FontAwesomeIcon icon={faCalendarAlt} />

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
