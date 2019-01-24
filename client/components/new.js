import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      title: this.state.title,
      content: this.state.content
    };
    axios.post("http://localhost:3333/api/posts/", data).then(post => {
      alert("Post Successfully Created!");
      document.getElementById("new").reset();
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div className="m-8">
        <h1>Create a new post</h1>
        <form onSubmit={this.onSubmit} id="new">
          <div className="m-8">
            <label
              htmlFor="title"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={this.onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="m-8">
            <label
              htmlFor="content"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Content
            </label>
            <textarea
              onChange={this.onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              name="content"
            />
          </div>

          <div className="flex justify-center">
            <input
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Save"
            />
            <Link
              className="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
              to="/"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(New);
