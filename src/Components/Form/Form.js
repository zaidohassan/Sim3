import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Form.css";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import axios from "axios";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      title: "",
      img: "",
      content: ""
    };
  }
  componentDidMount() {
    this.props.getUser();
    this.setState({
      id: this.props.state.reducer.user.id
    });
  }
  updateForm = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postClick = e => {
    e.preventDefault();
    const { title, img, content, id } = this.state;
    axios
      .post("/api/createPost/", { title, img, content, id })
      .then(results => {
        this.setState({
          title: "",
          img: "",
          content: ""
        });
      });
  };
  render() {
    const { title, img, content } = this.state;
    return (
      <div>
        <Nav />
        <div className="new-container">
          <h2>New Post </h2>
          <div className="form-container">
            <div className="input-box">
              <p>Title:</p>
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.updateForm}
              />
            </div>
            <div className="Image">
              <img src={img ? img : null} alt="uploaded pic" />
            </div>
            <div className="image-input box">
              <p>Image Url:</p>
              <input
                type="text"
                name="img"
                value={img}
                onChange={this.updateForm}
              />
            </div>
            <div>
              <p>Content:</p>
              <textarea
                type="text"
                name="content"
                value={content}
                onChange={this.updateForm}
              />
            </div>
            <button onClick={this.postClick} className="button">
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return { state };
};

export default connect(
  mapStatetoProps,
  { getUser }
)(Form);
