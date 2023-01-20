export interface DecodedUser {
	name: string;
	email: string;
	picture: string;
	sub: string
}
export interface User {
	name: string;
	email: string;
	avatar: string;
	_id: string;
	_type: string;
	_rev?: string;
	_createdAt?: string;
	_updatedAt?: string;
}