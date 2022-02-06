import { useEffect, useState } from 'react';
import awsconfig from './aws-exports'; // credenciales del proyecto
import Amplify, { Auth } from 'aws-amplify';
// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import SongList from './components/SongList';
import { Button } from '@material-ui/core';

import './App.css';
import SignIn from './components/SignIn';

/* Configuro o habilito Amplify en base al file de credenciales */
Amplify.configure(awsconfig);

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    AssessLoggedInState();
  }, [])

  const AssessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then((sess) => {
        setLoggedIn(true);
      }).catch(() => {
        setLoggedIn(false);
      });
  }



  const signOut = async () => {
    try {
      await Auth.signOut();
      window.location.reload();
      setLoggedIn(false);
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2));
    }
  }

  const onSignIn = () => {
    setLoggedIn(true);
  }

  return (
    <Router>
      <div>
        {/* <AmplifySignOut /> */}
        <header className="App-header">
          {loggedIn
            ? (<Button
                variant="contained"
                label="Sign Out"
                color="primary"
                onClick={signOut} >Sign Out
            </Button>)

            : (
              <Link to="/signin">
                <Button
                  variant="contained"
                  label="Sign In"
                  color="primary"
                >Sign In</Button>
              </Link>
            )
          }
          <h2>My App Content</h2>
        </header>

        <Routes>
          <Route path="/" element={<SongList loggedIn={loggedIn}/>} />
          <Route path="/signin" element={<SignIn onSignIn={onSignIn} />} />
        </Routes>

      </div>
    </Router>
  )
}

// export default withAuthenticator(App);
export default (App);