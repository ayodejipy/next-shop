export default {
	name: 'users',
	title: 'Users',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: "Name",
			type: 'string'
		},
		{
			name: 'email',
			title: "Email Address",
			type: 'string'
		},
		{
			name: 'avatar',
			title: "Display photo",
			type: 'string'
		},
	]
}