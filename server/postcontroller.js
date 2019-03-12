module.exports = {
  createPost: (req, res) => {
    const { img, content, title, id } = req.body;
    const db = req.app.get("db");
    db.createPost([img, content, title, id]).then(results => {
      res.status(200).json("OK");
    });
  },

  getAllPosts: (req, res) => {
    const db = req.app.get("db");
    db.getAllPosts().then(results => {
      res.status(200).json(results);
    });
  },

  indvPost: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.getIndvPost(id).then(results => {
      res.status(200).json(results);
    });
  },
  getOnePost: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.getOnePost(id).then(results => {
      res.status(200).json(results);
    });
  }
};
