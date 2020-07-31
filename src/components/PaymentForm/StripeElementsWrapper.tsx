import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = process.env.NODE_ENV === 'production' ? process.env.REACT_STRIPE_KEY : 'pk_test_0bqLmpsvPKYaGFgPeTrmsh3s00hMjjwCJm'
const stripePromise = loadStripe(stripePublicKey);

const StripeElementsWrapper: React.FunctionComponent = ({
  children,
}) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);

export default StripeElementsWrapper;
