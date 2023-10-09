import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getClientSecret } from "../../api/checkout.js";
import { getResultFromData } from "../../helper.js";
import CheckoutForm from "./index.jsx";

export const StripeForm = () => {
  const [options, setOptions] = useState();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    async function fetchClientSecret() {
      let secret = await getClientSecret(100);
      const options = {
        clientSecret: getResultFromData(secret),
        // appearance: {/*...*/},
      };

      setOptions(options);
    }
    fetchClientSecret();
  }, []);
  console.log(stripePromise, options);
  return (
    <>
      {stripePromise && options && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default StripeForm;
