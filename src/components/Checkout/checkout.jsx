import React, { useEffect, useState, useRef } from 'react';
import Visa from '../../assets/visa.svg';
import BackButton from '../../assets/backButton';
import { useStore } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import { intiateCCavenuePayment, saveDataInRedis } from '../../api/checkout';
import { ObjectFrom, generateUUID, getResultFromData } from '../../helper';
import { registerUser } from '../../api/register';

const Checkout = () => {
    const { cart, totalBillingAmout, setTotalBilingAmount, isSelected } = useStore((store) => ({
        cart: store.cart,
        setTotalBilingAmount: store.setTotalBilingAmount,
        totalBillingAmout: store.totalBillingAmout,
        isSelected: store.isSelected
    }));
    const navigate = useNavigate();
    const [encReq, setEncReq] = useState(null);
    const [accessCode, setAccessCode] = useState(null);
    const formRef = useRef(null);
    const { state: previousRouteState } = useLocation();

    const currency = isSelected ? 'USD' : 'INR';

    const billingAmount = cart?.reduce((acc, item) => {
        if (!isSelected) {
            if (typeof item.registration_fee === 'string') {
                return acc + item.count * +item.registration_fee.split(',').join('');
            }

            return acc + item.count * item.registration_fee;
        } else {
            if (typeof item.priceInDollar === 'string') {
                return acc + item.count * +item.priceInDollar.split(',').join('');
            }

            return acc + item.count * item.priceInDollar;
        }
    }, 0);

    const handleSubmit = async () => {
        // document.getElementById('nonseamless').submit();
        // console.log(result);
    };

    const onClickHandler = () => {
        navigate('/myeo');
    };

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/myeo');
        }
    }, [cart]);

    useEffect(() => {
        if (billingAmount) {
            const billingAmountWithGST = +billingAmount + 0.18 * billingAmount;
            setTotalBilingAmount(billingAmountWithGST);
        }
    }, [totalBillingAmout]);

    useEffect(() => {
        if (totalBillingAmout && previousRouteState) {
            const paymentId = crypto?.randomUUID?.() ?? generateUUID?.();
            const cols = ['price_id', 'name', 'start_time', 'end_time', 'registration_fee', 'count', 'email', 'event_date'];
            const { name, email } = previousRouteState;

            const ticketDetails = cart?.map((item) => ObjectFrom(cols, item)).map((item) => ({ ...item, order_id: paymentId, email, created: new Date()?.toTimeString(), customer_name: name }));
            const payLoad = {
                ticketDetails
            };

            if (payLoad.ticketDetails?.length > 0) {
                saveDataInRedis(payLoad).then((response) => {
                    intiateCCavenuePayment({
                        currency,
                        amount: totalBillingAmout,
                        email: previousRouteState.email,
                        name: previousRouteState.name,
                        chapter: previousRouteState.chapter,
                        phone: previousRouteState.contact,
                        cartId: response?.data?.result
                    }).then((val) => {
                        const result = getResultFromData(val);
                        if (result) {
                            setEncReq(result.encReq);
                            setAccessCode(result.accessCode);
                        }
                    });
                });
            }
        } else if (
            (cart?.[0]?.name === 'MyEO Governor House visit' || cart?.[0]?.name === "MyEO Montek Singh Ahluwalia with Suhel Seth plus Lunch by Kolkata's famed Bar-B-Q restaurant") &&
            (cart?.length === 1 || cart?.length === 2)
        ) {
            const paymentId = crypto?.randomUUID?.() ?? generateUUID?.();
            const cols = ['price_id', 'name', 'start_time', 'end_time', 'registration_fee', 'count', 'email', 'event_date'];
            // const { cart } = useStore((store) => ({ cart: store.cart }));

            const cart = JSON.parse(sessionStorage.getItem('cart') || '{}');

            const ticketDetails = cart
                ?.map((item) => ObjectFrom(cols, item))
                .map((item) => ({ ...item, order_id: paymentId, email: previousRouteState?.email, created: new Date()?.toTimeString(), customer_name: previousRouteState?.name }));
            const payLoad = {
                ticketDetails
            };

            registerUser(payLoad);

            navigate(`/thankyou?status=Success&email=${previousRouteState?.email}&name=${previousRouteState?.name}`);
        }
    }, [totalBillingAmout, previousRouteState]);

    useEffect(() => {
        if (encReq && accessCode && previousRouteState) {
            document.redirect.submit();
            // formRef?.current?.submit();
        }
    }, [encReq, accessCode, previousRouteState]);
    const ccavenueUrl = import.meta.env.PROD
        ? 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction'
        : 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction';
    return (
        <div className="checkout">
            {encReq && accessCode ? (
                <form ref={formRef} id="nonseamless" method="post" name="redirect" action={ccavenueUrl}>
                    <input type="hidden" id="encRequest" name="encRequest" value={encReq} />
                    <input type="hidden" name="access_code" id="access_code" value={accessCode} />
                </form>
            ) : null}
        </div>
    );
};

export default Checkout;
