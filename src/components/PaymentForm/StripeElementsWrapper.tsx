import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_0bqLmpsvPKYaGFgPeTrmsh3s00hMjjwCJm');

const StripeElementsWrapper: React.FunctionComponent = ({
  children,
}) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);

export default StripeElementsWrapper;
