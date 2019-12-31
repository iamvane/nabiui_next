
import React from "react";
import {
  StripeProvider,
  CardElement,
  injectStripe,
  Elements
} from "react-stripe-elements";
import "../../../assets/scss/StripePaymentForm.scss";


const PaymentForm = (props: any) =>  {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const cardElement = props.elements.getElement('card');

    // if (!props.onSubmit) {
    //   return;
    // }
    if (props.stripe) {
      props.stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {name: 'Jenny Rosen'},
      })
      .then(({paymentMethod}) => {
        console.log('Received Stripe PaymentMethod:', paymentMethod);
      });
    }
    //   props.stripe
    //     .createToken()
    //     .then((payload: any) => {
    //       props.onToken(payload.token);
    //     });
    // } else {
    //   console.log("Stripe.js hasn't loaded yet.");
    // }
  };
  return (
    <form onSubmit={handleSubmit} className="nabi-full-width">
      {/* <AddressSection /> */}
      <CardElement />
      <button>Confirm order</button>
    </form>
  );
}

const InjectedCheckoutForm = injectStripe(PaymentForm);

export const StripePaymentForm = (props: any) => {
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
            <InjectedCheckoutForm />
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