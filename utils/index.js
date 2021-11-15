module.exports= {
	isPM: ((user)=> {
		if (user){
			return user.role === 'PM'
		}
		}),

	isTA: ((user) => {
		if (user) {
			return user.role === 'TA'
		}
	}),
	
	isOwner: (profileId, user) => profileId.equals(user)
}