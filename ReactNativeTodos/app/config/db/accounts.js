let React = require('react-native');
let {AsyncStorage} = React;
let ddpClient = require('./lib/ddpClient');
let EventEmitter = require('event-emitter');

let login = (loginObj, resolve, reject) => {
  let obj = { loggedIn: false};
  let loginParams = {};
  if (loginObj.email && loginObj.password) {
    loginParams = { user : { email : loginObj.email }, password : loginObj.password };
  } else if (loginObj.resume) {
    loginParams = { resume: loginObj.resume };
  }

  ddpClient.connection.call("login", [loginParams], (err, res) => {
    if (err) {
      reject(err);
    }

    if (res) {
      let userId = res.id.toString();
      AsyncStorage.setItem('userId', userId)
      AsyncStorage.setItem('loginToken', res.token.toString());
      AsyncStorage.setItem('loginTokenExpires', res.tokenExpires.toString());

      obj.loggedIn = true;
      obj.userId = userId;

      Accounts.emitter.emit('loggedIn', userId);

      resolve(obj);
    } else {
      resolve(obj);
    }
  });
};

let Accounts = {};

Accounts.emitter = new EventEmitter();
Accounts.userId = AsyncStorage.getItem('userId');

Accounts.signOut = () => {
  return new Promise((resolve, reject) => {
    ddpClient.connection.call("logout", [], (err, res) => {
      if (err) {
        console.log('err', err);
      } else {
        console.log('delete the tokens');

        Accounts.emitter.emit('loggedOut');

        AsyncStorage.multiRemove(['userId', 'loginToken', 'loginTokenExpires']);
      }
    });
    resolve(true);
  });
};

Accounts.signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    login({email: email, password: password}, resolve, reject);
  });
};

Accounts.signInWithToken = () => {
  return new Promise((resolve, reject) => {
    // Check if we have a loginToken in persistent client storage
    AsyncStorage.getItem('loginToken')
      .then((token) => {
        if (token) {
          login({resume: token}, resolve, reject);
        } else {
          resolve({loggedIn: false});
        }
      });
  });
};

Accounts.signUp = (email, password) => {
  return ddpClient.call('Users.create', [email, password])
    .then(() => {
      return Accounts.signIn(email, password);
    });
};

module.exports = Accounts;
