import { ServiceInstance } from '../../axios.config';

export const createSession = (data) => {
    return ServiceInstance.post('/users/checkout', data);
};

export const getClientSecret = (amount, currency, descriptor) => {
    return ServiceInstance.post('/users/getSecret', { amount, currency, descriptor });
};

export const intiateCCavenuePayment = (data) => {
    return ServiceInstance.get(`/users/initiate?currency=${data.currency}&amount=${data.amount}`);
};

export const saveDetailsForPaymentLink = (data) => {
    return ServiceInstance.post('/users/saveTemp', data);
};

export const getMailingList = () => {
    return ServiceInstance.get('/users/getMailingList');
};
