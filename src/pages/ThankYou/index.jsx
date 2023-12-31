import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import ThankYouSvg from '../../assets/ThankYou';
import FailureSvg from '../../assets/FailureSvg';
import { useLocation } from 'react-router-dom';
import { useStore } from '../../store/store';
import { ObjectFrom } from '../../helper';
import { registerUser } from '../../api/register';

const PaymentStatus = () => {
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (location?.search) {
            const urlParams = new URLSearchParams(location.search);
            setStatus(urlParams.get('status'));
            setEmail(urlParams.get('email'));
            setName(urlParams.get('name'));
        }
    }, [location?.search]);

    if (status === 'Aborted' || status === 'Failure') {
        return <Abort />;
    } else if (status === 'Success') {
        return <ThankYou />;
    } else {
        return <Failure />;
    }
};

export default PaymentStatus;

const ThankYou = () => {
    return (
        <div className="wrapper-1">
            <div className="wrapper-2">
                <ThankYouSvg />
                <p>Your payment was successful. Thank You! </p>
            </div>
        </div>
    );
};

const Abort = () => (
    <div className="wrapper-1">
        <div className="wrapper-2">
            <FailureSvg />
            <p>Your payment was aborted.</p>
        </div>
    </div>
);

const Failure = () => (
    <div className="wrapper-1">
        <div className="wrapper-2">
            <FailureSvg />
            <p>Your payment was unsuccessful. Please try after sometime! </p>
        </div>
    </div>
);
