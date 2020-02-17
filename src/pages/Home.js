import React, { Component } from "react";
import publishesApi from "../services/publishesApi";
import { FormattedDate } from "react-intl";

export default class Home extends Component {
  	state = {
	    posts: []
  	};

  	componentDidMount() {
		  this.loadPublishes();
  	}

  	loadPublishes = async () => {
      const response = await publishesApi.get();
      this.setState({ posts: response.data });
  	};

  	render() {
      const { posts } = this.state;
      
      return (
          <div className="post-list">
              {
                posts
                .sort((a, b) => b.metadata.publishedAt - a.metadata.publishedAt)
                .map((post) => (
                  <div className="publishes" key={post.metadata.publishedAt}>
                      <div>
                        <li>
                          <h2 key={post.title}>{post.title}</h2>
                          <div>
                            <FormattedDate
                              value={post.metadata.publishedAt}
                              day="2-digit"
                              month="long"
                              year="numeric"
                            />
                          </div>
                        </li>
                      </div>
                  </div>
                ))
              }
        </div>
      );
  	}
}
