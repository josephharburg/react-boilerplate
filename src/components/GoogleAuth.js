import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
// Go to google oauth documentation in order to see all methods necessary
// componentDidMount Essentially executes after the app is rendered and not before.
// Technically you should use redux for this code but for teaching purposes this shows how it works.

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '687513509694-0cnctkgt8gbca1oije99h1cuopihko1v.apps.googleusercontent.com', // got this from google developer tools
        scope: 'email' //what we want to use from the googleAuth
      }).then(() => { // window.gapi.client.init returns as a promise so we can use then to get authenication
        this.auth = window.gapi.auth2.getAuthInstance(); // This gets the verification that you signed in
        this.onAuthChange(this.auth.isSignedIn.get()); // this uses our function to see fi user is signed in using actioncreators.
        this.auth.isSignedIn.listen(this.onAuthChange); //this listens to see if user is signed in so we can pass our own function in
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
};

  onSignInClick = () => {
  this.auth.signIn();
};

  onSignOutClick = () => {
  this.auth.signOut();
};


  renderAuthButton() {
  if(this.props.isSignedIn === null) {
    return null;
  }else if (this.props.isSignedIn) {
    return (
      <button onClick={this.onSignOutClick} className="ui red google button">
        <i className="google icon" />
        Sign Out
        </button>
    );
  } else {
    return (
      <button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon" />
        Log in with Google
      </button>

    )
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
};

export default connect(
  mapStateToProps,
  { signIn, signOut })
  (GoogleAuth);
