import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Layout from '../Layout/Layout';
import Home from '../pages/Home/Home';
import MyEO from '../pages/MyEO/MyEO';
import DeepDive from '../pages/DeepDive/DeepDive';
import EoDetails from '../pages/EoDetails/EoDetails';
import StripeForm from '../components/Stripe/prepare';
import ThankYou from '../pages/ThankYou';

const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/myeo">
                    <Route index element={<MyEO />} />
                    <Route path=":id" element={<EoDetails />} />
                </Route>
                <Route path="/deepdive" element={<DeepDive />} />
                <Route path="/checkout" element={<StripeForm />} />
                <Route path="/thankyou" element={<ThankYou />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Router;
