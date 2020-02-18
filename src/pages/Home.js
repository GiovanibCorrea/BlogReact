import React, { Component } from "react";
import publishesApi from "../services/publishesApi";
import authorApi from "../services/authorApi";
import { FormattedDate } from "react-intl";

export default class Home extends Component {
  	state = {
	    posts: [],
      authors: []
  	};

  	componentDidMount() {
		  this.loadPublishes();
  	}

  	loadPublishes = async () => {
      const response = await publishesApi.get();
      this.setState({ posts: response.data });
    
      const responses = await authorApi.get();
      this.setState({ authors: responses.data });
  	};

    getAuthorName = post => {
      if (this.state.authors.length === 0) return "";
      return this.state.authors.filter(a => a.id === post.metadata.authorId)[0]
        .name;
    }

  	render() {
      const { posts } = this.state;
      
      return (
          <div className="publications">
              {
                posts
                .sort((a, b) => b.metadata.publishedAt - a.metadata.publishedAt)
                .map((post) => (
                  <div className="box-publication" key={post.metadata.publishedAt}>
                      <div>
                        <div>
                          <h2 className="name" key={post.title}>{post.title}</h2>

                          <div className="author">
                            {this.getAuthorName(post)}
                          </div>
                          
                          <div className="date">
                            <FormattedDate
                              value={post.metadata.publishedAt}
                              day="2-digit"
                              month="long"
                              year="numeric"
                            />
                          </div>
                        </div>
                      </div>
                  </div>
                ))
              }
        </div>
      );
  	}
}
