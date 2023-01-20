import jwtDecode from "jwt-decode"
import type { User, DecodedUser } from "@/types/user"

export const getAuthUser = (response: any) => {
	const decoded: DecodedUser = jwtDecode(response.credential);

	const user: User = {
		_id: decoded.sub,
		_type: 'users',
		email: decoded.email,
		name: decoded.name,
		avatar: decoded.picture
	}

	return { user };
}