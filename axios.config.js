import axios from 'axios';
import { decideEnv } from './decideENV';

export const ServiceInstance = axios.create({
	baseURL: `${decideEnv()}`
	//other one time configs
});
