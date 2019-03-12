import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Post.css";
import axios from "axios";
class Post extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      img: "",
      content: "",
      author: "",
      authorPicture: ""
    };
  }

  componentDidMount() {
    axios.get(`/api/getPost/${this.props.match.params.id}`).then(results => {
      console.log(results);
      const data = results.data[0];
      this.setState({
        title: data.title,
        img: data.img,
        content: data.content,
        author: data.username,
        authorPicture: data.profilepic
      });
    });
  }
  render() {
    return (
      <div>
        <div>
          <Nav />
        </div>
        <div className="post-container">
          <div className="post-header">
            <h2>Title: {this.state.title}</h2>
            <div>by {this.state.author}</div>
          </div>
          <div className="img-container">
            <img src={this.state.img} alt="pic" />
            <p>{this.state.content}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Post;
