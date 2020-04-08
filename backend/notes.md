# Note for the backend

* add the history column to **User** model in `backend/models/user.js`

```javascript
history: {
  type: Array,
  default: []
}
```

* Add Updated validators to the validation folder `backend/validators`
  * For instance the validation in **auth** `backend/validators/auth.js` should look like this:

```javascript
 const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name", "Name is required").notEmpty(),
  check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32
    }),
  check("password", "Password is required").notEmpty(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
];
```
