import React from "react";
import {
  StripeProvider,
  CardElement,
  injectStripe,
  Elements
} from "react-stripe-elements";

import {
  Button,
  CircularProgress
} from '@material-ui/core';

import "../../../assets/scss/StripePaymentForm.scss";

interface Props {
  submitPayment: (stripeToken : string) => void;
  isRequesting?: boolean;
  disabled?: boolean;
}

const PaymentForm = (props: any) =>  {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const cardElement = props.elements.getElement('card');


    if (props.stripe) {
      props.stripe
        .createToken()
        .then((payload: any) => {
          props.submitPayment(payload.token.id);
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: "16px",
          color: '#717a8a',
          fontFamily: '\'Montserrat\', sans-serif',
          padding: '17px 18px',
          background: '#f3f6f9',
          borderRadius: '5px' ,
          '::placeholder': {
            color: "#868e96",
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };
  return (
    <form onSubmit={handleSubmit} className="nabi-full-width">
      <div id="card-element">
        <CardElement className="nabi-stripe-form" {...createOptions()} />
      </div>
      {props.isRequesting ? <div className="nabi-margin-top-small"><CircularProgress /></div> :
        <Button
          className="nabi-margin-top-small"
          color="primary"
          variant="contained"
          type="submit"
          disabled={true}
        >
          Confirm order
        </Button>
     }
    </form>
  );
}

const InjectedCheckoutForm = injectStripe(PaymentForm);

export const StripePaymentForm = (props: Props) => {
  const windowObject =  typeof window !== 'undefined' && (window as any);

  if (windowObject) {
    const stripe =  windowObject.Stripe('pk_live_w3eJuwclLTq3awfhENpZwqpx002APtyTMh');

    const renderItems = () => {
      if (stripe) {
        return (
          <StripeProvider stripe={stripe}>
            <Elements>
              <InjectedCheckoutForm submitPayment={props.submitPayment} isRequesting={props.isRequesting} />
            </Elements>
          </StripeProvider>
        )
      }
      return;
    }
    return (
      <div>
        {renderItems()}
      </div>
    );
  } else {
    return <p>Unable to display form. Please contact us at info@nabimusic.com.</p>
  }
}

export default StripePaymentForm;
