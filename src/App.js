import { Link, Route } from 'react-router-dom';

import { CharactersList } from './components/CharactersList';

import './App.css';



const App = () => {
  return (
    <div className="App">
      <header className="App-header">
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
          <Route path="/characters">
            <CharactersList/>
          </Route>
      </header>
    </div>
  );
}

export default App;
