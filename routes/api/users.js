const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const credentials = require("../../config/credentials");
const { check, validationResult } = require("express-validator/check");
const errorType = require("../../errorHandling/customErrors");
const User = require("../../models/User");

// GET /signup/temp get all tempUsers
router.get("/signup/temp", (req, res) => {
  User.find({ accepted: false })
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// POST /signup/temp new tempUser
router.post(
  "/signup/temp",
  [
    check("username")
      .exists({ checkFalsy: true })
      .withMessage("Username is required")
      .isLength({ min: 8, max: 10 })
      .withMessage("Username must be between 8 and 10 characters.")
      .not()
      .matches("^(?=.{8,10}$)(?![0-9])[a-z]{3,}[0-9]{3,}$")
      .withMessage(
        "Must contain only lowercase letters and numbers, at least 3 letters and 3 numbers. No special characters. Starts with a letter."
      ),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    check("password")
      .exists({ checkFalsy: true })
      .withMessage("Password is required")
      .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      .withMessage(
        "Password must be at least 8 characters in length, in which contain at least 1 number, 1 capitalized character and 1 symbol"
      ),
    check("password2")
      .exists({ checkFalsy: true })
      .withMessage("Password confirmation is required")
      .custom((value, { req }) => {
        return value !== req.body.password ? false : value;
      })
      .withMessage("Password confirm must match")
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg, param }) => ({
      [param]: msg
    }));
    if (!errors.isEmpty()) {
      console.log(errors.isEmpty());
      console.log("Input validation error(s).");
      // return res.end();
      res.status(404).json({ success: false });
      // let e = errorType.ValidationError({ message: errors.array() });
      // return next(e);
    } else {
      const { username, email, password, country } = req.body;

      User.findOne({ email }).then(user => {
        if (user) {
          if (user.accepted) {
            if (user.password === "not generated") {
              console.log(
                "You are registered. An email verification has been sent to your email."
              );
              res.status(404).json({
                msg:
                  "You are registered. An email verification has been sent to your email."
              });
              // let e = errorType.ConflictError({
              //   message:
              //     "You have registered. An email verification has been sent to your email",
              // });
              // return next(e);
            }
            console.log(
              "You are registered. Please go to login page to use the service."
            );
            res.status(404).json({
              msg:
                "You are registered. Please go to login page to use the service."
            });
            // let e = errorType.ConflictError({
            //   message:
            //     "You have already register with a password. Please go to login page to use the service",
            // });
            // return next(e);
          }
          console.log(
            "Your account has not been approved neither declined by the admin. Please wait!"
          );
          res.status(404).json({
            msg:
              "Your account has not been approved neither declined by the admin. Please wait!"
          });
          // let e = errorType.BadRequestError({
          //   message:
          //     "Your sign-up request has not either been approved or declined by the admin. Please wait!",
          // });
          // return next(e);
        } else {
          User.findOne({ username }).then(user => {
            if (user) {
              console.log("Username not available.");
              res.status(404).json({
                msg: "Username not available."
              });
            } else {
              const { gmailUsername, gmailPassword } = credentials;
              const newUser = new User({
                username,
                email,
                password,
                country,
                role: "not generated"
              });
              User.createUser(newUser, (err, user) => {
                if (err) throw err;
                console.log(user);
                res.status(200).json({ success: true });
              });

              // send email
              const payload = { username, password };
              const token = jwt.sign(payload, "RESTFULAPIs", {
                expiresIn: "30y"
              });
              const link = `${req.protocol}://${req.get(
                "host"
              )}/users/verify?token=${token}`;

              const message = `
                <p>Hello ${username}</p>
                <p>Click the link below and complete your profile</p>
                <a href=${link}>Create account</a>
              `;
              const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                  user: gmailUsername,
                  pass: gmailPassword
                },
                tls: {
                  rejectUnauthorized: false
                }
              });

              const mailOptions = {
                from: '"Broker" <only4katka@gmail.com>',
                to: email,
                subject: "E-mail verification and registration",
                html: message
              };

              transporter
                .sendMail(mailOptions)
                .then(() => console.log("Message sent"))
                .catch(err => {
                  console.log(err);
                });
            }
          });
        }
      });
    }
  }
);

// DELETE /signup/temp/:id tempUser declined by admin
router.delete("/signup/temp/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// POST /signup/:id tempUser accepted by admin
// router.post?("/signup/:id", (req, res) => {

// });

// // POST send email verification to tempUser accepted by admin
// router.post(
//   "/signup/temp/:id", (req, res) => {

//  });

// // GET tempUser is verified and asked for password
// router.get("/verify", (req, res, next) => {

// });

// // PUT set password
// router.put("/signup", (req, res, next) => {

// });

// GET all accepted active users
router.get("/signup", (req, res, next) => {
  User.find({ accepted: true })
    .sort({ date: -1 })
    .then(users => res.json(users))
    .catch(() => {
      let e = errorType.InternalError();
      return next(e);
    });
});

// // POST login user
// router.post(
// 	"/login", (req, res) => {

//   })

// // GET logout user
// router.get("/logout", (req, res) => {
// 	res.clearCookie("jwt_token");
// 	res.send("cleared cookie");
// });

// // PUT change password
// router.put(
// 	"/password/update/:id", (req, res) => {

//   })

// // PUT send email to reset password
// router.put(
// 	"/password/reset", (req, res) => {

// })

// GET pending users
router.get("/pending", (req, res, next) => {
  // User.find({ accepted: false, otherproperty: null })
  User.find({ accepted: false })
    .sort({ date: -1 })
    .then(users => res.json(users))
    .catch(() => {
      let e = errorType.InternalError();
      return next(e);
    });
});

module.exports = router;
