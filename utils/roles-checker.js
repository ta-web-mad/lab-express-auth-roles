const rolesChecker = user => {
    return {
        //now works with node versions older than 14.0.0 (i have 12.0)
        isStudent: user ? user.role === 'STUDENT' : false,
        isDEV: user ? user.role === 'DEV' : false,
        isPM: user ? user.role === 'PM' : false,
        isTA: user ? user.role === 'TA' : false,



        // isStudent: user?.role === 'STUDENT',
        // isDEV: user?.role === 'DEV',
        // isPM: user?.role === 'PM',
        // isTA: user?.role === 'TA'
    }
}

module.exports = { rolesChecker }