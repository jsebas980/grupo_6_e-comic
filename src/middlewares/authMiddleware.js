function authMiddleware(req, res, next) {
  //console.log(req.session);
  if (!req.session.userLogged) {
    return res.render("./users/login");
  }
  next();
}

module.exports = authMiddleware;
