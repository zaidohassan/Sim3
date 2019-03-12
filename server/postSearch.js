module.exports = {
  postSearch: (req, res) => {
    const { search, userid, userReq } = req.query;
    const db = req.app.get("db");
    console.log(search, userid, userReq);
    if (userReq === "true" && search && userid !== "undefined") {
      db.getIndvPost(userid).then(results => {
        let filteredArray = [];
        const filter = results.filter((post, i) => {
          console.log(post);

          if (post.title.includes(search)) {
            filteredArray.push(post);
          }
        });
        res.status(200).json(filteredArray);
      });
    } else if (userReq === "false" && search) {
      // search all posts where regardless of id and search term is included in title
      db.getAllPosts().then(results => {
        let filteredArray = [];
        const filter = results.filter((post, i) => {
          console.log(post);
          if (post.title.includes(search)) {
            filteredArray.push(post);
          }
        });
        res.status(200).json(filteredArray);
      });
    }
  }
};
