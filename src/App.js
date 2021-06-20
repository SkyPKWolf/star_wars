import { Link, Route } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

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
              // eslint-disable-next-line no-restricted-globals
              location.href = "/star_wars/";
            });
        }
    });
  }

  function redirect (){
    //eslint-disable-next-line
    FB.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
        // eslint-disable-next-line no-restricted-globals
        location.href = "/star_wars/#/home/";
      }
  });
  };

  return (
    <div className="App">
      <header className="App-header">
          <Route path="/home">
            <button 
              className="btn"
              onClick={fbLogoutUser}
            >
              Log out
            </button>
            <h1 className="main_title">Star Wars</h1>
            <nav className="menu">
              <ul>
                <li>
                  <Link 
                    to="/characters"
                    className="btn"
                  >
                    Characters
                  </Link>
                </li>
              </ul>
            </nav>
          </Route>
          <Route 
            path="/characters/:characterName?"
            component={CharactersList}
          >
          </Route>
          <Route path="/" exact>
          <FacebookLogin
            appId="856885485186770"
            autoLoad={true}
            fields="name,email,picture"
            callback={redirect} 
          />
          </Route>
      </header>
    </div>
  );
}

export default App;
