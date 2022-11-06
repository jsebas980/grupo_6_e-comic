const db = require('../database/models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  let emailInCookies = req.cookies.userEmail;
  let userFromCookie;
  if (emailInCookies){
      userFromCookie = db.user.findOne({
          where: {
              email: emailInCookie
          }
      }).catch(function () {
          console.log("email rechazado cookies");
      });
     console.log(userFromCookie.dataValues);
  }
  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }
  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  //console.log(res.locals);
  
  next();
}

module.exports = userLoggedMiddleware;
