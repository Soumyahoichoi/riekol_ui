import React, { useEffect, useState, useRef } from 'react';
import Visa from '../../assets/visa.svg';
import BackButton from '../../assets/backButton';
import { useStore } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import { intiateCCavenuePayment } from '../../api/checkout';
import { getResultFromData } from '../../helper';

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
            intiateCCavenuePayment({
                currency,
                amount: totalBillingAmout,
                email: previousRouteState.email,
                name: previousRouteState.name,
                chapter: previousRouteState.chapter,
                phone: previousRouteState.contact
            }).then((val) => {
                const result = getResultFromData(val);
                if (result) {
                    setEncReq(result.encReq);
                    setAccessCode(result.accessCode);
                }
            });
        } else if (cart?.[0]?.name === 'MyEO Governor House visit' && cart?.length === 1) {
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
            {/* <div className="checkoutContainer" onClick={onClickHandler}>
                <BackButton />
            </div>
            <section className="order--summary">
                <h1>Total </h1>
                <p>
                    {currency}
                    {totalBillingAmout}
                </p>
            </section>
            <div className="min-w-screen flex items-center justify-center px-5 pb-10 pt-5">
                <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 text-left" style={{ maxWidth: '412px' }}>
                    <div className="mb-3">
                        <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
                        <div>
                            <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Name" type="text" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="font-bold text-sm mb-2 ml-1">Card number</label>
                        <div>
                            <input
                                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="0000 0000 0000 0000"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="mb-3 -mx-2 flex items-end">
                        <div className="px-2 w-full">
                            <label className="font-bold text-sm mb-2 ml-1">Expiration date</label>
                            <div>
                                <input
                                    className="w-1/2 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="Expiry"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-bold text-sm mb-2 ml-1">CVV</label>
                            <div>
                                <input
                                    className="w-1/2 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="CVV"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                        >
                            <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                        </button>
                    </div>
                </div>
            </div> */}
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
