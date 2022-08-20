function guestMiddleware (req,res, next){
    if (req.session.userLogged){
        res.render("users/userDetail", { usuario: req.session.userLogged });
    }
    next();
};

module.exports = guestMiddleware;