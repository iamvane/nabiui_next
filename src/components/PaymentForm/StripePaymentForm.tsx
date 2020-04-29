import React, { useState } from 'react';
import {
  Button,
  Typography
} from '@material-ui/core';

import "../../../assets/scss/StripePaymentForm.scss";

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_OPTIONS = {
  iconStyle: 'solid' as const,
  style: {
    base: {
      fontSize: "16px",
      color: '#717a8a',
      fontFamily: '\'Montserrat\', sans-serif',
      backgroundColor: '#f3f6f9',
      borderRadius: '5px' ,
      '::placeholder': {
        color: "#868e96",
      },
    },
    invalid: {
      color: '#9e2146',
    },
  }
};

const StripePaymentForm = (props: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    // const payload = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement)
    // });

    stripe.confirmCardPayment("seti_1Gc0SxDzPkkZe0Mke9Aq1Tga_secret_HAL9dKFTDyzISI12TBe9ibxGwaofq36", {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    }).then(function(result) {
      setProcessing(false);
      if (result.error) {
        setError(result.error.message);
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
      } else {
        // setPaymentMethod(result.paymentMethod);
        console.log(result);
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    });
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <legend>Your payment details:</legend>
        <div id="card-element">
          <CardElement
            options={CARD_OPTIONS}
            onChange={(e) => {
              setError(e.error);
              setCardComplete(e.complete);
            }}
          />
        </div>
        <Button
          className="nabi-margin-top-small"
          type="submit"
          variant="contained"
          color="primary"
          disabled={processing || !stripe}
        >
          Submit Payment
        </Button>
      </form>
      {error && <Typography>{error.message}</Typography>}
    </>
  );
};

export default StripePaymentForm;