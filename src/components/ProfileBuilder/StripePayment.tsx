import React from "react";

import {
  Button,
  Typography
} from "@material-ui/core";

import {
  StripeProvider,
  CardElement,
  injectStripe,
  Elements
} from "react-stripe-elements";

class PrivateCardForm extends React.Component<any, any> {
  handleSubmit = (ev: any) => {
    ev.preventDefault();
    if (!this.props.onSubmit()) {
      return;
    }
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload: any) => {
          this.props.onToken(payload.token);
        });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="coco-padding-bottom-small"
      >
        <Typography
          color="primary"
          className="coco-padding-bottom-small coco-padding-top-small"
        >
          lola
        </Typography>
        <CardElement />
        <Button
          className="coco-margin-bottom-medium coco-margin-top-medium"
          color="primary"
          variant="contained"
          type="submit"
          disabled={this.props.disabled}
        >
          mento
        </Button>
      </form>
    );
  }
}

const CartForm = injectStripe(PrivateCardForm);

const StripePaymentForm = (props: { onToken: Function, onSubmit: Function, disabled: boolean }) => {
  return (
    <StripeProvider apiKey="pk_test_0bqLmpsvPKYaGFgPeTrmsh3s00hMjjwCJm">
      <Elements>
        <CartForm {...props} />
      </Elements>
    </StripeProvider>
  );
};

export default StripePaymentForm;
