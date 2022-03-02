const register = async (req, res) => {
 res.send('register user');
}

const login = async (req, res) => {
 res.send('login user');
}

//exporting the controllers_functions
module.exports = {
 register,
 login
}