import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Spinner from 'react-spinkit';
import { inject, observer } from 'mobx-react';

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object,
  }

  componentDidMount() {
    this.props.auth.checkAuth();
  }

  handleSignIn = () => {
    this.props.auth.signIn();
  }

  handleSignOut = () => {
    this.props.auth.signOut();
  }

  render() {
    const { authenticating, user } = this.props.auth;

    const authButton = user
      ? (<button onClick={this.handleSignOut}>
        <div>Sign Out</div>
        <img src={user.photoURL} alt="profile-pic" />
      </button>)
      : (<button onClick={this.handleSignIn}>
        <div>Sign In With Google</div>
      </button>);

    return (
      <div className="Navbar">
        <div className="Navbar-home">
          <Link to="/">Quick Questions</Link>
        </div>

        {user ?
          <Link to="/new-question">
            New Question
          </Link> : ''}

        {user ?
          <Link to="/my-questions">
            My Questions
          </Link> : ''}

        <div className="Navbar-auth">
          {authenticating ?
            <button>
              <Spinner spinnerName="three-bounce" />
            </button> : authButton}
        </div>
      </div>
    );
  }
}

export default inject('auth')(observer(Navbar));
