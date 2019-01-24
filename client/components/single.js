import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3333/api/posts/${this.props.match.params.id}`)
      .then(post => {
        this.setState({
          post: post.data
        });
      });
  }

  onDelete(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3333/api/posts/${this.props.match.params.id}`)
      .then(post => {
        alert("Post Successfully Deleted!");
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <div className="container m-8">
        <div className="flex justify-end">
          <small>
            <Link
              to={`/edit/${this.state.post._id}`}
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </Link>
            <button
              onClick={e => this.onDelete(e)}
              className="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </small>
        </div>
        <br />
        <h1>{this.state.post.title}</h1>
        <br />
        <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
      </div>
    );
  }
}
export default withRouter(Single);
