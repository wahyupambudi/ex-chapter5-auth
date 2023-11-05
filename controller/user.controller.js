const { ComparePassword, HashPassword } = require("../helper/hash-pass.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function CreateUser(req, res) {
  try {
    const hashPass = HashPassword(req.body.password);

    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
    };

    const check = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (check) {
      res.status(400).json({
        message: "user already registered",
        status: 400,
        data: null,
      });
      return;
    }

    console.log(payload);

    // we create user here
    await prisma.user.create({ data: payload });

    res.status(200).json({
      message: "success",
      status: 200,
      data: null,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
      status: 500,
      data: error,
    });
  }
  return;
}

async function AuthUser(email, password, done) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return done(null, false, {
        message: "invalid email",
      });
    }

    // user.password ngambil dari database
    const comparePass = ComparePassword(password, user.password);

    if (!comparePass) {
      return done(null, false, {
        message: "invalid password",
      });
    }

    return done(null, user);
  } catch (error) {
    return done(null, false, {
      message: error.message,
    });
  }
}

module.exports = {
  CreateUser,
  AuthUser,
};
