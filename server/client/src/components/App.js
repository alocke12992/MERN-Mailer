import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import SurveyNew from './SurveyNew';
import NoMatch from './NoMatch';
import * as actions from '../actions';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/surveys"
            component={Dashboard}
          />
          <Route
            exact
            path="/surveys/new"
            component={SurveyNew}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default connect(null, actions)(App);
