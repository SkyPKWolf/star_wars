import { Link, Route } from 'react-router-dom';

import { CharactersList } from './components/CharactersList';

import './App.css';



const App = () => {
  function fbLogoutUser() {
    //eslint-disable-next-line
    FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            //eslint-disable-next-line
            FB.logout(function(response) {
                console.log('bye')
            });
        }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
          <Route path="/star_wars/home">
            <button onClick={fbLogoutUser}>
              Log out
            </button>
            <h1 className="main_title">Star Wars</h1>
            <nav className="menu">
              <ul>
                <li>
                  <Link 
                    to="/star_wars/characters"
                    className="btn"
                  >
                    Characters
                  </Link>
                </li>
              </ul>
            </nav>
          </Route>
          <Route path="/star_wars/characters">
            <CharactersList/>
          </Route>
          <Route path="/star_wars" exact>
            <div 
              className="fb-login-button" 
              data-width="" 
              data-size="large" 
              data-button-type="continue_with" 
              data-layout="default" 
              data-auto-logout-link="false" 
              data-use-continue-as="false"
            >
            </div>
          </Route>
      </header>
    </div>
  );
}

export default App;
