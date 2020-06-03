import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_w3eJuwclLTq3awfhENpZwqpx002APtyTMh');

const StripeElementsWrapper: React.FunctionComponent = ({
  children,
}) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);

export default StripeElementsWrapper;
