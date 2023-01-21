import { body } from "express-validator";

export const registerValidation = [
  body('email', 'Wrong email').isEmail(),
  body('password', 'Wrong password').isLength({min: 8}),
  body('firstName', 'Wrong name').isLength({min: 3}),
  body('lastName', 'Wrong name').isLength({min: 3}),
];

export const loginValidation = [
  body('email', 'Wrong email').isEmail(),
  body('password', 'Wrong password').isLength({min: 8}),
];