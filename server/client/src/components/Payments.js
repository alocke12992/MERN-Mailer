import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="MERN Mailer"
        description="$500.00 for 5 credits"
        amount={50000}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}>
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}
export default connect(null, actions)(Payments);
