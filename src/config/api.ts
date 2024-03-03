import { IAccount, IBackendRes, IGetAccount } from '../types/backend';
import axios from './axios-customize'; // Use the same import statement

//Auth account
const registerAuth = (name: string, email: string, password: string) => {
	return axios.post('/api/v1/auth/register', {
		name,
		email,
		password,
	});
};

const loginAuth = (username: string, password: string) => {
	return axios.post('/api/v1/auth/login', {
		username,
		password,
	});
};
export const callFetchAccount = () => {
	return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account');
};
export const callRefreshToken = () => {
	return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh');
};

//API USER
const fetchData = () => {
	return axios.get('/api/v1/users');
};

//API CATEGORY
const createCategory = (name: string, description: string) => {
	return axios.post('/api/v1/category', { name, description });
};
export { fetchData, registerAuth, loginAuth, createCategory };
