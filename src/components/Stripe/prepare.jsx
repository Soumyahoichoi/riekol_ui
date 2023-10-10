import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getClientSecret } from "../../api/checkout.js";
import { getResultFromData } from "../../helper.js";
import CheckoutForm from "./index.jsx";
import { useStore } from "../../store/store.js";
import { Spinner } from "@nextui-org/react";
import "./styles.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const StripeForm = () => {
  const [options, setOptions] = useState();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const navigate = useNavigate();

  const { cart } = useStore((store) => ({ cart: store.cart }));
  const billingamount = cart.reduce(
    (acc, item) => acc + item.count * item.registration_fee,
    0
  );

  useEffect(() => {
    async function fetchClientSecret() {
      //   console.log("hello");
      let secret = await getClientSecret(+billingamount * 100);
      const options = {
        clientSecret: getResultFromData(secret),
        // appearance: {/*...*/},
        appearance: {
          theme: "stripe",
        },
      };

      setOptions(options);
    }

    if (billingamount && typeof billingamount === "number") {
      fetchClientSecret();
    } else {
      toast.error("Please provide a valid billing");
      navigate("/myeo");
    }
  }, []);
  return (
    <>
      {stripePromise && options ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm bill={billingamount} />
        </Elements>
      ) : (
        <section className="checkout">
          <Spinner size="lg" />
        </section>
      )}
    </>
  );
};

export default StripeForm;
