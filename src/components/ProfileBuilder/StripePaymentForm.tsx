
import React from "react";

import { Button } from '@material-ui/core';

import {
  StripeProvider,
  CardElement,
  injectStripe,
  Elements
} from "react-stripe-elements";

import "../../../assets/scss/StripePaymentForm.scss";
import { BackgroundCheckParams } from "./models";

interface Props {
  submitPayment: (params : BackgroundCheckParams) => void;
}

const PaymentForm = (props: any) =>  {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const cardElement = props.elements.getElement('card');


    if (props.stripe) {
      props.stripe
        .createToken()
        .then((payload: any) => {
          console.log(payload.token);
          // this.props.onToken(payload.token);
          const params:BackgroundCheckParams = {
            instructorId: 3,
            amount: 30.00,
            stripeToken: payload.token.id
          }
          props.submitPayment(params);
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }

    // if (props.stripe) {
    //   props.stripe
    //   .createPaymentMethod({
    //     type: 'card',
    //     card: cardElement,
    //     billing_details: {name: 'Jenny Rosen'},
    //   })
    //   .then(({paymentMethod}) => {
    //     console.log('Received Stripe PaymentMethod:', paymentMethod);
    //   });
    // }
    //   props.stripe
    //     .createToken()
    //     .then((payload: any) => {
    //       props.onToken(payload.token);
    //     });
    // } else {
    //   console.log("Stripe.js hasn't loaded yet.");
    // }
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
      <Button
        className="nabi-margin-top-small"
        color="primary"
        variant="contained"
        type="submit"
      >
        Confirm order
      </Button>
    </form>
  );
}

const InjectedCheckoutForm = injectStripe(PaymentForm);

export const StripePaymentForm = (props: Props) => {
  // const [stripe, setStripe] = React.useState(window.Stripe('pk_test_0bqLmpsvPKYaGFgPeTrmsh3s00hMjjwCJm'));

  // React.useEffect(() => {
  //   if (window) {
  //     setStripe(window.Stripe('pk_test_0bqLmpsvPKYaGFgPeTrmsh3s00hMjjwCJm'));
  //   }
  // }, []);

  const stripe = window.Stripe('pk_test_0bqLmpsvPKYaGFgPeTrmsh3s00hMjjwCJm');

  const renderItems = () => {
    if (stripe) {
      return (
        <StripeProvider stripe={stripe}>
          <Elements>
            <InjectedCheckoutForm submitPayment={props.submitPayment} />
          </Elements>
        </StripeProvider>
      )
    }
    return;
  }
  return (
    renderItems()
  );
}

export default StripePaymentForm;