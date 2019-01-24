import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3333/api/posts").then(posts => {
      this.setState({
        posts: posts.data
      });
    });
  }

  render() {
    return (
      <div className="m-8">
        <ul className="index">
          {this.state.posts.map(post => (
            <li key={post.title}>
              <h2>
                <Link to={`/post/${post._id}`}>{post.title}</Link>
              </h2>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
