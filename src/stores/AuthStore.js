import { extendObservable } from 'mobx';
import { authRef, providerGoogle } from '../reference';

class AuthStore {
  constructor() {
    extendObservable(this, {
      authenticating: true,
      user: null,
    });
  }

  checkAuth() {
    authRef.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.authenticating = false;
      } else {
        this.user = null;
        this.authenticating = false;
      }
    });
  }

  signIn() {
    this.authenticating = true;

    authRef
      .signInWithRedirect(providerGoogle)
      .then(() => {
        authRef
          .getRedirectResult()
          .then((result) => {
            this.user = result.user;
            this.authenticating = false;
          });
      });
  }

  signOut() {
    this.authenticating = true;

    authRef
      .signOut()
      .then(() => {
        this.user = null;
        this.authenticating = false;
      });
  }
}

export default AuthStore;
