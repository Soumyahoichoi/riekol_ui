import { ServiceInstance } from '../../axios.config';

export const registerUser = (payload) => {
    return ServiceInstance.post('/users/registerUser', payload);
};
