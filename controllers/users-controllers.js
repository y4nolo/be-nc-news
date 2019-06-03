const { getUser, fetchAllUsers } = require("../models/users_model");

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.sendUser = (req, res, next) => {
  const { username } = req.params;
  getUser(username)
    .then(user => {
      if (!user) {
        return next({ code: 4043 });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};
