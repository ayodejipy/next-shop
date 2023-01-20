import jwtDecode from "jwt-decode"
// import { useAddUserMutation } from "@/services/user";
import type { User, DecodedUser } from "@/types/user"

export const useSanityClient = (response: any) => {
	const decoded: DecodedUser = jwtDecode(response.credential);
	// const [ addUser ] = useAddUserMutation();

	const user: User = {
		_id: decoded.sub,
		_type: 'user',
		email: decoded.email,
		name: decoded.name,
		avatar: decoded.picture
	}

	// await addUser(user);

	return [ user ] as const
}