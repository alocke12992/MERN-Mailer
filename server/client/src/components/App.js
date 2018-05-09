import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import SurveyNew from './surveys/SurveyNew';
import NoMatch from './NoMatch';
import FetchUser from './FetchUser';
import AuthRoute from './AuthRoute';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FetchUser>
          <Switch>
            <Route exact path="/" component={Landing} />
            <AuthRoute exact path="/surveys" component={Dashboard} />
            <AuthRoute exact path="/surveys/new" component={SurveyNew} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;
