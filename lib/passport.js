const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");
const { AuthUser } = require("../controller/user.controller");
const prisma = new PrismaClient();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const checkUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  done(null, checkUser);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    AuthUser,
  ),
);

module.exports = passport;
