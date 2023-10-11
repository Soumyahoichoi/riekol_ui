import { ServiceInstance } from '../../axios.config';

export const getMyItems = (data) => {
	return ServiceInstance.get('/users/getData', data);
};

export default getMyItems;
