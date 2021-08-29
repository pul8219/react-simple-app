import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LoginPage from './components/views/LoginPage/LoginPage';
import FeedPage from './components/views/FeedPage/FeedPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LoginPage, false)} />
          <Route exact path="/main" component={Auth(FeedPage, true)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
