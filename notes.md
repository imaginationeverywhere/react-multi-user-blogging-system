# Notes

## General Admin Tasks to complete

1. ~~Finish Up Default User Profile~~
2. ~~Give default users the ability to create content~~
3. ~~Token expiration and commenting system~~
4. ~~Sending emaails with Sendgrid~~
5. ~~Password forgot and reset~~
6. ~~Activation and Signup~~
7. Social Login with Google
8. Google Analytics

## General Shopping Cart Tasks to complete

1. Shop page with search filter by Category and Price Range
2. Products Search
3. Products page with Related Products
4. Cart CRUD with LocalStorage
5. Payment Gateway (Credit Card and PayPal) with Braintree and Stripe
6. Orders
7. Manage Orders and Products by Admin Page

## General Developer Task to complete

1. Refactor code with Typescript
2. Paint the Web and App Interface with React Prime custom template

## Forget Passowrd

---

- User requst to reset password
- we generate a token with userId that expires in 10 minutes
- email the token
- also store the token in the database as the user's reset password link
- Inform the use that the link has been email

## Rest Password

---

- once the user clicks on the reset password link that was emailed
- user lands on the front end password reset page there we will store the token (that came with the email link)
- user will enter their new password
- once submitted the token and the new password will be sent to the backend
- In the backend there will be a check to verify if the token is expired
- If the token has not expired then we check if the we can find the user with that token in the database
- if we find that user then it's a valid reset password request so we update the old password with the new password then empty the resetPasswordLink field.
- Then send a message to the user saying the password is reset.
- The user can now login with the new password.

## Account Activation via emsil is required on Signup

Before signup process is complete run pre signup so basically whatever data is
needed on signup is retrieved from the user during pre signup. Put the user's data
in the user name, email, and password in the `jwt` then send that to the user's email if click grab that in **React** then send it to the backend extract the user info from `jwt` and use that info to create/save the new user in the db.
