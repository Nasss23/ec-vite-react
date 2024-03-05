import axios from './axios-customize'; // Use the same import statement

//Auth account
export const registerAuthAcc = (
	name: string,
	email: string,
	password: string,
) => {
	return axios.post('/api/v1/auth/register', {
		name,
		email,
		password,
	});
};

export const loginAuth = (username: string, password: string) => {
	return axios.post('/api/v1/auth/login', {
		username,
		password,
	});
};

export const callFetchAccount = () => {
	return axios.get('/api/v1/auth/account');
};
export const callRefreshToken = () => {
	return axios.get('/api/v1/auth/refresh');
};

//API USER
export const fetchData = () => {
	return axios.get('/api/v1/users');
};

//API CATEGORY
export const createCategory = (name: string, description: string) => {
	return axios.post('/api/v1/category', { name, description });
};
