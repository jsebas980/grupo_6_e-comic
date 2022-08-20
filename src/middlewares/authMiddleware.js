function authMiddleware (req,res, next){
    if (!req.session.userLogged){
        res.render("users/login");
    }
    next();
};

module.exports = authMiddleware;