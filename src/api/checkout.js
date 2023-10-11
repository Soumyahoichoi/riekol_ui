import { ServiceInstance } from '../../axios.config';

export const createSession = (data) => {
    return ServiceInstance.post('/users/checkout', data);
};

export const getClientSecret = (amount) => {
    return ServiceInstance.post('/users/getSecret', { amount });
};
