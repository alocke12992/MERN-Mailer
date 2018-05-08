import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import SurveyNew from './SurveyNew';
import NoMatch from './NoMatch';

const App = () => {
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
};

export default App;
