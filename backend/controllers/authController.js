const User = require('/models/UserModels');

const authController = {
  async getUser(req, res, next) {
    try {
      const data = await User.findOne({ firstName });
    } catch (e) {
      console.log(`Error: ${e}`);
    }
    console.log(`Here is the data: ${data}`);
  },

  async signUp(req, res, next) {
    try {
      const { username } = req.body;
      const newUser = User.create({ username });
    } catch (e) {
      console.log(`Error: ${e}`);
    }
    console.log(`Here is the new user: ${newUser}`);
  },
};

module.exports = authController;
