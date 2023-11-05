const route = require('express').Router()
const passport = require("../../lib/passport")
const {CreateUser} = require('../../controller/user.controller')

route.get("/register", (req, res, next) => {
  res.render('register.ejs')
  return
})

route.get("/dashboard", (req, res, next) => {
  res.render('dashboard', {user: req.user})
})

route.post('/', CreateUser)
route.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}))

module.exports = route