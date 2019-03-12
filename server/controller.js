module.exports = {
  register: (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    db.createUser([username, password])
      .then(users => {
        const user = users[0];
        req.session.user = {
          id: user.id,
          username: user.username,
          pic: user.profilepic
        };
        res.status(200).json(user);
      })
      .catch(err => console.log(err));
  },
  login: (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");

    db.checkUser([username, password]).then(users => {
      if (!users[0]) {
        res.status(401).json({ error: "no users found" });
      } else {
        const user = users[0];
        req.session.user = {
          id: user.id,
          username: user.username,
          pic: user.profilepic
        };

        res.status(200).json("OK");
      }
    });
  },
  getUser: (req, res) => {
    const db = req.app.get("db");
    if (req.session.user) {
      db.getUser(req.session.user.username).then(users => {
        const user = users[0];
        res.status(200).json(user);
      });
    }
  }
};
