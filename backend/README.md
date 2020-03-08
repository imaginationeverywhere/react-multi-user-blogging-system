# react-multi-user-blogging-system Front End

---

## Setup Instructions

1. Create a `.env` file in the root backend folder and add the variables below and do not include the comments.

```javascript
NODE_ENV=development
PORT=8085
APP_NAME=Diversity Developers Blog
CLIENT_URL=http://localhost:3085
// local MongoDB
DATABASE_LOCAL='mongodb://localhost:27017/ddblog'
// If you want to use MongoDB Cloud Atlas instead of local MongoDB
DATABASE_CLOUD=''
JWT_SECRET=AJFJAFS56516GSDGFK465SGKJKDK
// You have to get a actual SENDGRID_API_KEY this one won't work
SENDGRID_API_KEY=SG.HO9KDvTfSj62iMqafsafsaffQOMRw.7C8zN2cIirNIyt9CXeJIkrYP0gJnKsMefyNrE4z4QUc
// Put You actual email here
EMAIL_TO=youremailaddress@email.com
// Put You an alias email here because you don't want any to reply
EMAIL_FROM=noreply@imaginationeverywhere.info
// Reset Password Salt
JWT_RESET_PASSWORD=034957439HIU34R9U43H034OR3H49UH4390P0IH
```
