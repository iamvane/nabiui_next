import React, { useState } from 'react';
import {
  Button,
  Typography
} from '@material-ui/core';

import SnackBar from '../common/SnackBar';
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
        color: "#717A8A !important",
      },
    },
    invalid: {
      color: '#9e2146',
    },
  }
};

interface Props {
  submitPayment : (id: string) => void;
  clientSecret: string;
  buttonText?: string;
}

const StripePaymentForm = (props: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    stripe.confirmCardSetup(props.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    }).then(function(result) {
      setProcessing(false);
      if (result.error) {
        setError(result.error.message);
        setShowSnackbar(true);
      } else {
        props.submitPayment(result.setupIntent.payment_method)
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
          {props.buttonText || 'Submit Payment'}
        </Button>
      </form>
      <SnackBar
        isOpen={showSnackbar}
        message={error}
        handleClose={() => setShowSnackbar(false)}
        variant={"error"}
      />
      {error && <Typography>{error.message}</Typography>}
    </>
  );
};

export default StripePaymentForm;
