const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");

const signup = async function(parent, args, ctx, info) {
  // lowercase their email
  args.email = args.email.toLowerCase();
  // hash their password
  const password = await bcrypt.hash(args.password, 10);
  // create the user in the database
  const user = await ctx.db.mutation.createUser(
    {
      data: {
        ...args,
        password,
        permissions: { set: ["USER"] }
      }
    },
    info
  );
  // create the JWT token for them
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  // We set the jwt as a cookie on the response
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });
  // Finalllllly we return the user to the browser
  return user;
};

const signin = async function(parent, { email, password }, ctx, info) {
  const user = await ctx.db.query.user({ where: { email } });

  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }
  // 2. Check if their password is correct
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid Password!");
  }
  // 3. generate the JWT Token
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  // 4. Set the cookie with the token
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  // Finalllllly we return the user to the browser
  return user;
};

const signout = async function(parent, args, ctx, info) {
  ctx.response.clearCookie("token");
  return { message: "Goodbye!" };
};

const requestReset = async function(parent, args, ctx, info) {
  // 1. Check if this is a real user
  const user = await ctx.db.query.user({ where: { email: args.email } });
  if (!user) {
    throw new Error(`No such user found for email ${args.email}`);
  }
  // 2. Set a reset token and expiry on that user
  const randomBytesPromiseified = promisify(randomBytes);
  const resetToken = (await randomBytesPromiseified(20)).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
  const res = await ctx.db.mutation.updateUser({
    where: { email: args.email },
    data: { resetToken, resetTokenExpiry }
  });
  console.log(res);
  return { message: "Thanks!" };
};

const resetPassword = async function(parent, args, ctx, info) {
  // 1. check if the passwords match
  if (args.password !== args.confirmPassword) {
    throw new Error("Yo Passwords don't match!");
  }
  // 2. check if its a legit reset token
  // 3. Check if its expired
  const [user] = await ctx.db.query.users({
    where: {
      resetToken: args.resetToken,
      resetTokenExpiry_gte: Date.now() - 3600000
    }
  });
  if (!user) {
    throw new Error("This token is either invalid or expired!");
  }
  // 4. Hash their new password
  const password = await bcrypt.hash(args.password, 10);
  // 5. Save the new password to the user and remove old resetToken fields
  const updatedUser = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: {
      password,
      resetToken: null,
      resetTokenExpiry: null
    }
  });
  // 6. Generate JWT
  const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
  // 7. Set the JWT cookie
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  // 8. return the new user
  return updatedUser;
};

exports.signup = signup;
exports.signin = signin;
exports.signout = signout;
exports.requestReset = requestReset;
exports.resetPassword = resetPassword;
