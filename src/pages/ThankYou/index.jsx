import React, { useState, useEffect } from 'react';
import './styles.css';
// import { useStripe } from "@stripe/react-stripe-js";

const PaymentStatus = () => {
    // const stripe = useStripe();
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        // Retrieve the "payment_intent_client_secret" query parameter appended to
        // your return_url by Stripe.js
        const status = new URLSearchParams(window.location.search).get(
            // "payment_intent_client_secret"
            'redirect_status'
        );

        setStatus(status);

        switch (status) {
            case 'succeeded':
                setMessage('Success! Payment received.');
                break;

            case 'processing':
                setMessage("Payment processing. We'll update you when payment is received.");
                break;

            case 'requires_payment_method':
                // Redirect your user back to your payment page to attempt collecting
                // payment again
                setMessage('Payment failed. Please try another payment method.');
                break;

            default:
                setMessage('Something went wrong.');
                break;
        }
        // // Retrieve the PaymentIntent
        // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        //   // Inspect the PaymentIntent `status` to indicate the status of the payment
        //   // to your customer.
        //   //
        //   // Some payment methods will [immediately succeed or fail][0] upon
        //   // confirmation, while others will first enter a `processing` state.
        //   //
        //   // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        //   switch (paymentIntent.status) {
        //     case "succeeded":
        //       setMessage("Success! Payment received.");
        //       break;

        //     case "processing":
        //       setMessage(
        //         "Payment processing. We'll update you when payment is received."
        //       );
        //       break;

        //     case "requires_payment_method":
        //       // Redirect your user back to your payment page to attempt collecting
        //       // payment again
        //       setMessage("Payment failed. Please try another payment method.");
        //       break;

        //     default:
        //       setMessage("Something went wrong.");
        //       break;
        //   }
        // });
    }, []);

    return (
        <>
            {/* <div className="after-payment-container">{status === 'succeeded' ? <ThankYou /> : status === 'processing' ? <Processing /> : <Wrong />}</div> */}
            <ThankYou />
        </>
    );
};

export default PaymentStatus;

const ThankYou = () => (
    <div className="wrapper-1">
        <div className="wrapper-2">
            <h1 className="h1">Thank you !</h1>
            <p>Thanks for subscribing </p>
            {/* <p>you should receive a confirmation email soon </p> */}
            {/* <button className="go-home">go home</button> */}
        </div>
        <div className="footer-like">
            {/* <p>
              Email not received?
              <a href="#">Click here to send again</a>
            </p> */}
        </div>
    </div>
);

// const Processing = () => (
//     <div className="wrapper-1">
//         <div className="wrapper-2">
//             <h1>Processing...</h1>
//             {/* <p>Thanks f. </p> */}
//             {/* <p>you should receive a confirmation email soon </p> */}
//             {/* <button className="go-home">go home</button> */}
//         </div>
//         <div className="footer-like">
//             {/* <p>
//               Email not received?
//               <a href="#">Click here to send again</a>
//             </p> */}
//         </div>
//     </div>
// );

// const Wrong = () => {
//     return (
//         <div className="wrapper-1">
//             <div className="wrapper-2">
//                 <h1> Uh oh! Something went wrong. ...</h1>
//                 {/* <p>Thanks for subscribing to our news letter. </p> */}
//                 {/* <p>you should receive a confirmation email soon </p> */}
//                 {/* <button className="go-home">go home</button> */}
//             </div>
//             <div className="footer-like">
//                 {/* <p>
//               Email not received?
//               <a href="#">Click here to send again</a>
//             </p> */}
//             </div>
//         </div>
//     );
// };
