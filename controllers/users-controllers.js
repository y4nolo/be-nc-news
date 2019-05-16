const { getUsers } = require("../models/users_model");

exports.sendUsers = (req, res, next) => {
  const { username } = req.params;
  getUsers({ username })
    .then(([user]) => {
      return res.status(200).send({ user });
    })
    .catch(err => {
      console.log(err);
    });
};
