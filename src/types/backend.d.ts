export interface IBackendRes<T> {
	error?: string | string[];
	message: string;
	statusCode: number | string;
	data?: T;
}

export interface IAccount {
	access_token: string;
	user: {
		_id: string;
		email: string;
		name: string;
		role: string;
	};
}

export interface IUser {
	_id?: string;
	name: string;
	email: string;
	password?: string;
	role?: string;
	createdBy?: string;
	isDeleted?: boolean;
	deletedAt?: boolean | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface IGetAccount extends Omit<IAccount, 'access_token'> {}
