import { ServiceInstance } from '../../axios.config';

export const getMyItems = () => {
	return ServiceInstance.get('/users/getData');
};

export default getMyItems;
