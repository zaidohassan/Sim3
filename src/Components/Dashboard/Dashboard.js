import React, { Component } from "react";
import "./Dashboard.css";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      search: "",
      userId: "",
      usersposts: false
    };
  }

  componentDidMount() {
    this.getData();
    this.setState({ userId: this.props.state.reducer.user.id });
  }

  getData = () => {
    axios.get("/api/getAllPosts").then(results => {
      this.setState({
        posts: results.data
      });
    });
  };

  updateForm = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  updateUserBoolean = () => {
    if (this.state.userId) {
      this.setState({ usersposts: !this.state.usersposts });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { usersposts, userId, search } = this.state;

    if (usersposts !== prevState.usersposts && userId && !search) {
      if (usersposts) {
        axios.get(`/api/getIndvPost/${userId}`).then(results => {
          this.setState({
            posts: results.data
          });
        });
      } else {
        this.getData();
      }
    }
  }

  searchInput = () => {
    const { search, userId, usersposts } = this.state;
    if (search) {
      axios
        .get(
          `/api/posts?search=${search}&userid=${userId}&userReq=${usersposts}`
        )
        .then(results => {
          console.log(results.data);
          this.setState({ search: "", posts: results.data });
        });
    } else {
      this.getData();
    }
  };

  render() {
    const { search, posts, userId } = this.state;
    let displayPosts = posts.map((post, i) => {
      return (
        <Link to={`/post/${post.id}`} key={i}>
          <div className="inside-post-container" key={i}>
            <h3>{post.title}</h3>
            <div className="authorwithPic">
              <p> by: {post.username}</p>
              <img src={post.profilepic} />
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div>
        <div>
          <Nav />
        </div>
        <div className="dashboard">
          <div className="inputcontainer">
            <div className="inputsearchbox">
              {userId}
              <input
                className="searchbox"
                type="text"
                name="search"
                value={search}
                onChange={this.updateForm}
              />
              <img
                className="searchbutton"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAeJJREFUSA2tlM0rBGEcx3dWEREp4oBVrvsXLJEoTsR/QDk6ydt1E2ccuIniKGeEi4MLbY6SAzaRUt5C1uer9pkZM7PM2m99muf5vT0zz/yeJxLxUSaTKYch2IJzeIF7SMECdPikeUzWTwuJI9iSUA0HcAhpKIVm6IEWkG/UsqwUz9yiaAmswScsQ31QBr4uOIEnGAyKM3aCVFjB/caYY0CcXmYVPqA7MBTnCOiN/1Q4W4h4C/Rf9D9qs3bzxKifdwNLxhhiQF4V3MGiJw2juuIN6jzOPxrInYRnKHOlYNBnbbuMISfkx0Dqc6ZGmcRB7Za3aMcLkq9BtYxUXC2nPv6vVMPVvir+Ajog/5VqvDqLqPgVxJzGsGP2uoicBlAtIxXfh15jyW+QIK0CdCXYYtV2kDpta7gRuRtwBpYnE+MeHEOxx/mLgZxW0Oke9g3FEYdHWAHv6r5ZkQixTZCGXdAW+wvnALzDJlT6R9lWYhKgwtKM7QkYEaSrVJfQLYxDozOUeRTaYB20FTuQBGnKGes7JqgG5kHXr3QJR3AKDyDp5+lO+t4KnhMguRYI3F8CdSh0T+tI6+TpgKiP1W7HHPkMTyPiJ5jMwTS+WeMo1EALgOT6gkLVVwdlF9CXFF4sMAapL60vtT4ftHlFAAAAAElFTkSuQmCC"
                alt="search"
                onClick={this.searchInput}
              />
              <button id="reset">Reset</button>
            </div>
            <div className="checkbox-container">
              <p> My Posts</p>
              <input type="checkbox" onChange={this.updateUserBoolean} />
            </div>
          </div>
          <div className="posts-container"> {displayPosts}</div>{" "}
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
)(Dashboard);
