import { Spinner } from '@nextui-org/react';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Login from '../pages/Login/Login';
// import Layout from '../Layout/Layout';
// import Home from '../pages/Home/Home';
// import MyEO from '../pages/MyEO/MyEO';
// // import DeepDive from '../pages/Schedule/Schedule';
// import EoDetails from '../pages/EoDetails/EoDetails';
// import StripeForm from '../components/Stripe/prepare';
// // import CheckoutForm from '../components/Stripe';
// import ThankYou from '../pages/ThankYou';
// import Schedule from '../pages/Schedule/Schedule';

const Login = lazy(() => import('../pages/Login/Login'));
const Layout = lazy(() => import('../Layout/Layout'));
const Home = lazy(() => import('../pages/Home/Home'));
const MyEO = lazy(() => import('../pages/MyEO/MyEO'));
const EoDetails = lazy(() => import('../pages/EoDetails/EoDetails'));
// const StripeForm = lazy(() => import('../components/Stripe/prepare'));
const Checkout = lazy(() => import('../components/Checkout/checkout'));
const ThankYou = lazy(() => import('../pages/ThankYou'));
const Schedule = lazy(() => import('../pages/Schedule/Schedule'));
const MailingList = lazy(() => import('../pages/MailingList/MailingList'));

const Load = ({ Component }) => {
    return (
        <Suspense fallback={<Spinner color="danger" />}>
            <Component />
        </Suspense>
    );
};

const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Load Component={Home} />} />
                <Route path="/myeo">
                    <Route index element={<Load Component={MyEO} />} />
                    <Route path=":id" element={<Load Component={EoDetails} />} />
                </Route>
                {/* <Route path="/deepdive" element={<DeepDive />} /> */}
                <Route path="/checkout" element={<Load Component={Checkout} />} />
                <Route path="/thankyou" element={<Load Component={ThankYou} />} />
                <Route path="/schedule" element={<Load Component={Schedule} />} />
                <Route path="/mailinglist" element={<Load Component={MailingList} />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Router;
