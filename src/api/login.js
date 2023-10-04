import { ServiceInstance } from '../../axios.config';

export const login = (data) => {
	return ServiceInstance.post('/users/login', data);
};
